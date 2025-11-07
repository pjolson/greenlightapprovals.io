# Custom Forms & UX

**Document:** Form Design & Progressive Disclosure
**Last Updated:** 2025-11-02

This document describes the custom form architecture and progressive disclosure patterns used throughout Greenlight Approvals.

---

## Table of Contents

1. [Form Design Philosophy](#form-design-philosophy)
2. [Approval Step Form](#approval-step-form)
3. [Approval Instance Form](#approval-instance-form)
4. [Settings Form](#settings-form)
5. [Delegation Form](#delegation-form)

---

## Form Design Philosophy

### Core Principles

1. **Progressive Disclosure:** Only show fields that are relevant based on current selections
2. **Logical Grouping:** Related fields grouped together with clear labels
3. **Field Organization:** 2-column layouts with strategic column breaks
4. **Mandatory Enforcement:** Fields become mandatory only when visible/relevant
5. **Clean UI:** Hide system fields (CUSTOMFORM) when not needed

### Benefits

- Reduces cognitive load (fewer visible fields)
- Prevents configuration errors (can't set wrong values)
- Clearer user intent (only relevant options shown)
- Faster form completion (less scrolling, less confusion)
- Mirrors NetSuite's native UX patterns

---

## Approval Step Form

**Form ID:** `custform_gnl_step_form`
**Record Type:** `customrecord_gnl_approval_step`
**Purpose:** Entry form for creating and editing approval steps within a rule

### Field Groups

#### 1. Basic Information (default group)
- Step Name
- Step Number
- Parent Rule
- Active status

#### 2. Approver Assignment
- **Step Type (dropdown):** Employee, Role, Group, Field, Vendor, Partner, Supervisor, Project Manager
- **Dynamic fields revealed based on Step Type selection:**
  - Employee → Approver Employee (mandatory)
  - Role → Approver Role, Group Mode (mandatory)
  - Group → Approver Group, Group Mode (mandatory)
  - Field → Approver Field (mandatory)
  - Vendor → Vendor Approver (mandatory)
  - Partner → Partner Approver (mandatory)
  - Supervisor → (no additional fields, uses transaction's supervisor)
  - Project Manager → (no additional fields, uses project manager)

#### 3. Escalation Settings
- **Escalation Type (dropdown):** None, Employee, Role, Group
- **Dynamic fields revealed when Escalation Type ≠ None:**
  - Escalation Days (mandatory when type selected)
  - Escalation Employee (if type = Employee)
  - Escalation Role (if type = Role)
  - Escalation Group (if type = Group)

#### 4. Conditional Logic
- **Is Conditional? (checkbox)**
- **Dynamic fields revealed when Is Conditional = checked:**
  - Condition Field (mandatory)
  - Condition Operator (mandatory)
  - Condition Value (mandatory)

### Dynamic Field Visibility Implementation

**Client Script:** `CS_GNL_ApprovalStepHelper.js`

#### Technical Implementation Pattern

```javascript
// CRITICAL: Must hide fields BEFORE clearing values
// Order matters - hide first prevents NetSuite refresh issues

function updateFieldVisibility(rec) {
    // Step 1: Hide all fields unconditionally
    const approverFields = [
        'custrecord_gnl_step_approver_emp',
        'custrecord_gnl_step_approver_role',
        'custrecord_gnl_step_approver_group',
        'custrecord_gnl_step_approver_field',
        'custrecord_gnl_step_vendor_approver',
        'custrecord_gnl_step_partner_approver',
        'custrecord_gnl_step_group_mode'
    ];

    approverFields.forEach(fieldId => {
        const field = rec.getField({ fieldId: fieldId });
        if (field) {
            field.isDisplay = false;
            field.isMandatory = false;
        }
    });

    // Step 2: Clear values AFTER hiding (prevents refresh cascades)
    approverFields.forEach(fieldId => {
        rec.setValue({
            fieldId: fieldId,
            value: '',
            ignoreFieldChange: true,      // Don't trigger fieldChanged
            fireSlavingSync: false         // Don't trigger dependent field updates
        });
    });

    // Step 3: Selectively show with inline conditions (more reliable than variables)
    const stepType = rec.getValue({ fieldId: 'custrecord_gnl_step_type' });

    if (stepType === 'Employee') {
        const field = rec.getField({ fieldId: 'custrecord_gnl_step_approver_emp' });
        if (field) {
            field.isDisplay = true;
            field.isMandatory = true;  // Mandatory when visible
        }
    } else if (stepType === 'Role') {
        showFields(rec, ['custrecord_gnl_step_approver_role', 'custrecord_gnl_step_group_mode'], true);
    } else if (stepType === 'Group') {
        showFields(rec, ['custrecord_gnl_step_approver_group', 'custrecord_gnl_step_group_mode'], true);
    } else if (stepType === 'Field') {
        showFields(rec, ['custrecord_gnl_step_approver_field'], true);
    }
    // ... repeat for other types
}
```

#### Key Technical Discoveries

1. **Form XML must allow client control:** All dynamic fields must be `<visible>T</visible>` at form level (if set to F, client script cannot override)
2. **Hide-first pattern required:** Must hide ALL fields first, then selectively show (calculated variables can cause race conditions)
3. **Clear AFTER hide:** Clearing values before hiding causes NetSuite to refresh and re-show fields
4. **Special setValue flags:** Must use `ignoreFieldChange: true, fireSlavingSync: false` to prevent cascading updates
5. **Inline conditions more reliable:** Direct condition checks (`if (stepType === 'Employee')`) more reliable than calculated booleans

### Benefits

- Reduces form clutter: **15+ fields → 2-4 visible fields** based on selection
- Prevents configuration errors (can't set wrong approver type)
- Clearer user experience (only relevant fields shown)
- Mandatory enforcement only when applicable
- Mirrors NetSuite's native progressive disclosure patterns

---

## Approval Instance Form

**Form ID:** `custform_gnl_approval_instance_form`
**Record Type:** `customrecord_gnl_approval_instance`
**Purpose:** Display form for viewing approval instance records (system-generated, rarely edited directly)

### Field Groups

#### 1. Approval Context
- Transaction
- Rule
- Step
- Sequence Number

#### 2. Approver Assignment
- All 6 approver type fields (Employee, Role, Group, Vendor, Partner, Field)

#### 3. Status & Action History
- Status
- Created Date
- Assigned Date
- Approved Date
- Approved By
- Action By (who actually approved)
- Comments

#### 4. Delegation
- Delegate Employee
- Is Exclusive Delegation

#### 5. Escalation & Supersession
- Superseded By
- Supersession Reason
- Escalation Target
- Generation Number

#### 6. Transaction Snapshot (at time of approval creation)
- All snapshot fields for material change detection:
  - Subsidiary, Department, Location, Class
  - Amount, Transaction Type, Entity
  - Line Count, Custom Segments 1-10

### Organization Strategy

- Removed "Snapshot:" prefix from field labels for cleaner reading
- Grouped logically related fields together
- Strategic column breaks for balanced 2-column layout
- Most important fields (context, status) at the top
- Read-only system fields (snapshots) at the bottom

### Benefits

- Easier scanning of 50+ fields
- Clear visual grouping
- Faster troubleshooting (status and action history grouped together)
- Better understanding of instance lifecycle (escalation and supersession together)

---

## Settings Form

**Form ID:** `custform_gnl_settings_form`
**Record Type:** `customrecord_gnl_settings`
**Purpose:** Configuration form for global settings (singleton record)

### Tab Structure

#### 1. General Tab
- Workflow settings
- No-match behavior
- Feature toggles

#### 2. Email Configuration Tab
- Email enable/disable
- Template assignments
- Content toggles (show header, line items, decision context, actions)
- Line item configuration (max lines, column lists)

#### 3. Custom Segments Tab
- 10 custom segment name/field pairs
- Organized in 2-column layout

#### 4. Budget Settings Tab (planned)
- Budget enforcement toggles and thresholds

### Benefits

- Related settings grouped by category
- Easier navigation (tabs instead of long scroll)
- Clearer purpose for each setting group

---

## Delegation Form

**Form ID:** `custform_gnl_delegation_form`
**Record Type:** `customrecord_gnl_delegation`
**Purpose:** Entry form for creating/editing delegation records

### Structure

Standard flat layout (simple record, no grouping needed)

**Fields:**
- Delegator
- Delegate To
- Start Date
- End Date
- Active
- Exclusive
- Notes

---

**Next:** See [Development Standards](09-development.md) for coding conventions and deployment process.
