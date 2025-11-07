# Greenlight Approvals - Technical Reference

**Last Updated:** 2025-11-02

Quick reference for constants, architecture decisions, and technical details.

---

## 💡 Key Constants Reference

### Instance Status (`customlist_gnl_inst_status`)

```javascript
const INSTANCE_STATUS = {
    PENDING: '1',      // Awaiting approval
    APPROVED: '2',     // Approved by assignee
    REJECTED: '3',     // Rejected by assignee
    ESCALATED: '4',    // Escalated to another approver
    SKIPPED: '5',      // Step was skipped (conditional logic)
    DRAFT: '6',        // Draft status (not yet used for instances, see TRX_STATUS)
    SUPERSEDED: '7',   // Old instance superseded by new one (Smart Re-Evaluation)
    WAITING: '8'       // Waiting for previous step (sequential workflow)
};
```

**NetSuite Internal IDs (verified from production):**
- 1 = Pending Approval
- 2 = Approved
- 3 = Rejected
- 4 = Escalated
- 5 = Skipped
- 6 = Draft
- 7 = Superseded
- 8 = Waiting

### Transaction Status (`custbody_gnl_approval_status`)

```javascript
const TRX_STATUS = {
    PENDING: '1',      // Approval in progress
    APPROVED: '2',     // All steps approved
    REJECTED: '3',     // At least one step rejected
    DRAFT: '6'         // Created but not submitted for approval
};
```

**Note:** Uses same list as INSTANCE_STATUS

### Condition Operators (`customlist_gnl_condition_operator`)

```javascript
const CONDITION_OPERATOR = {
    EQUALS: '1',                    // Exact match
    NOT_EQUALS: '2',                // Not equal
    GREATER_THAN: '3',              // Numbers and dates only
    LESS_THAN: '4',                 // Numbers and dates only
    GREATER_THAN_OR_EQUAL: '5',     // Numbers and dates only
    LESS_THAN_OR_EQUAL: '6',        // Numbers and dates only
    IS_TRUE: '7',                   // Checkbox = true
    IS_FALSE: '8',                  // Checkbox = false
    IS_EMPTY: '9',                  // Field is null or empty string
    IS_NOT_EMPTY: '10',             // Field has a value
    CONTAINS: '11',                 // Text substring match (case-insensitive)
    IN_LIST: '12',                  // Value in comma-separated list
    BETWEEN: '13'                   // Range with inclusive bounds (NEW 2025-11-02)
};
```

**Best Practice:** Use text-based matching (`operator.getText()` = 'BETWEEN') instead of internal IDs for cross-environment stability

### Step Types (`customlist_gnl_step_type`)

```javascript
const STEP_TYPE = {
    EMPLOYEE: '1',          // Direct employee assignment
    ROLE: '2',              // All users in role
    GROUP: '3',             // NetSuite group (static or dynamic)
    SUPERVISOR: '4',        // Dynamic: created by's supervisor
    FIELD_VALUE: '8',       // Dynamic: value from transaction field
    PROJECT_MANAGER: '9',   // Dynamic: project manager from job
    VENDOR: '10',           // Vendor approver
    PARTNER: '11'           // Partner approver
};
```

### Flow Modes (`customlist_gnl_flow_modes`)

```javascript
const FLOW_MODE = {
    PROJECT: '1',       // Binary: Project-only vs non-project
    INTERCO: '2'        // Binary: Interco-only vs non-interco
};
```

### No-Match Behavior (`customlist_gnl_no_match_behavior`)

```javascript
const NO_MATCH = {
    ALLOW_PENDING: '1',     // Allow save, mark pending
    AUTO_APPROVE: '2',      // Allow save, mark approved
    BLOCK: '3',             // Block save with error
    LOG_ONLY: '4'           // Allow save, no status change
};
```

### Exception Types (`customlist_gnl_exception_types`)

```javascript
const EXCEPTION_TYPE = {
    SELF_APPROVAL: '1',         // SOD violation: creator = approver
    LATE_APPROVAL: '2',         // Exceeds threshold from Report Settings
    AMOUNT_CHANGED: '3',        // Transaction amount vs snapshot mismatch
    MISSING_APPROVER: '4',      // Empty approver field
    INVALID_APPROVER: '5',      // Inactive/deleted employee
    DUPLICATE_APPROVER: '6',    // Same person approving multiple steps
    BYPASSED: '7',              // Approval bypassed via admin override
    RULE_CHANGED: '8',          // Rule changed during approval
    MANUAL_OVERRIDE: '9',       // Manual status change
    CONFIGURATION_ERROR: '10'   // System configuration issue
};
```

