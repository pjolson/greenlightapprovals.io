# Data Model

**Document:** Custom Records & Field Definitions
**Last Updated:** 2025-11-02

This document describes all custom records used in Greenlight Approvals, including complete field definitions, relationships, and implementation notes.

---

## Table of Contents

1. [Approval Rule](#1-approval-rule)
2. [Approval Step](#2-approval-step)
3. [Approval Instance](#3-approval-instance)
4. [Approval Log](#4-approval-log)
5. [Delegation](#5-delegation)
6. [Approval Queue](#6-approval-queue)
7. [Settings](#7-settings)
8. [Transaction Type](#8-transaction-type)
9. [Report Settings](#9-report-settings)
10. [Custom Lists](#10-custom-lists)

---

## 1. Approval Rule

**Record Type:** `customrecord_gnl_approval_rule`
**Purpose:** Defines when and how transactions require approval

### Key Fields

- `custrecord_gnl_rule_name` - Rule name (e.g., "PO Approval >$10K")
- `custrecord_gnl_rule_type` - Transaction type (Sales Order, Purchase Order, etc.)
- `custrecord_gnl_min_amount` / `custrecord_gnl_max_amount` - Amount thresholds
- `custrecord_gnl_subsidiary` - Subsidiary filter (multi-select)
- `custrecord_gnl_department` - Department filter (multi-select)
- `custrecord_gnl_location` - Location filter (multi-select)
- `custrecord_gnl_class` - Class filter (multi-select)
- `custrecord_gnl_segment1` through `custrecord_gnl_segment10` - Custom segment filters
- `custrecord_gnl_rule_decision_context` - Template for decision context (supports merge fields)
- `custrecord_gnl_effective_date` - Rule effective date
- `custrecord_gnl_expiration_date` - Rule expiration date
- `custrecord_gnl_rule_active` - Active/Inactive toggle

### Relationships

- Has many: Approval Steps (1-to-many)
- Has many: Custom Criteria (up to 3 per rule)

---

## 2. Approval Step

**Record Type:** `customrecord_gnl_approval_step`
**Purpose:** Defines individual approval steps within a rule

### Key Fields

- `custrecord_gnl_step_rule` - Parent rule (FK)
- `custrecord_gnl_step_number` - Step sequence number (1, 2, 3, etc.)
- `custrecord_gnl_step_name` - Step name (e.g., "Manager Approval")
- `custrecord_gnl_approver_type` - Employee, Role, Group, Vendor, Partner, Field
- `custrecord_gnl_approver_employee` - Employee approver (if type = Employee)
- `custrecord_gnl_approver_role` - Role approver (if type = Role)
- `custrecord_gnl_approver_group` - Group approver (if type = Group)
- `custrecord_gnl_approver_field` - Field ID for dynamic approver (if type = Field)
- `custrecord_gnl_step_condition_field` - Field for conditional logic (optional)
- `custrecord_gnl_step_condition_op` - Operator (EQUALS, GREATER_THAN, etc.) - 13 operators
- `custrecord_gnl_step_condition_value` - Comparison value (lower bound for BETWEEN)
- `custrecord_gnl_step_condition_value2` - Upper bound for BETWEEN operator (optional)
- `custrecord_gnl_escalation_hours` - Hours before escalation
- `custrecord_gnl_escalation_target` - Who to escalate to

### Conditional Step Operators

- EQUALS, NOT_EQUALS
- GREATER_THAN, LESS_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN_OR_EQUAL
- IS_TRUE, IS_FALSE
- IS_EMPTY, IS_NOT_EMPTY
- CONTAINS, IN_LIST
- BETWEEN (inclusive range: value >= lower AND value <= upper)

---

## 3. Approval Instance

**Record Type:** `customrecord_gnl_approval_instance`
**Purpose:** Tracks individual approval requests (one per step per transaction)

### Core Fields

- `custrecord_gnl_instance_transaction` - Transaction record (FK)
- `custrecord_gnl_instance_rule` - Matched rule (FK)
- `custrecord_gnl_instance_step` - Step definition (FK)
- `custrecord_gnl_instance_step_num` - Step number (denormalized for sorting)
- `custrecord_gnl_instance_status` - Draft (6), Pending (1), Approved (2), Rejected (3), Escalated (4), Skipped (5), Superseded (7), Waiting (8)
- `custrecord_gnl_approver_type` - Employee, Role, Group, etc. (denormalized)
- `custrecord_gnl_approver_employee` - Employee approver (if applicable)
- `custrecord_gnl_approver_role` - Role approver (if applicable)
- `custrecord_gnl_approver_group` - Group approver (if applicable)
- `custrecord_gnl_instance_created_date` - When instance created
- `custrecord_gnl_instance_assigned_date` - When instance became Pending (escalation clock starts). Set when status changes from Waiting → Pending
- `custrecord_gnl_instance_approved_date` - When approved
- `custrecord_gnl_instance_approved_by` - Who approved (employee FK)
- `custrecord_gnl_instance_delegate` - If approved by delegate
- `custrecord_gnl_instance_comments` - Approval/rejection comments
- `custrecord_gnl_decision_context` - Parsed decision context for this instance
- `custrecord_gnl_instance_superseded_by` - If re-evaluation created new instance (superseded instances have reason field populated)
- `custrecord_gnl_instance_generation` - Transaction resubmission round number (1 = first submission, 2 = first resubmit). All instances in same approval attempt share same generation. Escalation does NOT increment generation

### Snapshot Fields (for material change detection)

- `custrecord_gnl_snapshot_subsidiary`
- `custrecord_gnl_snapshot_department`
- `custrecord_gnl_snapshot_location`
- `custrecord_gnl_snapshot_class`
- `custrecord_gnl_snapshot_amount`
- `custrecord_gnl_snapshot_txn_type`
- `custrecord_gnl_snapshot_seg1` through `custrecord_gnl_snapshot_seg10`
- `custrecord_gnl_snapshot_entity` - Vendor/Customer at approval time
- `custrecord_gnl_snapshot_line_count` - Number of line items at approval time

**Purpose of Snapshots:** Detect GL-impacting changes after approval (amount increased, department changed, entity changed, line items modified) and trigger smart re-evaluation. Non-material changes (memo edits, attachments) do NOT trigger re-approval.

### Group Membership Snapshot (Phase 5 - Deployed 2025-11-04)

- `custrecord_gnl_inst_group_members_json` - Stores the approver group membership as a JSON array of employee internal IDs (CLOBTEXT).
  - Populated when the instance is first created with status Pending and the approver type = Group.
  - Refreshed every time a Waiting group step is promoted to Pending (tray approval and queue processor share the same helper).
  - Enables saved-search filtering (e.g., `contains "\"123\""`) so pending group steps surface to individual members.
  - Clears back to `[]` for non-group steps or when the step is not yet actionable.

### SLA Snapshot (Phase 5 - Deployed 2025-11-04)

- `custrecord_gnl_inst_sla_target_hours` - Captures the “Target Approval Time (Hours)” from Report Settings when the instance becomes pending.
  - Lets reminders/showcases compare current aging to the original SLA without re-reading configuration on every page load.
- `custrecord_gnl_inst_late_threshold_days` - Snapshot of “Late Approval Threshold (Days)” from Report Settings.
  - Supports “approaching late” vs “late” formulas in saved searches and documents what policy applied at the time of approval.

### Exception Detection Fields (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_inst_has_exception` - Master exception flag (CHECKBOX)
- `custrecord_gnl_inst_exception_type` - Highest priority exception (SELECT - customlist_gnl_exception_types)
- `custrecord_gnl_inst_exception_severity` - Pre-computed severity (SELECT - customlist_gnl_exception_severity)
- `custrecord_gnl_inst_exception_date` - When exception was first detected (DATETIMETZ)

### Specific Exception Flags (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_inst_exc_missing_approver` - Approver field empty or group empty
- `custrecord_gnl_inst_exc_self_approval` - Approver = transaction submitter (SOD violation)
- `custrecord_gnl_inst_exc_bypassed` - Approval workflow was bypassed
- `custrecord_gnl_inst_exc_late` - Approval exceeded target time
- `custrecord_gnl_inst_exc_very_late` - Approval significantly overdue
- `custrecord_gnl_inst_exc_amount_changed` - Transaction amount changed during approval
- `custrecord_gnl_inst_exc_invalid_approver` - Approver lacks proper authorization
- `custrecord_gnl_inst_exc_dup_approver` - Same person approved multiple steps

### Performance Metrics (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_inst_total_hours` - Hours from assignment to completion (FLOAT, pre-computed)
- `custrecord_gnl_inst_percent_of_target` - SLA compliance metric (PERCENT, pre-computed)
  - Formula: (total_hours / target_hours) * 100
  - Example: 153% = over target, 85% = under target

### Generation & Resubmission Tracking (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_inst_resubmit_reason` - Why transaction was resubmitted (TEXTAREA)
  - Only populated when generation > 1
  - Example: "Fixed missing invoice attachment"

### SOD Tracking (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_inst_approvers` - All employees who approved this instance (MULTISELECT - Employee)
  - Used for SOD checks - detect if same person approves multiple steps
  - Populated by approval scripts when instance is approved
  - Note: SOD enforcement not yet implemented, field ready for future

### Implementation Status

- ✅ **Phase 1 (Schema):** All 15 new fields deployed 2025-10-30
- ✅ **Phase 2 (Helper Library):** GNL_LogHelpers.js deployed 2025-10-31
- ✅ **Phase 3 (Config Tracking):** 4 User Event scripts deployed 2025-10-31
- ✅ **Phase 4 (Exception Detection):** GNL_ExceptionDetector.js deployed 2025-10-31, tested with self-approval scenario

---

## 4. Approval Log

**Record Type:** `customrecord_gnl_approval_log`
**Purpose:** Immutable audit trail of all approval actions, configuration changes, and exception detection

### Core Fields (Original)

- `custrecord_gnl_log_transaction` - Transaction (FK)
- `custrecord_gnl_log_instance` - Instance (FK)
- `custrecord_gnl_log_action` - Action (Submitted, Approved, Rejected, Escalated, etc.)
- `custrecord_gnl_log_actor` - User who performed action (renamed from log_user)
- `custrecord_gnl_log_datetime` - When action occurred (renamed from log_timestamp)
- `custrecord_gnl_log_comments` - Comments/reason
- `custrecord_gnl_log_system` - System-generated flag (CHECKBOX)
- `custrecord_gnl_log_rule` - Related rule (FK)
- `custrecord_gnl_log_step` - Related step (FK)

### Configuration Change Tracking (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_log_change_type` - Type of change (SELECT - customlist_gnl_change_types)
  - Values: Approval Action, Instance Field Change, Rule Modified, Step Modified, Settings Changed, Exception Detected
- `custrecord_gnl_log_record_type` - Which record type was changed (SELECT - customlist_gnl_record_types)
  - Values: Approval Instance, Approval Rule, Approval Step, Settings Record, Transaction
- `custrecord_gnl_log_record_id` - Internal ID of changed record (INTEGER)
- `custrecord_gnl_log_field_name` - Field that changed (TEXT, internal ID)
  - Example: "custrecord_gnl_rule_amt_min"
- `custrecord_gnl_log_changed_via` - How change occurred (SELECT - customlist_gnl_change_sources)
  - Values: User Action (UI), User Event Script, Workflow, Scheduled Script, RESTlet/Suitelet, System Process

### Old/New Value Tracking (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_log_old_value` - Previous value (TEXT, internal format)
  - Example: "10000" (internal ID or raw value)
- `custrecord_gnl_log_new_value` - New value (TEXT, internal format)
  - Example: "25000" (internal ID or raw value)
- `custrecord_gnl_log_old_value_display` - Previous value (TEXT, human-readable)
  - Example: "$10,000.00", "Alice Smith", "Pending Approval"
- `custrecord_gnl_log_new_value_display` - New value (TEXT, human-readable)
  - Example: "$25,000.00", "Bob Johnson", "Approved"

### Performance Metrics (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_log_hours_to_action` - Pre-calculated hours between assignment and action (FLOAT)
  - Used for SLA reporting without formulas
  - Example: 26.5 hours

### Generation Tracking (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_log_generation` - Which submission attempt (INTEGER)
  - Example: 2 (second submission after rejection)
  - Links log entries across resubmissions

### Escalation Details (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_log_escalation_type` - Why escalation occurred (SELECT - customlist_gnl_escalation_types)
  - Values: Timeout (SLA exceeded), Manual Escalation, SOD Conflict, Missing Approver, Empty Group, Supervisor Chain
- `custrecord_gnl_log_original_assignee` - Who SHOULD have approved (SELECT - Employee)
  - Populated when approval is escalated to someone else

### Denormalized Reporting Fields (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_log_txn_number` - Transaction number (TEXT, copied for fast reporting)
  - Example: "PO-1234"
  - Avoids joins in saved searches
- `custrecord_gnl_log_action_by_name` - Employee name (TEXT, copied for fast reporting)
  - Example: "Alice Smith"
  - Avoids joins in saved searches

### Error Tracking (Phase 1 - Deployed 2025-10-30)

- `custrecord_gnl_log_is_error` - Marks this log entry as error condition (CHECKBOX)
  - Example: TRUE for empty approval group detected
  - Used for error/exception reporting

### Implementation Status

- ✅ **Phase 1 (Schema):** All 52 new fields across 3 records deployed 2025-10-30
- ✅ **Phase 2 (Helper Library):** GNL_LogHelpers.js deployed 2025-10-31
- ✅ **Phase 3 (Config Tracking):** 4 User Event scripts deployed 2025-10-31 (Rule, Step, Settings, Report Settings)
- ✅ **Phase 4 (Exception Detection):** GNL_ExceptionDetector.js deployed 2025-10-31, integrated into approval workflows
- ✅ **Phase 5 (Generation Tracking):** Resubmit reason capture + approver chain tracking deployed 2025-11-01
- ✅ **Phase 6 (Testing):** Continuous testing in production, all features validated

**Compliance Note:** This table is append-only (never updated/deleted) for SOX compliance. All log entries are immutable once created.

---

## 5. Delegation

**Record Type:** `customrecord_gnl_delegation`
**Purpose:** Temporary delegation of approval authority

### Key Fields

- `custrecord_gnl_delegate_from` - Delegator (employee)
- `custrecord_gnl_delegate_to` - Delegate (employee)
- `custrecord_gnl_delegate_start_date` - Effective start date
- `custrecord_gnl_delegate_end_date` - Effective end date
- `custrecord_gnl_delegate_exclusive` - Exclusive (only delegate can approve) or Non-exclusive (both can approve)
- `custrecord_gnl_delegate_active` - Active/Inactive toggle
- `custrecord_gnl_delegate_reason` - Reason for delegation (optional)

---

## 6. Approval Queue

**Record Type:** `customrecord_gnl_approval_queue`
**Purpose:** Queue for processing email approval actions with elevated permissions

### Key Fields

- `custrecord_gnl_queue_instance` - Approval instance ID to be approved/rejected (text field, not FK for security)
- `custrecord_gnl_queue_action` - Action to perform: "approve" or "reject"
- `custrecord_gnl_queue_token` - HMAC token for re-validation by Scheduled Script
- `custrecord_gnl_queue_comments` - Comments for rejection (optional for approve)
- `custrecord_gnl_queue_status` - Processing status: Pending, Processing, Completed, Failed
- `custrecord_gnl_queue_created` - When queue record was created (DateTime)
- `custrecord_gnl_queue_processed` - When queue record was processed (DateTime)
- `custrecord_gnl_queue_error` - Error message if processing failed

### Architecture Pattern: Queue-Based Email Approvals

The queue architecture separates token validation (public Suitelet) from approval processing (elevated permissions Scheduled Script):

1. **Public Suitelet** (`SL_GNL_EmailApproval`) - Runs without login, limited permissions
   - Validates HMAC token
   - Checks instance status (prevents duplicate clicks)
   - Creates queue record
   - Shows immediate feedback to user

2. **Scheduled Script** (`SS_GNL_ApprovalQueue`) - Runs as Administrator, full permissions
   - Processes queue records every 1 minute
   - Re-validates HMAC token (defense in depth)
   - Loads and updates instance records
   - Sends notification emails
   - Updates queue status (Completed/Failed)

### Why Queue-Based?

- Public Suitelets cannot access custom records (permission errors)
- Queue decouples user experience from backend processing
- Allows for retry logic if processing fails
- Provides audit trail of email approval attempts

---

## 7. Settings

**Record Type:** `customrecord_gnl_settings`
**Purpose:** Global configuration (singleton record)

### Email Configuration

- `custrecord_gnl_enable_email` - Master on/off toggle for all email notifications
- `custrecord_gnl_email_tmpl_assign` - Assignment notification template (FK to email template)
- `custrecord_gnl_email_tmpl_approved` - Approval confirmation template
- `custrecord_gnl_email_tmpl_rejected` - Rejection notification template
- `custrecord_gnl_email_tmpl_complete` - Final approval template
- `custrecord_gnl_email_tmpl_escalated` - Escalation notification template

### Email Content Toggles

- `custrecord_gnl_show_txn_header` - Show transaction header in emails (T/F)
- `custrecord_gnl_show_line_items` - Show line items table in emails (T/F)
- `custrecord_gnl_show_decision_context` - Show decision context in emails (T/F)
- `custrecord_gnl_enable_email_actions` - Enable click-to-approve buttons (T/F)

### Line Items Configuration

- `custrecord_gnl_max_lines` - Max lines to show in email (default: 20)
- `custrecord_gnl_item_columns` - Newline-separated list of item sublist field IDs
- `custrecord_gnl_expense_columns` - Newline-separated list of expense sublist field IDs

### Workflow Configuration

- `custrecord_gnl_no_match_behavior` - What to do if no rule matches (Draft, Approved, Block, Log)
- `custrecord_gnl_allow_submitter_approve` - Allow submitter to approve their own transaction (T/F)
- `custrecord_gnl_require_comments` - Require comments on all approvals (T/F)
- `custrecord_gnl_enable_smart_reeval` - Enable smart re-evaluation on changes (T/F)

### Budget Enforcement (Planned)

- `custrecord_gnl_enable_budget_check` - Enable budget vs actual checking
- `custrecord_gnl_budget_warn_threshold` - Warn at X% of budget
- `custrecord_gnl_budget_block_threshold` - Block at X% of budget

### Custom Segments

- `custrecord_gnl_segment1_name` through `custrecord_gnl_segment10_name` - Friendly names for custom segments
- `custrecord_gnl_segment1_field` through `custrecord_gnl_segment10_field` - Field IDs for custom segments

---

## 8. Transaction Type

**Record Type:** `customrecord_gnl_trx_type`
**Purpose:** Maps NetSuite internal transaction types to friendly names and settings

### Key Fields

- `custrecord_gnl_txn_type_id` - NetSuite internal ID (e.g., "purchaseorder")
- `custrecord_gnl_txn_type_name` - Friendly name (e.g., "Purchase Order")
- `custrecord_gnl_txn_type_enabled` - Enable/disable approvals for this type
- `custrecord_gnl_txn_type_scope` - Transaction scope (Purchase, Sales, Expense, etc.)

### Supported Transaction Types (40+)

- Purchase: purchaseorder, vendorbill, vendorcredit, itemreceipt, vendorpayment
- Sales: salesorder, invoice, cashsale, creditmemo, returnauthorization, customerpayment
- Expense: expensereport, check
- Inventory: transferorder, itemfulfillment, inventoryadjustment
- Journal: journalentry (with native approval integration)
- Custom: custom transaction types

### Journal Entry Special Handling

- **Native Approval Integration:** Sets `approved=false` on capture, `approved=true` on approval to prevent immediate posting
- **Execution Context Filtering:** Automatically excludes system-generated journals (rev rec, depreciation, allocations, revaluations)
- **Email Actions:** Approve/Reject buttons disabled for journals (require UI review due to complexity)
- **Line Item Display:** Shows debit/credit balance verification instead of traditional line items

---

## 9. Report Settings

**Record Type:** `customrecord_gnl_report_settings`
**Purpose:** Configuration thresholds for compliance reporting and exception detection (singleton record)
**Deployed:** 2025-10-30 (recovered from production, added to SDF project)

### Key Fields

- `custrecord_gnl_rpt_late_days` - Late Approval Threshold (INTEGER, default: 2 days)
  - Approvals pending longer than this are flagged as "Late Approval"
- `custrecord_gnl_rpt_very_late_days` - Very Late Threshold (INTEGER, default: 5 days)
  - Approvals pending longer than this are flagged as "Very Late Approval"
- `custrecord_gnl_rpt_critical_amt` - Critical Amount Threshold (CURRENCY, default: $50,000)
  - Transactions above this amount get elevated scrutiny
- `custrecord_gnl_rpt_target_hours` - Target Approval Time (INTEGER, default: 48 hours)
  - SLA target for approval completion, used to calculate percent_of_target
- `custrecord_gnl_rpt_exclude_test` - Exclude Test Data (CHECKBOX, default: TRUE)
  - Filter test transactions from reports
- `custrecord_gnl_rpt_aging_bucket1` - Aging Bucket 1 (INTEGER, default: 3 days)
  - First bucket for pending approvals aging report
- `custrecord_gnl_rpt_aging_bucket2` - Aging Bucket 2 (INTEGER, default: 7 days)
  - Second bucket for pending approvals aging report
- `custrecord_gnl_rpt_aging_bucket3` - Aging Bucket 3 (INTEGER, default: 14 days)
  - Third bucket for pending approvals aging report
- `custrecord_gnl_rpt_perf_excellent` - Excellent Performance Threshold (PERCENT, default: 80%)
  - Approvals completed in <80% of target time = "Excellent"
- `custrecord_gnl_rpt_perf_good` - Good Performance Threshold (PERCENT, default: 100%)
  - Approvals completed in 80-100% of target time = "Good"
  - Above 100% = "Needs Improvement"

### Usage

- Referenced by exception detection scripts to determine late approvals
- Referenced by Report 2 (Approval Exceptions) for filtering
- Referenced by Report 4 (Pending Approvals Aging) for bucket categorization
- Allows admins to customize what counts as "late" without code changes

### Implementation Status

- ✅ Schema deployed to NetSuite (2025-10-30)
- ✅ Added to SDF project (recovered from production)
- 🔄 Phase 3 will track changes to these thresholds (UE_GNL_ReportSettingsChangeTracking.js)
- 🔄 Phase 4 will use thresholds for exception detection

---

## 10. Custom Lists

**Deployed:** 2025-10-30 (Audit Logging Phase 1)

These 6 custom lists support the enhanced audit logging system for compliance reporting:

### customlist_gnl_exception_types
**Purpose:** Exception classification for instance records and exception reports

**Values:**
1. Missing Approver - Approver field empty or group has no members
2. Self Approval - Approver = transaction submitter (SOD violation)
3. Bypassed Approval - Approval workflow was circumvented
4. Late Approval - Approval exceeded target time threshold
5. Very Late Approval - Approval significantly overdue (critical SLA breach)
6. Amount Changed - Transaction amount modified during approval process
7. Invalid Approver - Approver lacks proper authorization/role
8. Duplicate Approver - Same person approved multiple steps (potential SOD issue)
9. Out of Sequence - Approval occurred out of proper step order
10. Orphaned Instance - Instance exists but parent transaction or rule deleted

### customlist_gnl_change_types
**Purpose:** Classify what type of change occurred in log entries

**Values:**
1. Approval Action - User approved, rejected, or delegated
2. Instance Field Change - Approval instance field was modified
3. Rule Modified - Approval rule configuration changed
4. Step Modified - Approval step configuration changed
5. Settings Changed - System settings or report settings changed
6. Exception Detected - System detected compliance exception

### customlist_gnl_record_types
**Purpose:** Track which record type was modified in configuration change logs

**Values:**
1. Approval Instance - customrecord_gnl_approval_instance
2. Approval Rule - customrecord_gnl_approval_rule
3. Approval Step - customrecord_gnl_approval_step
4. Settings Record - customrecord_gnl_settings or customrecord_gnl_report_settings
5. Transaction - Native NetSuite transaction records

### customlist_gnl_change_sources
**Purpose:** Track HOW change happened (useful for debugging and audit trail)

**Values:**
1. User Action (UI) - Admin made change in NetSuite UI
2. User Event Script - beforeSubmit or afterSubmit script
3. Workflow - NetSuite workflow action
4. Scheduled Script - Background scheduled script
5. RESTlet/Suitelet - API or suitelet call
6. System Process - NetSuite internal process (e.g., mass update)

### customlist_gnl_escalation_types
**Purpose:** Why did escalation occur (for escalation logs and reporting)

**Values:**
1. Timeout (SLA exceeded) - Approval pending too long
2. Manual Escalation - Admin manually escalated
3. SOD Conflict - Segregation of duties violation detected
4. Missing Approver - Original approver terminated/inactive
5. Empty Group - Approval group has no active members
6. Supervisor Chain - Escalated up supervisor chain

### customlist_gnl_exception_severity
**Purpose:** Exception priority levels for filtering and alerting

**Values:**
1. Critical - Immediate attention required (e.g., SOD violation, bypassed approval)
2. High - Serious issue (e.g., very late approval, amount changed)
3. Medium - Notable concern (e.g., late approval, missing approver)
4. Low - Minor issue (e.g., slight delay, informational)
5. None - No exception (baseline for comparison)

**Usage:**
- Exception detection scripts set severity based on business rules
- Report 2 (Approval Exceptions) filters by severity
- Alerts and notifications use severity to determine urgency
- Admin dashboards group exceptions by severity

### Implementation Status

- ✅ All 6 lists deployed to NetSuite (2025-10-30)
- ✅ Referenced by new log and instance fields
- 🔄 Phase 4 will populate these values via exception detection

---

**Next:** See [Scripts Architecture](03-scripts.md) for detailed script implementations.
