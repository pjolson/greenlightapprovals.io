# Scripts Architecture

**Document:** Script Implementations
**Last Updated:** 2025-11-04

This document describes all SuiteScript files in the Greenlight Approvals system, organized by script type.

---

## Table of Contents

1. [User Event Scripts](#user-event-scripts)
2. [Client Scripts](#client-scripts)
3. [Suitelets (RESTful APIs)](#suitelets-restful-apis)
4. [Scheduled Scripts](#scheduled-scripts)

---

## User Event Scripts

### UE_GNL_RuleEvaluation.js (Core Approval Engine)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/UE/UE_GNL_RuleEvaluation.js`
**Deployment:** All supported transaction types
**Execution Contexts:** create, edit

#### beforeSubmit(context)
1. Extract transaction dimensions (subsidiary, department, location, class, amount, custom segments)
2. Call `findMatchingRule()` from GNL_RuleHelpers
3. If match found:
   - Set `custbody_gnl_matched_rule` = rule ID
   - Set transaction status = Draft (pending approval)
   - Set `custbody_gnl_rule_description` = rule name for display
4. If no match:
   - Apply no-match behavior from Settings (Draft/Approved/Block/Log)
5. Validate: Prevent approval bypass (can't manually set to Approved if rule matched)

#### afterSubmit(context)
1. Set `custbody_gnl_created_by` if not already set (for audit trail)
2. If transaction status = Pending Approval:
   - Call `generateApprovalInstances(transactionId, ruleId)`
   - For each step in rule:
     - Evaluate step condition (if configured)
     - If condition passes: Create instance record
     - First step (sequence 1): Set status = Pending, set date_assigned = now
     - Subsequent steps: Set status = Waiting, date_assigned = null (will be set when activated)
   - Send assignment email to first approver (step 1 only)
3. If transaction status = Draft: Wait for user to submit

#### Key Functions
- `findMatchingRule(transactionData, filters)` - Returns highest-specificity matching rule
- `generateApprovalInstances(transactionId, ruleId)` - Creates instance records for all steps
- `extractTransactionDimensions(record)` - Extracts all filterable fields from transaction
- Budget enforcement (Stage 1): When rules have **Enable Budget Enforcement** checked, the script gathers budget snapshots via `GNL_BudgetHelpers_V2`, stores summary fields (`custrecord_gnl_inst_budget_*`), and refreshes them on resubmissions.

---

### UE_GNL_ApprovalRule_Audit.js (Rule Change Tracking)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/UE/UE_GNL_ApprovalRule_Audit.js`
**Deployment:** Approval Rule custom record (`customrecord_gnl_approval_rule`)
**Purpose:** Tracks all changes to approval rule configuration for compliance audit trail
**Status:** ✅ Deployed 2025-10-31 (Phase 3 Complete)

#### Tracked Fields (14 fields)
- Rule metadata: name, status, priority, effective/expiration dates
- Matching criteria: subsidiary, department, location, class, transaction type, amount min/max
- Custom segments: seg1-seg10
- Rule context: decision context template

#### Implementation Pattern
```javascript
afterSubmit(context) {
    // Compares old vs new values using context.oldRecord
    // Creates log entry for each changed field
    // Logs both internal values AND display text (no joins needed in reports)
}
```

#### Key Features
- Reads old values directly from `context.oldRecord` (no beforeSubmit caching needed)
- Uses `.getText()` to capture display values for list fields (e.g., "Engineering" not "6")
- Generates contextual change reasons (e.g., "Threshold raised from $10,000 to $25,000")
- Passes correct recordType key to logHelpers ('rule' not 'Approval Rule')

---

### UE_GNL_ApprovalStep_Audit.js (Step Change Tracking)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/UE/UE_GNL_ApprovalStep_Audit.js`
**Deployment:** Approval Step custom record (`customrecord_gnl_approval_step`)
**Purpose:** Tracks all changes to approval step configuration
**Status:** ✅ Deployed 2025-10-31 (Phase 3 Complete)

#### Tracked Fields (20+ fields)
- Step metadata: name, sequence, rule, active status
- Approver assignment: all 6 approver type fields (employee, role, group, vendor, partner, field)
- Group mode settings
- Escalation configuration: type, days, targets
- Conditional logic: field, operator, value

#### Key Features
- Same pattern as Rule audit (oldRecord comparison, display values, contextual reasons)
- Handles cascading changes (e.g., changing step type clears old approver, sets new approver)
- Logs all related field changes when user switches approver types

---

### UE_GNL_Settings_Audit.js (Settings Change Tracking)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/UE/UE_GNL_Settings_Audit.js`
**Deployment:** Settings custom record (`customrecord_gnl_settings`)
**Purpose:** Tracks all changes to system-wide settings
**Status:** ✅ Deployed 2025-10-31 (Phase 3 Complete)

#### Tracked Fields (40+ fields)
- Flow configuration: flow modes, active transaction types, no-match behavior
- License fields: tier, expiry, subsidiaries
- Feature toggles: audit, bulk, email, email actions
- Email templates: assignment, approved, rejected, escalated
- Email display settings: show header, line items, decision context, max lines, columns
- Custom segments: seg1-seg10 field IDs
- Scoring weights: highest, high, medium, low

#### Key Features
- Categorizes changes by impact (license, feature toggle, email template, etc.)
- Special handling for security fields (email_secret NOT tracked for security)
- Generates descriptive reasons (e.g., "Feature toggle changed: Enable Email Alerts")

---

### UE_GNL_ReportSettings_Audit.js (Report Settings Change Tracking)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/UE/UE_GNL_ReportSettings_Audit.js`
**Deployment:** Report Settings custom record (`customrecord_gnl_report_settings`)
**Purpose:** Tracks all changes to reporting configuration (thresholds, aging buckets, performance ratings)
**Status:** ✅ Deployed 2025-10-31 (Phase 3 Complete)

#### Tracked Fields (9 fields)
- General thresholds: late_days, critical_amount, target_hours, exclude_test
- Aging buckets: aging_bucket_1/2/3 (days)
- Performance ratings: perf_excellent, perf_good (hours)

#### Key Features
- Direction indicators in change reasons: "raised" vs "lowered" vs "changed"
- Currency formatting for display values: "$50,000.00" instead of "50000"
- Example reason: "Late approval threshold raised from 2 to 7 days"

---

## Client Scripts

### CS_GNL_ApprovalTray.js (Transaction Form UI)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/CS/CS_GNL_ApprovalTray.js`
**Deployment:** All supported transaction types
**Execution Contexts:** view, edit

#### pageInit(context)
1. Check if transaction has approval instances
2. If yes: Show approval tray (collapsible section)
3. Fetch approval data via AJAX call to SL_GNL_ApprovalActions

#### fieldChanged(context)
1. Detect if transaction dimensions changed (amount, subsidiary, department, etc.)
2. If changed: Show warning "Changes may require re-approval"
3. If smart re-evaluation enabled: Call `checkReevaluationNeeded()`

#### Custom Functions
- `buildApprovalTray()` - Renders approval status UI
- `showApprovalHistory()` - Shows approval log timeline
- `submitForApproval()` - Calls Suitelet to submit Draft → Pending
- `approveInstance(instanceId)` - Calls Suitelet to approve
- `rejectInstance(instanceId, comments)` - Calls Suitelet to reject

#### Tray UI Elements
- Current status badge (Pending, Approved, Rejected)
- Approval progress (Step 1 of 3)
- Approver info (who needs to approve)
- “Why you’re reviewing this” (rule-level decision context with merge-field support)
- “What to check for this step” (step-specific context, supports the same merge tokens)
- Supported merge tokens (shared with notification emails): `{tranid}`, `{trandate}`, `{memo}`, `{entity}`, `{department}`, `{location}`, `{total}`, `{total_formatted}`, `{amount}`, `{amount_formatted}`, `{shipcity}`, `{shipstate}`, `{shipzip}`, `{shipcountry}`.
- Approve/Reject buttons (if current user is approver)
- Approval history timeline
- Budget snapshot card (utilization badge, budget/actual/projected totals, variance, and top dimension breakdown) when budget enforcement is enabled on the matched rule.

---

### CS_GNL_ApprovalStepHelper.js (Approval Step Form Progressive Disclosure)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/CS/CS_GNL_ApprovalStepHelper.js`
**Deployment:** Approval Step custom record (`customrecord_gnl_approval_step`)
**Execution Contexts:** create, edit

#### pageInit(context)
1. Load current field values (Step Type, Escalation Type, Is Conditional)
2. Call `updateFieldVisibility()` to hide/show fields based on selections
3. Hide all irrelevant fields on initial page load

#### fieldChanged(context)
1. Detect changes to master fields:
   - `custrecord_gnl_step_type` (Step Type dropdown)
   - `custrecord_gnl_step_escalation_type` (Escalation Type dropdown)
   - `custrecord_gnl_step_is_conditional` (Is Conditional checkbox)
2. Call `updateFieldVisibility()` to refresh field visibility
3. Clear values from hidden fields to prevent data inconsistencies

#### Custom Functions
- `updateFieldVisibility(rec)` - Core logic for progressive disclosure
  - Hides ALL dynamic fields first (unconditionally)
  - Clears values from hidden fields (prevents stale data)
  - Selectively shows fields based on master field selections
  - Enforces mandatory requirement only when fields visible
  - Uses inline condition checks (not calculated variables) for reliability

#### Progressive Disclosure Logic

1. **Approver Type Fields:**
   - Step Type = Employee → Show Approver Employee (mandatory)
   - Step Type = Role → Show Approver Role + Group Mode (both mandatory)
   - Step Type = Group → Show Approver Group + Group Mode (both mandatory)
   - Step Type = Field → Show Approver Field (mandatory)
   - Step Type = Vendor → Show Vendor Approver (mandatory)
   - Step Type = Partner → Show Partner Approver (mandatory)
   - Step Type = Supervisor/Project Manager → No additional fields

2. **Escalation Fields:**
   - Escalation Type = None → Hide all escalation fields
   - Escalation Type = Employee → Show Escalation Days + Employee (both mandatory)
   - Escalation Type = Role → Show Escalation Days + Role (both mandatory)
   - Escalation Type = Group → Show Escalation Days + Group (both mandatory)

3. **Conditional Logic Fields:**
   - Is Conditional = unchecked → Hide all condition fields
   - Is Conditional = checked → Show Condition Field + Operator + Value (all mandatory)

#### Technical Implementation Pattern

```javascript
// CRITICAL: Must hide fields BEFORE clearing values
// Order matters - hide first prevents NetSuite refresh issues

// Step 1: Hide all fields unconditionally
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
if (stepType === 'Employee') {
    const field = rec.getField({ fieldId: 'custrecord_gnl_step_approver_emp' });
    if (field) {
        field.isDisplay = true;
        field.isMandatory = true;  // Mandatory when visible
    }
}
```

#### Key Technical Patterns
1. **Form-level visibility:** All dynamic fields set to `<visible>T</visible>` in form XML (allows client script control)
2. **Hide-first pattern:** Client script hides all fields first, then selectively shows
3. **Clear-after-hide:** Clear values AFTER hiding to prevent NetSuite refresh issues
4. **Inline conditions:** Use inline condition checks instead of calculated boolean variables (more reliable)
5. **Special flags:** Use `ignoreFieldChange: true, fireSlavingSync: false` to prevent field change cascades

#### Benefits
- Reduces form clutter (15+ fields → 2-4 visible fields based on selection)
- Prevents configuration errors (can't set wrong approver type)
- Clearer user experience (only relevant fields shown)
- Mandatory enforcement only when applicable
- Mirrors NetSuite's native progressive disclosure patterns

---

## Suitelets (RESTful APIs)

### SL_GNL_ApprovalActions.js (Approval API)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/SL/SL_GNL_ApprovalActions.js`
**URL:** `/app/site/hosting/scriptlet.nl?script=customscript_gnl_approval_actions&deploy=1`
**Purpose:** RESTful API for approval actions from Client Script tray

#### GET Endpoints

```javascript
GET ?transactionId=12345
Returns: {
  instances: [...],
  currentStatus: 'Pending',
  currentStep: 1,
  totalSteps: 3,
  decisionContext: '...',
  canApprove: true/false,
  transactionData: {...}
}

GET ?transactionId=12345&action=getRuleMatchInfo
Returns: {
  matchedRule: {...},
  ruleSteps: [...],
  specificityScore: 45
}
```

#### POST Endpoints

```javascript
POST {action: 'approve', instanceId: 789, comments: '...'}
Returns: {success: true, message: '...', nextStep: 2}

POST {action: 'reject', instanceId: 789, comments: 'Budget exceeded'}
Returns: {success: true, message: '...'}

POST {action: 'submitForApproval', transactionId: 12345}
Returns: {success: true, instances: [...]}
```

#### Key Functions
- `approveInstance(instanceId, userId, comments)` - Approves instance, advances workflow
- `rejectInstance(instanceId, userId, comments)` - Rejects instance, updates transaction status
- `submitForApproval(transactionId)` - Changes Draft → Pending, generates instances
- `checkApprovalPermission(instanceId, userId)` - Validates user can approve

#### Workflow Logic in approveInstance()
1. Load instance record
2. Validate instance status = Pending (reject if already processed or still Waiting)
3. Validate user permission (employee, delegate, role member, group member, admin override)
4. Update instance status = Approved
5. Set approved_by = current user
6. Set approved_date = now
7. Create approval log entry
8. Send approval confirmation email to submitter
9. Search for next waiting instance (status = Waiting, sequence > current)
10. If next waiting instance found:
   - Activate: Change status from Waiting → Pending
   - Set date_assigned = now (start escalation clock)
   - Send assignment email to next approver
   - Return next step info
11. If no more waiting instances:
   - Set transaction status = Approved
   - Send approval confirmation email with "Fully Approved" messaging
   - Return completion message

---

### SL_GNL_EmailApproval.js (Public Email Approval Handler)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/SL/SL_GNL_EmailApproval.js`
**URL:** `/app/site/hosting/scriptlet.nl?script=customscript_gnl_email_approval&deploy=1`
**Purpose:** Public-facing handler for email approve/reject links (queue-based architecture)
**Execution Context:** Public (no login required), runs with minimal permissions

#### GET Handler (Approve Click)

```javascript
GET ?instance=789&action=approve&token=abc123
1. Validate HMAC token (prevents URL tampering)
2. Check token not expired (7 days default)
3. Check instance status using search.lookupFields() (read-only, works in public context)
   → If already actioned: Show "Already Processed" page with status/date/who
   → If still pending: Proceed to step 4
4. Create queue record with: instanceId, action, token, status=Pending
5. Trigger SS_GNL_ApprovalQueue to run immediately (via task.create)
6. Show branded success page: "Your approval has been recorded!"
```

#### GET Handler (Reject Click - Show Form)

```javascript
GET ?instance=789&action=reject&token=abc123
1. Validate HMAC token
2. Check instance status (same as approve)
3. If still pending: Show branded rejection form (requires comments)
4. If already actioned: Show "Already Processed" page
```

#### POST Handler (Reject Form Submission)

```javascript
POST {custpage_instance: 789, custpage_action: 'reject', custpage_comments: '...', custpage_token: '...'}
1. Validate token again
2. Validate comments not empty (mandatory for rejection)
3. Check instance status
4. Create queue record with: instanceId, action, token, comments, status=Pending
5. Trigger SS_GNL_ApprovalQueue
6. Show branded rejection success page
```

#### Security Features
- **HMAC Token Validation:** Prevents URL parameter tampering
  - Token = HMAC-SHA256(instanceId + action + secret)
  - Validated TWICE: once by Suitelet, again by Scheduled Script
  - If any parameter modified, token validation fails
- **Expiration:** Tokens expire after 7 days
- **Duplicate Click Prevention:**
  - Uses `search.lookupFields()` to check instance status before queuing
  - Shows "Already Processed" page if instance no longer pending
  - Displays: status, who actioned it, when actioned
- **Queue-Based Processing:** Suitelet doesn't modify records directly (permission-safe)
- **Audit Trail:** Queue records log all email approval attempts

#### Key Functions
- `handleApprove(res, instanceId, token, action)` - Validates, checks status, queues approve action
- `handleReject(res, instanceId, comments, token, action)` - Validates, checks status, queues reject action
- `renderRejectForm(res, instanceId, token)` - Shows branded rejection form
- `renderApprovalSuccess(res)` - Shows branded "Approval Confirmed" page (auto-closes)
- `renderRejectionSuccess(res)` - Shows branded "Rejection Confirmed" page (auto-closes)
- `renderAlreadyActioned(res, statusText, actionedBy, actionedDate)` - Shows "Already Processed" page
- `escapeHtml(str)` - Sanitizes user input for HTML rendering

#### Branded Success/Error Pages
- Gradient backgrounds (green for approve, red for reject, orange for already-processed)
- Animated icons (checkmark, X, info)
- Auto-close after 5 seconds
- Mobile-responsive design
- No NetSuite UI chrome (clean standalone pages)

#### Permission Model
- Suitelet runs in public context (no login required)
- Cannot access custom records directly (permission errors)
- Uses read-only `search.lookupFields()` for status checks
- All record updates happen in `SS_GNL_ApprovalQueue` with elevated permissions

### SL_GNL_BudgetSnapshot.js (Budget Diagnostic Endpoint)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/SL/SL_GNL_BudgetSnapshot.js`  
**URL:** `/app/site/hosting/scriptlet.nl?script=customscript_gnl_budget_snapshot&deploy=customdeploy_gnl_budget_snapshot`  
**Purpose:** JSON diagnostic endpoint for budget vs. actual totals. Useful while wiring budget enforcement and tray UI.
**Status:** ✅ Deployed 2025-11-04

#### Query Parameters
- `subsidiary` (required) – Subsidiary internal ID  
- `department`, `class`, `location` – Optional segment filters  
- `account` – Optional comma-separated list of GL account IDs  
- `startdate`, `enddate` – Date range (defaults to current month if omitted)

#### Response Example
```json
{
  "success": true,
  "data": {
    "budgetAmount": 10000,
    "actualAmount": 2500,
    "remainingAmount": 7500,
    "utilizationPercent": 25,
    "context": {
      "periodIds": ["338","339"],
      "filters": {
        "subsidiaryId": "1",
        "departmentId": "2",
        "classId": "5",
        "locationId": "1"
      }
    }
  }
}
```

#### Implementation Notes
- Uses `GNL_BudgetHelpers_V2.getBudgetSnapshot()` for SuiteQL budget totals (joins `budgets` + `budgetsmachine`) and transaction search totals.  
- Read-only diagnostic: no updates performed; intended for admins/engineering during configuration/testing.

---

## Scheduled Scripts

### SS_GNL_ApprovalQueue.js (Email Approval Queue Processor)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/SS/SS_GNL_ApprovalQueue.js`
**Schedule:** Every 1 minute
**Purpose:** Processes queued email approval actions with elevated Administrator permissions
**Execution Role:** Administrator (full permissions to update instances, send emails)

#### Processing Logic

```javascript
execute(context) {
    1. Search for queue records with status = 'Pending'
    2. For each queue record:
       a. Load queue record
       b. Re-validate HMAC token (defense in depth)
       c. Check token expiration (7 days)
       d. If invalid/expired: Update queue status = 'Failed', log error, continue
       e. Load approval instance record
       f. Validate instance still exists and is still Pending
       g. Call approveInstance() or rejectInstance() from SL_GNL_ApprovalActions
       h. If successful:
          - Update queue status = 'Completed'
          - Set processed timestamp
       i. If error:
          - Update queue status = 'Failed'
          - Set error message
          - Log details for debugging
    3. Returns: {processed: X, succeeded: Y, failed: Z}
}
```

#### Key Features
- **Defense in Depth:** Re-validates tokens even though Suitelet already validated
- **Error Handling:** Failed queue records logged for investigation, don't block others
- **Idempotency:** Can safely process same queue record multiple times (checks instance status)
- **Audit Trail:** Queue records provide complete history of email approval attempts
- **Self-Triggering:** Suitelet triggers immediate execution via `task.create()` for fast UX

#### Why Scheduled Script?
- Runs with elevated permissions (can access and update custom records)
- Separates public-facing UX from backend processing
- Provides retry mechanism if processing fails
- Allows for future batch processing optimizations

#### Error Scenarios Handled
- Invalid/expired token → Queue status = 'Failed', error message logged
- Instance already actioned → Queue status = 'Completed' (no-op, idempotent)
- Instance not found → Queue status = 'Failed'
- Permission errors → Queue status = 'Failed'
- General errors → Queue status = 'Failed', error details captured

#### Monitoring
- Check queue records with status = 'Failed' for issues
- Alert if queue processing time > 5 minutes (backlog)
- Dashboard showing: pending, completed, failed counts

---

### SS_GNL_Escalation.js (Approval Escalation Processor)

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/SS/SS_GNL_Escalation.js`
**Schedule:** Every 15 minutes
**Purpose:** Automatically escalates overdue approval instances based on SLA thresholds

#### Processing Logic

```javascript
execute(context) {
    1. Search for overdue instances:
       - Status = 'Pending Approval'
       - date_assigned + escalation_days < now
       - No escalation target assigned yet
    2. For each overdue instance:
       a. Load instance record
       b. Load parent step to get escalation target
       c. Update instance with escalation target (employee/role/group)
       d. Create escalation log entry
       e. Send escalation email to target + CC original approver
    3. Returns: {escalated: X}
}
```

#### Key Features
- **SLA Tracking:** Uses `date_assigned` field to track when approval clock started
- **Generation-Aware:** Escalation does NOT increment generation (only resubmission does)
- **Email Notifications:** Notifies both escalation target and original approver
- **Audit Trail:** All escalations logged in approval log

---

## Utility Libraries

### GNL_BudgetHelpers_V2.js

- **File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_BudgetHelpers_V2.js`  
- **Purpose:** Centralizes all budget lookups for approval workflows, tray UI, and AI assistant.  
- **Implementation:** Queries NetSuite’s `budgets` (header) and `budgetsmachine` (period detail) tables via SuiteQL, then combines results with a transaction search to calculate actual spend. Returns budget amount, actual spend, remaining amount, and utilization percentage along with the filters used.  
- **Status:** ✅ Prototype verified 2025-11-04 (used by `SL_GNL_BudgetSnapshot`).

---

**Next:** See [Library Files](04-libraries.md) for shared utility modules.