### Exception Severity (`customlist_gnl_exception_severity`)

```javascript
const EXCEPTION_SEVERITY = {
    CRITICAL: '1',      // Immediate attention required (self-approval, bypassed)
    HIGH: '2',          // Important issue (missing approver, duplicate)
    MEDIUM: '3',        // Moderate concern (amount changed, late)
    LOW: '4',           // Minor issue (rule changed)
    NONE: '5'           // No exception
};
```

### Queue Status (`customlist_gnl_queue_status`)

```javascript
const QUEUE_STATUS = {
    PENDING: '1',       // Awaiting processing
    PROCESSING: '2',    // Currently being processed
    COMPLETED: '3',     // Successfully processed
    FAILED: '4'         // Processing failed
};
```

---

## 📐 Architecture Decisions

### Why Suitelet for Approval Actions?

**Decision:** Use Suitelet instead of Client Script direct record updates

**Rationale:**
- **Separation of concerns**: UI (Client Script) vs business logic (Suitelet)
- **Reusability**: Same backend serves tray UI, email approvals, bulk approval UI, external APIs
- **Testing**: Can test via direct URL calls before building UI
- **Security**: Centralized permission checks in one place
- **Auditability**: All actions logged consistently

### Why Sequential Instance Progression?

**Decision:** Each step is a separate instance record

**Rationale:**
- **Simplicity**: Each instance is independent, easy to query/display
- **Auditability**: Full timeline of who approved when
- **Flexibility**: Supports parallel approval in future (Group Mode)
- **Exception Tracking**: Can flag exceptions on individual instances
- **Performance**: Pre-computed metrics on each instance (no joins needed)

### Why Caching in Delegation Logic?

**Decision:** Cache delegation lookups per script execution

**Rationale:**
- **Performance**: Avoid redundant searches per approver per execution
- **Governance**: Reduces search usage (critical for high-volume)
- **Scope**: Cache is per-script-execution only (no stale data risk)
- **Implementation**: Simple JavaScript object stores results

### Why Queue-Based Email Approvals?

**Decision:** External Suitelet creates queue records, Scheduled Script processes them

**Rationale:**
- **Permissions**: External Suitelet lacks permissions to update instances directly
- **Security**: Defense-in-depth - token validated twice (Suitelet + Queue Processor)
- **Reliability**: Queue survives transient errors, can retry
- **Audit Trail**: Queue records provide approval action history
- **Scalability**: On-demand triggering (no constant polling)

### Why System-Agnostic Design?

**Decision:** Make all dimension features optional in manifest, detect at runtime

**Rationale:**
- **Universal Compatibility**: Installs on ANY NetSuite account (Starter to Enterprise)
- **No Installation Failures**: Missing features don't block installation
- **Same Codebase**: No separate "lite" version needed
- **Graceful Degradation**: Skips unavailable dimensions, logs clearly
- **Future-Proof**: Easy to add new dimension support

### Why Pre-Compute Audit Metrics?

**Decision:** Calculate hours_to_action, denormalize display values, store on instance/log records

**Rationale:**
- **Zero-Formula Reports**: Saved searches have no formulas (faster, easier)
- **Consistent Calculations**: Logic in one place (GNL_LogHelpers.js)
- **Performance**: No runtime calculations for reports
- **Auditor-Friendly**: Display text stored directly (no lookups needed)
- **Compliance**: Immutable audit trail (calculated once, never changes)

### Why Text-Based Operator Matching?

**Decision:** Use `operator.getText()` = 'BETWEEN' instead of internal IDs

**Rationale:**
- **Environment Independence**: Internal IDs can differ across environments
- **Readability**: 'BETWEEN' is clearer than '13' in logs
- **Stability**: Text values guaranteed by NetSuite
- **Migration-Safe**: SDF deploys may reassign internal IDs
- **Debugging**: Easier to troubleshoot with text values

---

## 🗂️ File Structure Reference

