# Key Workflows

**Document:** Process Flows & Diagrams
**Last Updated:** 2025-11-04

This document describes the six key workflows in the Greenlight Approvals system with detailed step-by-step processes.

---

## Table of Contents

1. [Transaction Submission](#workflow-1-transaction-submission)
2. [Approval via Tray](#workflow-2-approval-via-tray)
3. [Approval via Email (Queue-Based)](#workflow-3-approval-via-email-queue-based)
4. [Rejection](#workflow-4-rejection)
5. [Smart Re-Evaluation (Material Change Detection)](#workflow-5-smart-re-evaluation-material-change-detection)
6. [Escalation (Scheduled)](#workflow-6-escalation-scheduled)
7. [Audit Package Generation](#workflow-7-audit-package-generation)

---

## Workflow 1: Transaction Submission

```
1. User creates transaction (e.g., Purchase Order)
2. User clicks Save
3. UE_GNL_RuleEvaluation.beforeSubmit() fires
   → Matches transaction to rule
   → Sets status to Draft
4. UE_GNL_RuleEvaluation.afterSubmit() fires
   → Creates approval instances (one per step)
   → Sends assignment email to first approver
5. Transaction saved with status = Pending Approval
```

### Detailed Steps

**Step 3: beforeSubmit Processing**
- Extract transaction dimensions (subsidiary, department, location, class, amount, custom segments)
- Search for matching approval rules
- Apply specificity scoring to find best match
- If match found:
  - Set `custbody_gnl_matched_rule` = rule ID
  - Set transaction status = Draft
  - Set `custbody_gnl_rule_description` = rule name
- If no match:
  - Apply no-match behavior from Settings (Draft/Approved/Block/Log)

**Step 4: afterSubmit Processing**
- Set `custbody_gnl_created_by` if not already set
- For each step in matched rule:
  - Evaluate step condition (if configured)
  - If condition passes: Create instance record with snapshot fields
  - First step (sequence 1): Set status = Pending, set date_assigned = now
  - If approver type = Group and status = Pending: Snapshot member IDs to `custrecord_gnl_inst_group_members_json` via `GNL_GroupHelpers`
  - Snapshot SLA settings from Report Settings into `custrecord_gnl_inst_sla_target_hours` and `custrecord_gnl_inst_late_threshold_days` for downstream reminders/analytics
  - Subsequent steps: Set status = Waiting, date_assigned = null
  - Waiting group steps store `"[]"` until they are promoted, preventing stale roster data
- Send assignment email to first approver
- Create approval log entry for "Submitted" action

---

## Workflow 2: Approval (via Tray)

```
1. Approver opens transaction in NetSuite
2. CS_GNL_ApprovalTray.pageInit() fires
   → Renders approval tray UI
   → Shows current step, approver, decision context
3. Approver clicks "Approve" button
4. Client script calls SL_GNL_ApprovalActions
5. Suitelet processes approval:
   → Validates permission
   → Updates instance status = Approved
   → Creates approval log entry
   → Checks for next step
   → If next step: Sends assignment email to next approver
   → If complete: Sets transaction Approved, sends final email
6. Client script refreshes tray UI
```

### Detailed Steps

**Step 2: Tray Rendering**
- Check if transaction has approval instances
- Fetch approval data via GET request to SL_GNL_ApprovalActions
- Build HTML for:
  - Current status badge
  - Progress indicator (Step 1 of 3)
  - Approver information
  - “Why you’re reviewing this” (rule-level context with merge fields)
  - “What to check for this step” (step-specific instructions)
  - Approve/Reject buttons (if user has permission)
  - Approval history timeline

**Step 5: Approval Processing**
1. Load instance record
2. Validate instance status = Pending
3. Validate user permission:
   - Direct employee match
   - Active delegation
   - Role member (if approver type = Role)
   - Group member (if approver type = Group)
   - Admin override
4. Update instance:
   - Set status = Approved
   - Set approved_by = current user
   - Set approved_date = now
   - Set comments (if provided)
5. Create approval log entry
6. Run exception detection (GNL_ExceptionDetector)
7. Send confirmation email to submitter
8. Search for next waiting instance
9. If next waiting instance found:
   - Change status from Waiting → Pending
   - Set date_assigned = now (start escalation clock)
   - Refresh `custrecord_gnl_inst_group_members_json` so saved searches show the correct group roster
   - Send assignment email to next approver
10. If no more waiting instances:
    - Set transaction status = Approved
    - Send final approval email with "Fully Approved" messaging

---

## Workflow 3: Approval (via Email - Queue-Based)

```
1. Approver receives assignment email with approve/reject buttons
2. Approver clicks "Approve" button
3. Browser opens SL_GNL_EmailApproval (public Suitelet, no login)
4. Suitelet validates HMAC token:
   → Token signature valid (prevents URL tampering)
   → Token not expired (7 days)
5. Suitelet checks instance status (duplicate click prevention):
   → Uses search.lookupFields() (read-only, works in public context)
   → If already actioned: Shows "Already Processed" page with details
   → If still pending: Proceeds to step 6
6. Suitelet creates queue record:
   → Queue fields: instanceId, action='approve', token, status='Pending'
   → Triggers SS_GNL_ApprovalQueue to run immediately
7. Suitelet shows branded success page: "Your approval has been recorded!"
   → Animated green checkmark icon
   → Auto-closes after 5 seconds
8. SS_GNL_ApprovalQueue processes queue (runs every 1 minute):
   → Re-validates HMAC token (defense in depth)
   → Loads instance record (with Administrator permissions)
   → Validates instance still Pending
   → Calls approveInstance() from SL_GNL_ApprovalActions
   → Advances workflow to next step or completes
   → Refreshes `custrecord_gnl_inst_group_members_json` when a group step moves from Waiting → Pending
   → Sends notification emails
   → Updates queue status = 'Completed'
9. If another step: Assignment email sent to next approver
10. If complete: Final approval email sent to submitter
```

### Why Queue-Based Architecture?

**Problem:** Public Suitelets cannot access custom records (permission errors)

**Solution:** Two-tier architecture
1. **Public Suitelet (SL_GNL_EmailApproval):**
   - Runs without login (limited permissions)
   - Validates tokens
   - Checks status (read-only)
   - Creates queue record
   - Shows immediate feedback

2. **Scheduled Script (SS_GNL_ApprovalQueue):**
   - Runs as Administrator (full permissions)
   - Processes queue every 1 minute
   - Updates instance records
   - Sends emails
   - Handles errors gracefully

**Benefits:**
- Instant user feedback (no login required)
- Secure backend processing
- Retry mechanism for failures
- Complete audit trail via queue records

### Duplicate Click Prevention

When user clicks approve/reject link multiple times:
1. First click: Creates queue record, shows success page
2. Second click: Suitelet checks instance status before queuing
3. If already actioned: Shows "Already Processed" page with:
   - Status (Approved/Rejected)
   - Who actioned it (employee name)
   - When actioned (date/time)
4. No duplicate queue records created
5. No duplicate log entries created

---

## Workflow 4: Rejection

```
1. Approver clicks "Reject" (tray or email)
2. If tray: Client script shows comment dialog
3. If email: Suitelet shows rejection form
4. Approver enters mandatory rejection reason
5. Suitelet processes rejection:
   → Updates instance status = Rejected
   → Creates approval log entry with comments
   → Sets transaction status = Rejected
   → Sends rejection email to submitter (with reason)
6. Workflow stops (no further steps processed)
```

### Detailed Steps

**Email Rejection Flow:**
1. User clicks "Reject" button in email
2. Browser opens SL_GNL_EmailApproval with action=reject
3. Suitelet validates HMAC token
4. Suitelet checks instance status
5. If still pending: Show branded rejection form
   - Orange gradient background
   - Text area for comments (mandatory)
   - Submit button
6. User enters rejection reason
7. User clicks Submit
8. Suitelet creates queue record with action='reject' and comments
9. Suitelet shows branded rejection success page
   - Red gradient background
   - Animated X icon
   - Auto-closes after 5 seconds
10. SS_GNL_ApprovalQueue processes rejection:
    - Validates token
    - Updates instance status = Rejected
    - Sets rejection comments
    - Creates approval log entry
    - Sets transaction status = Rejected
    - Sends rejection email to submitter
    - Marks all other waiting instances as Superseded

---

## Workflow 5: Smart Re-Evaluation (Material Change Detection)

```
1. Transaction approved (status = Approved)
2. User edits transaction
3. UE_GNL_RuleEvaluation.beforeSubmit() fires
4. Detects transaction already has approved instances
5. Loads snapshot fields from current instances
6. Compares snapshot to new values for GL-impacting changes:
   - Amount changed (total field)
   - Entity changed (vendor/customer)
   - Subsidiary, Department, Location, or Class changed
   - Custom segment values changed (seg1-seg10)
   - Line item count changed
   - Line item amounts/accounts changed
7. Non-material changes IGNORED (do NOT trigger re-approval):
   - Memo/description edits
   - Attachment additions/removals
   - Non-financial custom fields
   - Date changes (unless effective date)
8. If material change detected:
   → Supersedes old instances (status = Superseded, reason = "Material change: [field] modified")
   → Re-matches transaction to rules (may match different rule)
   → Creates new instances (generation increments: 1 → 2)
   → Sets transaction back to Pending Approval
   → Sends new assignment emails
9. Old approval history preserved in logs (complete audit trail)
```

### Material vs Non-Material Changes

**Material Changes (trigger re-approval):**
- Amount increased or decreased
- Vendor/customer changed
- Subsidiary changed
- Department changed
- Location changed
- Class changed
- Custom segment values changed
- Line items added/removed
- Line item amounts changed
- Line item accounts changed
- Entity changed (vendor → different vendor)

**Non-Material Changes (no re-approval):**
- Memo text edited
- Attachments added/removed
- Expected receipt date changed
- Ship date changed
- Custom body fields (non-financial)
- Reference numbers changed

### Generation Tracking

- **Generation 1:** Initial submission
- **Generation 2:** First resubmission after rejection/change
- **Generation 3:** Second resubmission
- All instances in same approval attempt share same generation
- Escalation does NOT increment generation (only resubmission does)
- Resubmit reason captured in `custrecord_gnl_inst_resubmit_reason`

---

## Workflow 6: Escalation (Scheduled)

```
1. SS_GNL_Escalation scheduled script runs (every 15 minutes)
2. Searches for instances:
   - Status = Pending
   - date_assigned + escalation_hours < now
   - Not already escalated
3. For each overdue instance:
   → Updates instance with escalation target
   → Sends escalation email to target + original approver
   → Creates escalation log entry
4. Escalation target can now approve
```

### Detailed Steps

**Search Criteria:**
```javascript
[
  ['custrecord_gnl_instance_status', 'is', 'Pending'],
  'AND',
  ['formulanumeric: {now} - {custrecord_gnl_instance_assigned_date}', 'greaterthan', 'custrecord_gnl_escalation_hours']
]
```

**Escalation Processing:**
1. Load overdue instance
2. Load parent step to get escalation configuration
3. Determine escalation target:
   - If escalation type = Employee: Use specified employee
   - If escalation type = Role: Find all employees with role
   - If escalation type = Group: Find all group members
4. Update instance record:
   - Add escalation target (doesn't remove original approver)
   - Mark as escalated
5. Create escalation log entry:
   - Log escalation type
   - Log original assignee
   - Log new escalation target
   - Log hours elapsed
6. Send escalation email:
   - To: Escalation target
   - CC: Original approver
   - Subject: "Approval Escalated: [Transaction]"
   - Body includes: Original assignment date, time elapsed, generation info

### Escalation Notifications

**Email to Escalation Target:**
- "This approval has been escalated to you"
- Shows original approver
- Shows how long pending
- Shows transaction details
- Includes approve/reject buttons (if email actions enabled)

**Email to Original Approver:**
- "Your approval has been escalated"
- Shows escalation target
- Notifies them escalation occurred
- No action buttons (escalation target now responsible)

---

## Workflow 7: Audit Package Generation

```
1. Admin opens SL_GNL_AuditPackage Suitelet
2. Suitelet renders form with default date range + package name
3. Admin submits form
4. Suitelet creates timestamped folder under /SuiteScripts/GreenlightApprovals/AuditPackages
5. Suitelet executes 7 data harvesters (ReportQueries helpers)
6. Each helper returns search-based data → Suitelet converts to CSV
7. README.txt generated with coverage notes
8. Success page lists download links for all CSVs + README
```

### Data Retrieval Strategy (2025-11-04 update)

- Earlier SuiteQL attempts failed (missing custom fields, unsupported joins, locale date issues).  
- **Solution:** `lib/GNL_ReportQueries.js` now uses `search.create()` + pagination for the heavy exports.  
- `_normalizeDateParam()` safely parses Suitelet date parameters using `N/format`.  
- Helpers return **display-ready strings** (transaction number, approver name, exception text) so CSV builders do not need additional lookups.

### CSV Breakdown

| File | Helper | Notes |
|------|--------|-------|
| `01_pending_approvals.csv` | `getPendingApprovalsAging()` | SuiteQL – includes exception flags, generation, aging. |
| `02_approval_cycle_time.csv` | `getApprovalPerformanceData()` | SuiteQL – average hours, SLA %, escalations. |
| `03_approval_exceptions.csv` | `getApprovalExceptionsData()` | Search fallback – filters by `has_exception = T`, optional date filters. |
| `04_completed_approvals.csv` | `getCompletedApprovalsData()` | Search fallback – returns transaction/approver display text. |
| `05_configuration_changes.csv` | `getConfigurationChanges()` | Search fallback – grabs all change types, then filters in JS for Rule/Step/Settings. |
| `06_resubmissions.csv` | `getResubmissionsData()` | Search fallback – pulls all instances in range, then keeps rows where `generation > 1`. |
| `07_audit_log_complete.csv` | `getCompleteAuditLog()` | Search fallback – exports full audit trail (change type, action, old/new values, SLA metrics). |
| `08_delegation_history.csv` | `getDelegationHistory()` | Search fallback – delegator/delegate assignments with effective dates and exclusivity flags. |
| `09_escalation_history.csv` | `getEscalationHistory()` | Search fallback – escalation events (who escalated, escalation type, original assignee). |

### Error Handling & Logging

- Each helper logs `log.audit` with the row count (useful for spotting data spikes).  
- CSV creation is wrapped in try/catch; a failure on one export surfaces a friendly error and does **not** leave partial records behind.  
- Folder creation uses `record.create({ type: record.Type.FOLDER })` so SDF deployments remain clean.  
- README summarizes which CSV answers which audit questions; export takes ~3 seconds for ~380 log rows.

### Future Enhancements

- Optional ZIP streaming directly to the browser (current version stores files in File Cabinet).  
- Center-tab links + saved search shortcuts (Priority 2.5 work item).  
- Scheduled package generation (monthly/quarterly) once Phase 5 reporting stabilizes.
- Phase 5B concept: allow admins to configure exports via `customrecord_gnl_audit_export` (per-export Saved Search or SuiteQL definitions with license-based slot limits).

---

**Next:** See [Security Model](06-security.md) for permission validation and token security.
