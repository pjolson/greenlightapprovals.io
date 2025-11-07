# Library Files

**Document:** Shared Utilities & Helper Modules
**Last Updated:** 2025-11-04

This document describes all library modules that provide shared functionality across the Greenlight Approvals system.

---

## Table of Contents

1. [GNL_LogHelpers.js](#gnl_loghelpers-js)
2. [GNL_ExceptionDetector.js](#gnl_exceptiondetector-js)
3. [GNL_EmailHelpers.js](#gnl_emailhelpers-js)
4. [GNL_GroupHelpers.js](#gnl_grouphelpers-js)
5. [GNL_RuleHelpers.js](#gnl_rulehelpers-js)
6. [GNL_FeatureHelpers.js](#gnl_featurehelpers-js)
7. [GNL_ReportQueries.js](#gnl_reportqueries-js)

---

## GNL_LogHelpers.js

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_LogHelpers.js`
**Purpose:** Centralized audit logging for all approval actions, configuration changes, exceptions, and performance metrics
**Status:** ✅ Deployed 2025-10-31 (Phase 2 Complete)

### Public Functions

#### createApprovalLog(params)
Create log entry for approval/rejection actions

**Params:** `{ transactionId, instanceId, action, userId, comments, hoursToAction, generation }`

**Populates:**
- action, actor, datetime, hours_to_action, generation, denormalized fields
- Auto-calculates: hours_to_action from date_assigned to now
- Auto-populates: txn_number, action_by_name for fast reporting

---

#### createFieldChangeLog(params)
Create log entry for configuration changes (rules, steps, settings)

**Params:** `{ recordType, recordId, fieldId, oldValue, newValue, reason, changedVia }`

**Populates:**
- change_type, record_type, record_id, field_name, old/new values, changed_via
- Auto-converts: internal values to human-readable display values
- Used by: UE_GNL_RuleChangeTracking, UE_GNL_StepChangeTracking, UE_GNL_SettingsChangeTracking

---

#### createExceptionLog(params)
Create log entry for detected exceptions

**Params:** `{ instanceId, exceptionType, severity, message }`

**Populates:**
- is_error=true, change_type="Exception Detected", exception info
- Used by: GNL_ExceptionDetector module (Phase 4)

---

#### createEscalationLog(params)
Create log entry for escalations

**Params:** `{ instanceId, escalationType, originalAssignee, newAssignee }`

**Populates:**
- escalation_type, original_assignee, new assignee
- Used by: SS_GNL_Escalation scheduled script

---

#### getDisplayValue(recordType, fieldId, internalValue)
Convert internal value to human-readable display value

**Examples:**
- Employee ID "123" → "Alice Smith"
- List value "1" → "Pending Approval"
- Currency "10000" → "$10,000.00"

**Returns:** String display value
**Used by:** All logging functions for old_value_display and new_value_display

---

#### calculateHours(startDate, endDate)
Calculate hours between two dates

**Returns:** Number (hours with decimal precision)
**Example:** 26.5 hours
**Used by:** createApprovalLog() for hours_to_action metric

---

### Design Principles

- **Error tolerant:** Logging failures should NEVER break business operations
- **Denormalize aggressively:** Copy data for fast reporting (avoid joins in saved searches)
- **Pre-compute everything:** No formulas in saved searches (hours, percentages calculated at logging time)
- **Immutable logs:** Once created, log entries are never modified or deleted (SOX compliance)

---

## GNL_ExceptionDetector.js

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_ExceptionDetector.js`
**Purpose:** Automated detection and flagging of compliance violations and approval exceptions
**Status:** ✅ Deployed 2025-10-31 (Phase 4 Complete)

### Exception Detection Functions

#### detectAndFlagExceptions(instanceId)
Main detection orchestrator
1. Runs all 6 exception checks
2. Determines highest priority exception
3. Updates instance with exception flags
4. Creates exception log entries

**Returns:** `{ exceptionsFound, exceptionCount, primaryException }`

---

#### checkLateApproval(instRec)
Compares hours pending vs threshold from Report Settings
**Severity:** Medium (Late) or Low (Very Late)

---

#### checkSelfApproval(instRec)
Detects if approver = transaction submitter (SOD violation)
**Severity:** Critical

---

#### checkMissingApprover(instRec)
Checks if all approver fields are empty
**Severity:** High

---

#### checkAmountChanged(instRec)
Compares snapshot amount vs current transaction amount
**Severity:** Medium

---

#### checkInvalidApprover(instRec)
Verifies employee exists and is active
**Severity:** Critical

---

#### checkDuplicateApprover(instRec)
Searches for other approved instances with same approver
**Severity:** High

---

### Exception Types

```javascript
const EXCEPTION_TYPES = {
    MISSING_APPROVER: '1',
    SELF_APPROVAL: '2',        // Critical - SOD violation
    BYPASSED: '3',             // Critical
    LATE: '4',                 // Medium
    VERY_LATE: '5',            // Low
    AMOUNT_CHANGED: '6',       // Medium
    INVALID_APPROVER: '7',     // Critical
    DUPLICATE_APPROVER: '8',   // High
    OUT_OF_SEQUENCE: '9',
    ORPHANED: '10'
};

const SEVERITY = {
    CRITICAL: '1',  // Self Approval, Bypassed, Invalid Approver
    HIGH: '2',      // Missing Approver, Duplicate Approver
    MEDIUM: '3',    // Amount Changed, Late
    LOW: '4',       // Very Late
    NONE: '5'
};
```

### Integration Points

- Called after approve/reject in `SL_GNL_ApprovalActions.js` (lines 754, 884)
- Called after approve/reject in `SS_GNL_ApprovalQueue.js` (lines 159, 246)
- All calls wrapped in try-catch (non-blocking - errors don't prevent approvals)

### Multi-Layer Exception Tracking

1. **Individual boolean flags:** `exc_self_approval`, `exc_late`, `exc_amount_changed`, etc. (allows filtering by specific exception)
2. **Primary exception type:** List field showing highest priority exception (for grouping in reports)
3. **Severity level:** Pre-computed Critical/High/Medium/Low (for sorting)
4. **General flag:** `has_exception = T` (quick filter for any exception)

---

## GNL_EmailHelpers.js

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_EmailHelpers.js`
**Purpose:** All email notification logic

### Public Functions

#### sendAssignmentNotification(instanceId, transactionId)
Sends "You have a new approval request" email
- **To:** Approver (employee, all role members, or all group members)
- **Template:** custrecord_gnl_email_tmpl_assign

---

#### sendApprovalConfirmation(instanceId, transactionId)
Sends approval notification to submitter with dynamic messaging
- **Partial approval:** "Step 1 of 3 Approved" - indicates workflow in progress
- **Final approval:** "Fully Approved!" - indicates all steps complete
- **To:** Transaction submitter
- **Template:** custrecord_gnl_email_tmpl_approved (unified template with conditional sections)

---

#### sendRejectionNotification(instanceId, transactionId)
Sends "Your transaction was rejected" email
- **To:** Transaction submitter
- **Template:** custrecord_gnl_email_tmpl_rejected

---

#### sendEscalationNotification(instanceId, transactionId, originalInstanceId)
Sends "Approval escalated" email
- **To:** Escalation target + original approver (CC)
- **Includes:** original assignment date, time elapsed, generation tracking
- **Template:** custrecord_gnl_email_tmpl_escalated

---

### Internal Functions

#### sendEmailFromTemplate(templateId, recipientArray, emailData)
Core email sending function
1. Load email template
2. Replace placeholders: [recipientName], [transactionId], [amount], etc.
3. Replace conditional sections based on Settings toggles
4. Send email via email.send() or email.sendBulk()
5. Log email sent event

---

#### gatherEmailData(instanceId, transactionId)
Collects all data needed for email template

**Returns:**
```javascript
{
  transactionId, transactionType, amount, submitterName,
  approverName, stepNumber, totalSteps, decisionContext,
  transactionHeader (HTML), lineItems (HTML), approveUrl, rejectUrl
}
```

---

#### buildTransactionHeaderHTML(transactionRecord, trxRecordType)
Generates transaction-type-specific header HTML

**Switch statement with dedicated builder functions per transaction type:**
- buildPurchaseOrderHeader() - Vendor, Payment Terms, Receive By Date
- buildSalesOrderHeader() - Customer, Sales Rep, Ship Date
- buildExpenseReportHeader() - Employee, Department, Policy Violations
- buildVendorBillHeader() - Vendor, Payment Hold warnings, Discounts
- buildInvoiceHeader() - Customer, Currency, Payment Terms
- buildVendorReturnAuthorizationHeader() - Vendor, Return Amount, Created From
- buildJournalEntryHeader() - Minimal header, debits/credits balance
- buildDefaultHeader() - Fallback for all other transaction types

---

#### buildLineItemsHTML(transactionRecord, maxLines, itemColumnsConfig, expenseColumnsConfig)
Generates line items table HTML using search-based approach (workflow-safe)
- Uses separate searches for item lines and expense lines
- Item search: Filters by item presence, loads item-specific columns
- Expense search: Filters by account presence, loads expense-specific columns
- Automatically filters out blank lines (tax/shipping/subtotal rows)
- Shows BOTH tables if transaction has both sublists
- Supports configurable columns from Settings
- Truncates at maxLines, shows "X more lines..."
- Works even when transactions are workflow-locked (no record.load() needed)

---

#### parseMergeFields(template, transactionRecord)
Fully dynamic merge field replacement
- Finds all {fieldName} patterns in template
- Uses search.lookupFields() to get field values dynamically
- Replaces {fieldName} with actual value
- Supports {fieldName_formatted} for currency formatting

**Example:** `{tranid}` → "PO-12345", `{total_formatted}` → "$12,450.00"

---

#### getEmailsByGroup(groupId)
Looks up all employees in a group
- Handles static groups (employee members)
- Handles dynamic groups (saved search results)

**Returns:** `[{email: '...', name: '...', employeeId: ...}]`

---

#### getEmailsByRole(roleId)
Looks up all employees with a specific role

**Returns:** `[{email: '...', name: '...', employeeId: ...}]`

---

### Email Template Placeholder System

#### Standard Placeholders
- `[recipientName]` - Approver's name (personalized per recipient)
- `[transactionId]` - Transaction number (e.g., "PO-12345")
- `[transactionType]` - Transaction type name (e.g., "Purchase Order")
- `[amount]` - Transaction amount formatted (e.g., "$12,450.00")
- `[submitterName]` - Who submitted the transaction
- `[approverName]` - Who approved (for confirmation emails)
- `[stepNumber]` - Current step number (e.g., "1")
- `[totalSteps]` - Total steps in workflow (e.g., "3")
- `[rejectionReason]` - Rejection comments (for rejection emails)

#### Dynamic Content Placeholders
- `[transactionHeader]` - Replaced with HTML from buildTransactionHeaderHTML()
- `[lineItems]` - Replaced with HTML from buildLineItemsHTML()
- `[decisionContext]` - Replaced with parsed decision context from rule
- Step-level templates (`custrecord_gnl_step_context`) and the in-app tray reuse the same merge tokens (e.g., `{tranid}`, `{total_formatted}`, `{entity}`).

#### Conditional Sections (HTML Comments)
```html
<!--[TXN_HEADER_START]-->
  Transaction header content
<!--[TXN_HEADER_END]-->

<!--[LINE_ITEMS_START]-->
  Line items table
<!--[LINE_ITEMS_END]-->

<!--[RULE_CONTEXT_START]-->
  Decision context
<!--[RULE_CONTEXT_END]-->

<!--[EMAIL_ACTIONS_START]-->
  Approve/Reject buttons
<!--[EMAIL_ACTIONS_END]-->
```

**How Conditional Sections Work:**
1. Check Settings toggle (e.g., `custrecord_gnl_show_txn_header`)
2. If toggle = F (unchecked): Remove everything between START and END markers
3. If toggle = T (checked): Remove only the comment markers, keep content

---

## GNL_GroupHelpers.js

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_GroupHelpers.js`  
**Purpose:** Centralize group membership lookups (static + dynamic) and serialize JSON snapshots for approval instances  
**Status:** ✅ Deployed 2025-11-04 (Phase 5 Group Snapshot Refresh)

### Public Functions

#### getGroupMemberIds(groupId)
Return an array of employee internal IDs for the supplied group.

- Uses the `groupMember` join on `entitygroup` to enumerate static group members (no deprecated `groupmember` column).
- Detects dynamic groups (`isdynamic = T`) and loads the backing saved search to return the full membership.
- Logs errors without throwing, so approval flows continue even if a saved search misfires.

#### buildMemberJson(memberIds)
Serialize member IDs into a JSON string, defaulting to `"[]"`.

- Handles null/undefined inputs defensively.
- Prevents downstream scripts from double-stringifying results.

### Consumers

- `UE_GNL_RuleEvaluation` – captures the membership snapshot when the first group step is created and clears non-actionable steps back to `"[]"`.
- `SL_GNL_ApprovalActions` – refreshes the JSON when a Waiting group instance is promoted to Pending via tray actions.
- `SS_GNL_ApprovalQueue` – mirrors the tray behavior for email approvals so snapshots stay in sync regardless of channel.
- Saved searches can filter on tokens such as `"\"123\""` to target pending work for employee 123 without false positives.

---

## GNL_BudgetHelpers_V2.js

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_BudgetHelpers_V2.js`  
**Purpose:** Retrieve budget vs. actual totals for approval workflows, tray UI, and AI assistant prompts.  
**Status:** ✅ Integrated 2025-11-05 (wired into `UE_GNL_RuleEvaluation`, `SL_GNL_ApprovalActions`, and tray UI).

### Implementation Highlights
- Uses SuiteQL to sum budget amounts from `budgets` + `budgetsmachine`, filtering by subsidiary/department/class/location/account/period.
- Calculates actual spend via a transaction search (posted, non-mainline rows) over the same date range.
- Returns structured snapshot: `budgetAmount`, `actualAmount`, `remainingAmount`, `utilizationPercent`, plus filter/period metadata for downstream consumers.
- Designed for reuse across user events, Suitelets, the tray UI, and the forthcoming AI assistant.
- Stage 1 consumption: `UE_GNL_RuleEvaluation` persists JSON detail on the approval instance, `SL_GNL_ApprovalActions` exposes it, and `CS_GNL_ApprovalTray` renders summary + per-dimension breakdown.

### Example Usage
```javascript
const snapshot = BudgetHelpers.getBudgetSnapshot({
    subsidiaryId: 1,
    departmentId: 2,
    classId: 5,
    locationId: 1,
    startDate: new Date('2025-11-01'),
    endDate: new Date('2025-11-30')
});
// snapshot.budgetAmount, snapshot.actualAmount, etc.
```

---

## GNL_RuleHelpers.js

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_RuleHelpers.js`
**Purpose:** Rule matching logic with specificity scoring

### Key Functions

#### findMatchingRule(transactionData, allRules)
1. Filter rules by transaction type
2. Filter by effective/expiration dates
3. Filter by active status
4. Call collectCandidate() for each rule
5. Return highest-specificity rule (or null if no match)

---

#### collectCandidate(rule, transactionData)
Multi-dimensional matching:
1. Check amount in range (min/max)
2. Check subsidiary match (if rule has subsidiary filter)
3. Check department match (if rule has department filter)
4. Check location match (if rule has location filter)
5. Check class match (if rule has class filter)
6. Check custom segments (seg1-seg10)
7. Evaluate custom criteria (up to 3 field-based criteria with AND logic)
8. Calculate specificity score

**Returns:** `{matches: true/false, specificity: number}`

---

#### calculateSpecificity(rule)
Scoring algorithm (higher = more specific = wins):
- Has subsidiary: +10 points
- Has department: +8 points
- Has location: +6 points
- Has class: +5 points
- Has amount range: +15 points
- Has custom segment: +7 points per segment
- Has custom criteria: +10 points per criterion

**Example:** Rule with subsidiary + department + amount = 33 points

---

#### evaluateStepCondition(stepCondition, transactionRecord)
Evaluates conditional step logic

**Supports 12 operators:**
- EQUALS, NOT_EQUALS
- GREATER_THAN, LESS_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN_OR_EQUAL
- IS_TRUE, IS_FALSE
- IS_EMPTY, IS_NOT_EMPTY
- CONTAINS, IN_LIST

**Returns:** true/false (include step or skip step)

---

#### evaluateRuleCustomCriteria(rule, transactionRecord)
Evaluates up to 3 custom field criteria with AND logic

**Example:** amount > 10000 AND custbody_priority = "High" AND department = "IT"

**Returns:** true/false

---

### Specificity Scoring Example

```javascript
Rule A: Subsidiary = "US - East" (10 points)
Rule B: Subsidiary = "US - East" + Department = "IT" (10 + 8 = 18 points)
Rule C: Subsidiary = "US - East" + Department = "IT" + Amount > $10K (10 + 8 + 15 = 33 points)

Transaction: Subsidiary = "US - East", Department = "IT", Amount = $15,000
→ All 3 rules match, Rule C wins (highest specificity)
```

---

## GNL_FeatureHelpers.js

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_FeatureHelpers.js`
**Purpose:** NetSuite feature detection for portability across accounts

### Key Functions

#### isFeatureEnabled(featureId)
Checks if NetSuite feature is enabled
- Uses runtime.isFeatureInEffect()
- Caches results for performance
- **Examples:** SUBSIDIARIES, DEPARTMENTS, CLASSES, MULTIBOOK, CUSTOMSEGMENTS

---

#### getEnabledDimensions()
Returns object with all enabled features:
```javascript
{
  hasSubsidiaries: true/false,
  hasDepartments: true/false,
  hasLocations: true/false,
  hasClasses: true/false,
  hasCustomSegments: true/false
}
```

---

#### isSuiteAppEnvironment()
Detects if running in SuiteApp context (vs bundle vs standard account)
Used for feature gating

---

#### getAccountType()
**Returns:** 'sandbox', 'production', 'release_preview'

---

### Why This Matters

- Small businesses may not have Subsidiaries enabled
- Mid-market may not have Custom Segments
- Enterprise may have all features
- SuiteApp must gracefully handle all configurations

### Usage Example

```javascript
if (featureHelpers.isFeatureEnabled('SUBSIDIARIES')) {
    // Show subsidiary filter in rule matching
} else {
    // Skip subsidiary checks, works without OneWorld
}
```

---

## GNL_ReportQueries.js

**File:** `src/FileCabinet/SuiteScripts/GreenlightApprovals/lib/GNL_ReportQueries.js`  
**Purpose:** Centralized query helpers for dashboards, reports, and audit-package CSV exports  
**Status:** ✅ Updated 2025-11-04 (Phase 5 reporting search fallback)

### Why the 2025-11-04 Update?

- SuiteQL would not expose several log/list fields (`custrecord_gnl_log_action_by_name`, custom list joins, etc.).
- Joining directly to custom lists (for instance status) triggered `INVALID_SEARCH_TYPE`.
- Suitelet date inputs arrive as locale strings (`"1/1/2025"`) that SuiteQL ignores unless reformatted.
- Large audit exports (700+ rows) require paging—`query.runSuiteQL` returns everything at once, but the moment the SQL failed the whole suitelet stopped.

**Solution:** move the audit-package heavy lifters onto `search.create()`, normalize dates with `_normalizeDateParam()`, and page results via `getRange()`.

### Key Functions After the Refactor

- `getApprovalExceptionsData()` – search-based export with optional date filters; returns exception type/severity text.
- `getCompletedApprovalsData()` – search-based to fetch transaction/approver display values without SuiteQL joins.
- `getResubmissionsData()` – search-based; filters by date, then filters in JS for `generation > 1`.
- `getConfigurationChanges()` – search-based; we pull all change types then keep the “Rule/Step/Settings Changed” rows in code.
- `getCompleteAuditLog()` – search-based full audit log export (timestamp, change type, transaction info, rule/step, field changes, action, generation, SLA metrics).
- `getDelegationHistory()` – search-based export capturing delegator/delegate pairings with effective dates and exclusivity.
- `getEscalationHistory()` – search-based export capturing escalation events (type, original assignee, escalation trigger).
- `_normalizeDateParam(value)` – new helper that uses `N/format` to parse/render Suitelet-supplied dates safely.

SuiteQL is still used where it performs well (`getPendingApprovalsAging`, `getApprovalPerformanceData`), but search fallbacks keep the suitelet resilient.

### CSV Consumers

`SL_GNL_AuditPackage.js` now relies on these helpers for all seven CSV files:

| CSV | Helper | Notes |
|-----|--------|-------|
| `01_pending_approvals.csv` | `getPendingApprovalsAging()` | SuiteQL (unchanged). |
| `02_approval_cycle_time.csv` | `getApprovalPerformanceData()` | SuiteQL (calc hours/percent). |
| `03_approval_exceptions.csv` | `getApprovalExceptionsData()` | Search fallback. |
| `04_completed_approvals.csv` | `getCompletedApprovalsData()` | Search fallback. |
| `05_configuration_changes.csv` | `getConfigurationChanges()` | Search fallback + post-filter. |
| `06_resubmissions.csv` | `getResubmissionsData()` | Search fallback + generation filter. |
| `07_audit_log_complete.csv` | `getCompleteAuditLog()` | Search fallback (full audit trail). |
| `08_delegation_history.csv` | `getDelegationHistory()` | Search fallback – delegation assignments with exclusivity + notes. |
| `09_escalation_history.csv` | `getEscalationHistory()` | Search fallback – escalation events (type, original assignee, escalated by). |

All helpers return display-ready strings so the CSV generator doesn’t need extra lookups—e.g., `approver_name` already contains the employee display name, `transaction_number` is the denormalized text column, etc.

### When Adding New Queries

1. Start with SuiteQL only if the required fields are available; otherwise use `search.create`.
2. Normalize Suitelet date parameters with `_normalizeDateParam`.
3. Page through datasets (`getRange` in a loop).
4. Return human-readable text alongside IDs—exports and dashboards should not need extra lookups.
5. Log how many rows were returned (`log.audit`) to keep visibility during large exports.

See `lib/GNL_ReportQueries.js` for concrete examples of the pattern.

---

**Next:** See [Workflows](05-workflows.md) for detailed process flows.