```
src/
├── FileCabinet/
│   └── SuiteScripts/
│       └── GreenlightApprovals/
│           ├── UE/                                     User Event Scripts
│           │   ├── UE_GNL_RuleEvaluation.js            Rule matching + instance gen
│           │   ├── UE_GNL_ApprovalRule_Audit.js        Rule change tracking (14 fields)
│           │   ├── UE_GNL_ApprovalStep_Audit.js        Step change tracking (20+ fields)
│           │   ├── UE_GNL_Settings_Audit.js            Settings change tracking (40+ fields)
│           │   ├── UE_GNL_ReportSettings_Audit.js      Report settings tracking (9 fields)
│           │   ├── UE_GNL_ApprovalStepValidation.js    Step validation (BETWEEN range check)
│           │   └── UE_GNL_InstanceProtection.js        Prevents direct instance edits
│           ├── SS/                                     Scheduled Scripts
│           │   ├── SS_GNL_Escalation.js                Escalation processor
│           │   └── SS_GNL_ApprovalQueue.js             Email approval queue processor
│           ├── SL/                                     Suitelets
│           │   ├── SL_GNL_ApprovalActions.js           Approval actions API
│           │   └── SL_GNL_EmailApproval.js             Email-based approval handler
│           ├── CS/                                     Client Scripts
│           │   ├── CS_GNL_ApprovalTray.js              Approval tray UI
│           │   └── CS_GNL_ApprovalStepHelper.js        Step form dynamic visibility
│           └── lib/                                    Shared Libraries
│               ├── GNL_RuleHelpers.js                  Rule matching utilities
│               ├── GNL_FeatureHelpers.js               Feature detection
│               ├── GNL_EmailHelpers.js                 Email sending library
│               ├── GNL_LogHelpers.js                   Audit logging utilities
│               └── GNL_ExceptionDetector.js            Exception detection
├── Objects/                                            SDF Objects
│   ├── Custom Records (7)
│   │   ├── customrecord_gnl_approval_rule.xml          Rule definition
│   │   ├── customrecord_gnl_approval_step.xml          Step definition
│   │   ├── customrecord_gnl_approval_instance.xml      Runtime instances (50+ fields)
│   │   ├── customrecord_gnl_delegation.xml             Delegation management
│   │   ├── customrecord_gnl_approval_log.xml           Audit trail (30+ fields)
│   │   ├── customrecord_gnl_settings.xml               Central config (60+ fields)
│   │   ├── customrecord_gnl_approval_queue.xml         Email approval queue
│   │   └── customrecord_gnl_report_settings.xml        Reporting thresholds
│   ├── Custom Lists (20+)
│   │   ├── customlist_gnl_inst_status.xml              Instance/transaction status
│   │   ├── customlist_gnl_condition_operator.xml       13 operators for conditions
│   │   ├── customlist_gnl_criteria_operator.xml        12 operators for custom criteria
│   │   ├── customlist_gnl_step_type.xml                8 approver types
│   │   ├── customlist_gnl_exception_types.xml          10 exception types
│   │   ├── customlist_gnl_exception_severity.xml       5 severity levels
│   │   ├── customlist_gnl_change_types.xml             6 change types
│   │   ├── customlist_gnl_record_types.xml             5 record types
│   │   ├── customlist_gnl_change_sources.xml           6 change sources
│   │   ├── customlist_gnl_escalation_types.xml         6 escalation types
│   │   └── customlist_gnl_queue_status.xml             4 queue statuses
│   ├── Transaction Body Fields (4)
│   │   ├── custbody_gnl_approval_status.xml            Transaction approval status
│   │   ├── custbody_gnl_matched_rule.xml               Matched rule reference
│   │   ├── custbody_gnl_rule_desc.xml                  Rule description
│   │   └── custbody_gnl_created_by.xml                 Created by employee
│   ├── Custom Forms (3)
│   │   ├── custform_gnl_step_form.xml                  Step form with dynamic visibility
│   │   ├── custform_gnl_approval_instance_form.xml     Instance view form (6 field groups)
│   │   └── custform_gnl_delegation_form.xml            Delegation management form
│   └── Email Templates (5)
│       ├── custemailtmpl_gnl_assignment.xml            Assignment notification
│       ├── custemailtmpl_gnl_approved.xml              Approval confirmation
│       ├── custemailtmpl_gnl_rejected.xml              Rejection notification
│       ├── custemailtmpl_gnl_complete.xml              Final approval
│       └── custemailtmpl_gnl_escalated.xml             Escalation notification
├── manifest.xml                                         Project manifest (3 required features)
├── deploy.xml                                           Deployment config
└── project.json                                         SDF config
```

### Script Execution Contexts

