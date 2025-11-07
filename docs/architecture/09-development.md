# Development Standards

**Document:** Coding Standards & Deployment Process
**Last Updated:** 2025-11-02

This document describes the development standards, naming conventions, and deployment process for Greenlight Approvals.

---

## Table of Contents

1. [File Naming Conventions](#file-naming-conventions)
2. [Code Standards](#code-standards)
3. [Deployment Process](#deployment-process)

---

## File Naming Conventions

### Scripts

- **User Event:** `UE_GNL_*.js`
  - Example: `UE_GNL_RuleEvaluation.js`
- **Client Script:** `CS_GNL_*.js`
  - Example: `CS_GNL_ApprovalTray.js`
- **Suitelet:** `SL_GNL_*.js`
  - Example: `SL_GNL_ApprovalActions.js`
- **Scheduled Script:** `SS_GNL_*.js`
  - Example: `SS_GNL_Escalation.js`
- **Map/Reduce:** `MR_GNL_*.js`
  - Example: `MR_GNL_BulkReassignment.js`
- **Library:** `GNL_*Helpers.js`
  - Example: `GNL_EmailHelpers.js`

### Custom Records

- **Pattern:** `customrecord_gnl_*`
- **Examples:**
  - `customrecord_gnl_approval_rule`
  - `customrecord_gnl_approval_step`
  - `customrecord_gnl_approval_instance`
  - `customrecord_gnl_approval_log`

### Custom Fields

- **Transaction body:** `custbody_gnl_*`
  - Example: `custbody_gnl_matched_rule`
- **Custom record fields:** `custrecord_gnl_*`
  - Example: `custrecord_gnl_instance_status`

### Script IDs

- **Scripts:** `customscript_gnl_*`
  - Example: `customscript_gnl_rule_evaluation`
- **Deployments:** `customdeploy_gnl_*`
  - Example: `customdeploy_gnl_rule_eval_po`

### Email Templates

- **Pattern:** `custemailtmpl_gnl_*`
- **Examples:**
  - `custemailtmpl_gnl_assignment`
  - `custemailtmpl_gnl_approved`
  - `custemailtmpl_gnl_rejected`

### Custom Forms

- **Pattern:** `custform_gnl_*`
- **Examples:**
  - `custform_gnl_step_form`
  - `custform_gnl_approval_instance_form`

---

## Code Standards

### API Version

**Always use:** `@NApiVersion 2.1`

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
```

### Module Pattern

Use AMD `define()` with dependency injection:

```javascript
define(['N/record', 'N/search', 'N/log', './GNL_EmailHelpers'],
    function(record, search, log, emailHelpers) {

        function beforeSubmit(context) {
            // Implementation
        }

        function afterSubmit(context) {
            // Implementation
        }

        return {
            beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit
        };
    }
);
```

### Error Handling

**Always wrap in try-catch blocks:**

```javascript
function approveInstance(instanceId) {
    try {
        // Business logic
        const instance = record.load({
            type: 'customrecord_gnl_approval_instance',
            id: instanceId
        });

        // ... processing

        instance.save();

        log.audit({
            title: 'Instance Approved',
            details: `Instance ${instanceId} approved successfully`
        });

    } catch (e) {
        log.error({
            title: 'Error Approving Instance',
            details: `Instance ${instanceId}: ${e.message}`
        });
        throw e;
    }
}
```

### Logging

Use comprehensive logging with `log.debug()` and `log.audit()`:

```javascript
// Debug logging (development)
log.debug({
    title: 'Rule Matching',
    details: `Checking ${rules.length} rules for transaction ${transactionId}`
});

// Audit logging (production tracking)
log.audit({
    title: 'Approval Processed',
    details: `Instance ${instanceId} approved by ${userId}`
});

// Error logging
log.error({
    title: 'Permission Denied',
    details: `User ${userId} not authorized for instance ${instanceId}`
});
```

### JSDoc Comments

Document all public functions:

```javascript
/**
 * Finds the best matching approval rule for a transaction
 * @param {Object} transactionData - Transaction dimensions (subsidiary, dept, location, etc.)
 * @param {Array} allRules - Array of all active approval rules
 * @returns {Object|null} - Matched rule with highest specificity, or null if no match
 */
function findMatchingRule(transactionData, allRules) {
    // Implementation
}
```

### Security

1. **No hardcoded credentials:** Use script parameters
2. **Validate all inputs:** Sanitize user data before processing
3. **Permission checks:** Always validate user permissions before actions
4. **Escape HTML:** Sanitize output in Suitelets to prevent XSS

```javascript
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
```

### Constants

Define constants at top of file:

```javascript
const STATUS = {
    DRAFT: '6',
    PENDING: '1',
    APPROVED: '2',
    REJECTED: '3',
    ESCALATED: '4',
    SKIPPED: '5',
    SUPERSEDED: '7',
    WAITING: '8'
};

const APPROVER_TYPE = {
    EMPLOYEE: 'Employee',
    ROLE: 'Role',
    GROUP: 'Group',
    FIELD: 'Field',
    VENDOR: 'Vendor',
    PARTNER: 'Partner',
    SUPERVISOR: 'Supervisor',
    PROJECT_MANAGER: 'Project Manager'
};
```

### Code Organization

1. **Constants first**
2. **Helper functions in the middle**
3. **Entry point functions at bottom**
4. **Return statement last**

```javascript
define(['N/record'], function(record) {

    // Constants
    const STATUS = { ... };

    // Helper functions
    function validatePermission(userId, instanceId) { ... }
    function sendNotification(recipientId) { ... }

    // Entry points
    function beforeSubmit(context) { ... }
    function afterSubmit(context) { ... }

    // Return
    return {
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
});
```

---

## Deployment Process

### 1. Development in SDF Project

All code changes in SDF project structure:

```
GreenlightApprovals/
├── src/
│   ├── FileCabinet/
│   │   └── SuiteScripts/
│   │       └── GreenlightApprovals/
│   │           ├── UE/
│   │           ├── CS/
│   │           ├── SL/
│   │           ├── SS/
│   │           └── lib/
│   ├── Objects/
│   │   ├── customrecord_*.xml
│   │   ├── customscript_*.xml
│   │   └── custemailtmpl_*.xml
│   └── manifest.xml
```

### 2. Test in Sandbox Account

```bash
# Authenticate
suitecloud account:setup

# Validate project
suitecloud project:validate

# Deploy to sandbox
suitecloud project:deploy
```

### 3. Verify in NetSuite UI

1. Navigate to **Customization > Scripting > Scripts**
2. Locate deployed scripts
3. Check deployment status (Active/Inactive)
4. Review script parameters
5. Test functionality manually

### 4. Git Commit

```bash
# Add changes
git add .

# Commit with descriptive message
git commit -m "Add exception detection to approval workflow

- Implement GNL_ExceptionDetector.js with 6 detection functions
- Integrate exception detection into SL_GNL_ApprovalActions
- Add exception flags to approval instance record
- Test self-approval scenario in production"

# Push to remote
git push origin main
```

### 5. Production Deployment

#### Option A: Via SDF (Recommended)

```bash
# Switch to production account
suitecloud account:setup

# Deploy
suitecloud project:deploy
```

#### Option B: Via Bundle

1. Create bundle in sandbox
2. Install bundle in production
3. Configure bundle settings
4. Deploy scripts

### Deployment Checklist

- [ ] Code reviewed by peer
- [ ] Unit tests passing (if applicable)
- [ ] Sandbox testing complete
- [ ] No hardcoded credentials
- [ ] Script parameters configured
- [ ] Deployment records created for all contexts
- [ ] Script logs reviewed for errors
- [ ] Performance tested with production-like data volume
- [ ] Rollback plan documented
- [ ] Stakeholders notified

---

**Next:** See [Quick Reference](10-quick-reference.md) for commonly used IDs and saved searches.