**User Event Scripts:**
- `UE_GNL_RuleEvaluation.js` - Runs on all configured transaction types (CREATE, EDIT, XEDIT, COPY)
- `UE_GNL_ApprovalRule_Audit.js` - Runs on Rule record (EDIT)
- `UE_GNL_ApprovalStep_Audit.js` - Runs on Step record (EDIT)
- `UE_GNL_Settings_Audit.js` - Runs on Settings record (EDIT)
- `UE_GNL_ReportSettings_Audit.js` - Runs on Report Settings record (EDIT)
- `UE_GNL_ApprovalStepValidation.js` - Runs on Step record (CREATE, EDIT) for BETWEEN validation
- `UE_GNL_InstanceProtection.js` - Runs on Instance record (prevents direct edits)

**Scheduled Scripts:**
- `SS_GNL_Escalation.js` - Daily schedule (finds instances past threshold)
- `SS_GNL_ApprovalQueue.js` - On-demand (NOTSCHEDULED status, triggered via N/task.create())

**Suitelets:**
- `SL_GNL_ApprovalActions.js` - Approval tray backend (internal access)
- `SL_GNL_EmailApproval.js` - Email approval handler (external access, no login required)

**Client Scripts:**
- `CS_GNL_ApprovalTray.js` - Runs on all configured transaction forms (pageInit, fieldChanged)
- `CS_GNL_ApprovalStepHelper.js` - Runs on Step form (pageInit, fieldChanged)

---

## 🔑 Key Function Reference

### Rule Matching (`UE_GNL_RuleEvaluation.js`)

```javascript
findMatchingRule(transactionRecord, settingsId)
// Returns: { ruleId, score, description } or null
// Searches all active rules, scores by specificity, returns highest match

generateApprovalInstances(transactionId, ruleId, settingsId)
// Returns: Array of instance IDs created
// Generates instance records for each step in rule
// Applies delegations automatically
// Evaluates conditional step logic

applyDelegation(approverEmpId, instanceId, delegationCache)
// Returns: { delegateEmpId, isExclusive } or null
// Checks for active delegations with caching
```

### Rule Helpers (`GNL_RuleHelpers.js`)

```javascript
collectCandidate(ruleRecord, transactionRecord, segmentFieldMap, enabledDimensions)
// Returns: { matches: true/false, score: number, reason: string }
// Evaluates single rule against transaction
// Calculates specificity score

evaluateStepCondition(stepRecord, transactionRecord)
// Returns: true/false
// Evaluates conditional step logic with 13 operators
// Used during instance generation

buildSegmentFieldMap(settingsRecord)
// Returns: { 1: 'cseg1', 2: 'cseg2', ... }
// Maps segment slot numbers to field IDs
```

### Exception Detection (`GNL_ExceptionDetector.js`)

```javascript
detectAndFlagExceptions(instanceId)
// Returns: void (updates instance record)
// Runs all 6 exception checks
// Determines highest priority exception
// Updates instance with flags and primary exception

checkSelfApproval(instanceRecord, transactionRecord)
// Returns: { hasException: true/false, severity: 'CRITICAL' }
// Checks if approver = submitter (SOD violation)
```

### Email Helpers (`GNL_EmailHelpers.js`)

```javascript
sendAssignmentNotification(instanceId, settingsRecord)
// Returns: void
// Sends email to first approver (or all group/role members)
// Uses custemailtmpl_gnl_assignment template
// Includes HMAC token for click-to-approve

generateApprovalToken(instanceId, userId, expiresAt)
// Returns: Base64 URL-safe token
// HMAC SHA-256 signature
// Format: instanceId|userId|expiresAt|signature

validateToken(token)
// Returns: { valid: true/false, instanceId, userId, expired: true/false }
// Validates HMAC signature and expiration
```

### Audit Logging (`GNL_LogHelpers.js`)

```javascript
createApprovalLog(instanceId, action, userId, comments)
// Returns: log record ID
// Pre-computes hours_to_action
// Denormalizes txn_number and action_by_name
// Returns internal value AND display text for list fields

createFieldChangeLog(recordType, recordId, fieldName, oldValue, newValue, userId)
// Returns: log record ID
// Captures both internal values AND display text
// Generates contextual change reason
// No joins needed in reports

createExceptionLog(instanceId, exceptionType, severity, description, userId)
// Returns: log record ID
// Links to instance and transaction
// Includes exception details for reports
```

---

## 🚨 Known Issues & Technical Debt

### Low Priority

1. **Group Mode Not Implemented** (Optional Enhancement)
   - `custrecord_gnl_step_group_mode` field exists
   - "All Must Approve" vs "Any One Approves" logic missing
   - Current behavior: First person in group to approve advances workflow
   - Future enhancement: Require all group members or any one member

2. **No Unit Tests**
   - No automated test coverage
   - Future enhancement: Add SuiteScript 2.1 unit tests
   - Manual testing has been extensive and successful

3. **Settings Record Not in SDF Project** (Backlog)
   - Settings record currently excluded from deployment
   - Should include default Settings instance before SuiteApp conversion
   - Pre-populate safe defaults (email templates empty, features disabled)

### Previously Resolved

- ✅ Hard-coded Settings ID - Fixed with `getGreenlightSettingsId()`
- ✅ Transaction Body Fields Missing - All 4 fields added to Objects/
- ✅ Escalation Script Governance - Pagination and monitoring added
- ✅ Suitelet Permission Validation - Added `validateApprovalPermission()`

---

## 📝 Git Commit Conventions

**IMPORTANT - Commit Message Policy:**

- ❌ DO NOT add "Co-Authored-By: Claude" to commit messages
- ❌ DO NOT add Claude Code attribution footer
- ✅ Write clear, descriptive commit messages in present tense
- ✅ Reference issue/phase numbers when applicable
- ✅ Keep first line under 72 characters, detailed description in body

**Example:**
```
Implement BETWEEN operator for conditional step routing

Enables range-based approval routing (e.g., $25k-50k → Director only)
instead of chain approvals where all lower tiers must approve.

- Added BETWEEN operator to condition operator list
- Added Value 2 field for upper bound on Step record
- Implemented inclusive bounds evaluation (>= lower AND <= upper)
- Fixed bug: Sequential status assignment with step sorting
- Fixed bug: Purple vs gray status coloring

Fixes Phase 4.5 enhancement request.
```

---

## 📊 Phase 5 Dashboards & Saved Searches (Wrap-Up)

### Home Dashboard Recommendations
- Add these saved searches as dashboard portlets:
  - `GNL || My Pending Approvals`
  - `GNL || My Overdue Approvals`
  - `GNL || All Pending Approvals` (manager/admin view)
  - `GNL || My Transactions to Submit`
  - `GNL || Delegated to Me` (optional for delegates/executive assistants)
- When personalizing the dashboard, choose **Custom Search** portlets and select the saved search. Switch the dashboard to the **No Column** layout and drop every portlet into the center column so the cards align cleanly.

### Metrics & Employee Dashboards as Portlets
- Deploy both custom portlet scripts shipped with the SuiteApp:
  - `PT_GNL_MetricsPortlet.js` → Embedded executive metrics dashboard (`SL_GNL_MetricsDashboard.js`)
  - `PT_GNL_EmployeeDashboardPortlet.js` → Embedded personal dashboard (`SL_GNL_EmployeeDashboard.js`)
- Add a “Custom Portlet” to the dashboard, edit it, and pick the desired script/deployment. The suitelets honor `embedded=T`, so only the dashboard content renders (no NetSuite chrome).

### Custom Center Tab Layout
- For each Greenlight center tab (Admin, Manager, Employee):
  1. Add a dashboard section with the appropriate custom portlet (metrics or employee view).
  2. Layer in Reminder portlets if the role relies on native NetSuite KPIs.
  3. Add Custom Search portlets pointing to the key saved searches listed above.
- Keep the tab in **No Column** mode and center every portlet—this matches the executive dashboard styling and avoids cramped sidebars.

### Additional Notes
- Any Phase 5 saved search can also surface via a center-tab link or shortcut. Use `url.resolveScript` (helper Suitelet or script parameter) when building links so URLs stay account-agnostic.
- Publishing dashboards is optional. Many customers will configure layouts manually for each custom role; if you prefer a push model, you can still use **Personalize > Publish Dashboard** after arrangement.

---

## 🎓 Learning Resources

- [SuiteScript 2.1 Documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4387172221.html)
- [SuiteCloud Development Framework (SDF)](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_155931263126.html)
- [N/record Module](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4267255811.html)
- [N/search Module](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4345764122.html)
- [N/email Module](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4205693274.html)
- [N/crypto Module](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4280307874.html)

---

**Last Synchronized:** 2025-11-02
**See Also:**
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Project status
- [COMPLETED_FEATURES.md](./COMPLETED_FEATURES.md) - Feature details
- [ROADMAP.md](./ROADMAP.md) - Future planning
