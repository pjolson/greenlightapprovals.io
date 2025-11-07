# System Overview

**Document:** Architecture Overview
**Last Updated:** 2025-11-02
**Status:** 99% Complete (Phase 7B email approvals complete, Audit Logging Phases 1-5 deployed, BETWEEN operator complete, reporting & budget features pending)

---

## Executive Summary

Greenlight Approvals is a **NetSuite SuiteApp** that automates multi-step approval workflows for transactions with SOX-grade compliance features. Built as a compliance-first platform (not just workflow automation), it provides:

- **Rule-based approval routing** with specificity scoring
- **Multi-step sequential workflows** with conditional logic
- **SOX-ready audit trails** with change detection
- **Email notifications** with click-to-approve
- **Budget enforcement** (planned)
- **Compliance reporting** (in progress)

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    TRANSACTION FLOW                         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  UE_GNL_RuleEvaluation (beforeSubmit)                       │
│  - Matches transaction to approval rule                     │
│  - Sets status to Draft (if match) or Approved (if no rule) │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  UE_GNL_RuleEvaluation (afterSubmit)                        │
│  - Creates approval instances for each step                 │
│  - Sends assignment email to first approver                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  APPROVAL PROCESS                                           │
│  ┌───────────────────────────────────────────────────┐     │
│  │ Option A: Approve via Tray (Client Script)        │     │
│  │   → CS_GNL_ApprovalTray                           │     │
│  │   → Calls SL_GNL_ApprovalActions (POST)           │     │
│  └───────────────────────────────────────────────────┘     │
│  ┌───────────────────────────────────────────────────┐     │
│  │ Option B: Approve via Email Link                  │     │
│  │   → SL_GNL_EmailApproval (click-to-approve)       │     │
│  │   → HMAC token validation                         │     │
│  │   → Permission checking                           │     │
│  │   → Updates instance record                       │     │
│  └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  WORKFLOW ADVANCEMENT                                       │
│  - Mark current instance Approved                           │
│  - Create approval log entry                                │
│  - Activate next waiting instance (Waiting → Pending)       │
│  - Set date_assigned on newly activated instance (clock)    │
│  - If next step: Send assignment email to next approver     │
│  - If complete: Set transaction Approved, send final email  │
└─────────────────────────────────────────────────────────────┘
```

---

## Current Status (Phase Completion)

### ✅ Complete (100%)

- **Phase 1:** Core approval engine (rule matching, instance generation)
- **Phase 2:** Client Script UI (approval tray, status display)
- **Phase 3:** Advanced rule features (conditional steps, custom criteria, all approver types)
- **Phase 4:** Escalation & Reminders
  - ✅ Escalation workflow with generation tracking
  - ✅ Waiting status for sequential step activation
  - ✅ Escalation emails with context
  - ⏳ Reminders (post-MVP)
- **Phase 7A:** Email Notifications (100% complete)
  - ✅ All 5 email notification types working (Assignment, Approved, Rejected, Escalated)
  - ✅ Transaction-specific email headers for 7 MVP types (PO, SO, VB, ER, INV, VRA, JE)
  - ✅ Unified approval template with dynamic partial/final messaging
  - ✅ Email sending logic with proper name personalization
  - ✅ Content toggles (transaction header, line items, decision context)
  - ✅ Group/Role distribution
  - ✅ Search-based line item loading (workflow-safe)
  - ✅ Material change detection (smart re-approval)
  - ✅ Instance supersession with audit trail
  - ✅ Journal entry native approval integration
- **Phase 7B:** Queue-Based Email Approvals (100% complete)
  - ✅ HMAC token generation and validation
  - ✅ Approval Queue custom record
  - ✅ Public Suitelet (SL_GNL_EmailApproval) with branded pages
  - ✅ Scheduled Script (SS_GNL_ApprovalQueue) processor
  - ✅ Duplicate click prevention with instance status checking
  - ✅ "Already Processed" page showing status/date/who
  - ✅ Branded success/error pages (auto-close, gradient backgrounds)
  - ✅ Queue-based architecture for permission isolation
  - ✅ Defense-in-depth token re-validation
  - ✅ Complete audit trail via queue records
  - ✅ Emoji rendering fix in email templates
- **Phase 7D:** Custom Forms & UX (100% complete)
  - ✅ Approval Step form with progressive disclosure (CS_GNL_ApprovalStepHelper.js)
  - ✅ Dynamic field visibility for approver types (8 types)
  - ✅ Dynamic escalation fields (hide until escalation type selected)
  - ✅ Dynamic conditional logic fields (hide until checkbox checked)
  - ✅ Mandatory field enforcement (only when fields visible)
  - ✅ Approval Instance form organized with 6 field groups
  - ✅ Settings form with tab-based organization
  - ✅ Delegation form (standard layout)
  - ✅ Hide-first implementation pattern documented
  - ✅ Technical patterns for NetSuite form/client script interaction
- **Audit Logging Phases 1-5:** Complete Implementation (Deployed 2025-11-01)
  - ✅ **Phase 1 (Schema):** 6 custom lists + 52 fields across 3 records deployed 2025-10-30
  - ✅ **Phase 2 (Helper Library):** GNL_LogHelpers.js with 6 core functions deployed 2025-10-31
  - ✅ **Phase 3 (Config Tracking):** 4 User Event scripts deployed 2025-10-31
    - UE_GNL_ApprovalRule_Audit.js (14 tracked fields)
    - UE_GNL_ApprovalStep_Audit.js (20+ tracked fields)
    - UE_GNL_Settings_Audit.js (40+ tracked fields)
    - UE_GNL_ReportSettings_Audit.js (9 tracked fields)
  - ✅ **Phase 4 (Exception Detection):** GNL_ExceptionDetector.js deployed 2025-10-31
    - 6 detection functions (late, self-approval, missing, amount changed, invalid, duplicate)
    - Integrated into SL_GNL_ApprovalActions.js and SS_GNL_ApprovalQueue.js
    - Multi-layer exception tracking (individual flags + primary exception + severity)
    - Tested with self-approval scenario in production
  - ✅ **Phase 5 (Generation Tracking):** Deployed 2025-11-01
    - Resubmit reason capture (custrecord_gnl_inst_resubmit_reason)
    - Approver chain tracking (custrecord_gnl_inst_approvers)
    - Integrated into UE_GNL_RuleEvaluation.js, SL_GNL_ApprovalActions.js, SS_GNL_ApprovalQueue.js
    - Production validated with generation 2 resubmissions
  - ✅ All changes deployed to NetSuite TD3028957

### 🔄 In Progress

- **None** - Audit Logging implementation complete

### ❌ Not Started (0%)

- **Reporting & Analytics:** (30-37 hours)
  - Now unblocked: Audit Logging complete (Phase 5 deployed)
  - Ready to build: Report 2 (Approval Exceptions)
- **Phase 6:** Budget vs Actual Enforcement (12-15 hours)
- **Phase 7C:** Slack/Teams Integration (12-15 hours)

---

## Integration Points

### NetSuite Native Features Used

- **Email Templates:** Standard NetSuite email template records (-120 type)
- **Email Sending:** `email.send()` and `email.sendBulk()` modules
- **Saved Searches:** For group member lookups, escalation queries, reporting
- **Transaction Fields:** Custom body fields (`custbody_gnl_*`)
- **SuiteScript 2.1:** All scripts use modern API
- **SDF:** SuiteCloud Development Framework for deployment

### External Integrations (Planned)

- **Slack:** Phase 7B - Send notifications to Slack channels
- **Microsoft Teams:** Phase 7B - Send notifications to Teams channels
- **Webhook API:** Phase 8 - Allow external systems to trigger approvals

---

## Glossary

**Instance:** Individual approval request (one per step per transaction)
**Step:** One level in a multi-step workflow (e.g., Manager → Director → VP)
**Rule:** Approval rule definition (when approvals required, who approves)
**Delegation:** Temporary transfer of approval authority
**Escalation:** Automatic reassignment after timeout
**Smart Re-Evaluation:** Auto-detect transaction changes requiring re-approval
**Specificity:** Scoring algorithm for rule priority (more specific = higher score)
**Snapshot Fields:** Transaction state at approval time (for change detection)
**Decision Context:** Admin-configurable text shown to approvers (supports merge fields)
**HMAC Token:** Cryptographic signature for secure email links

---

**Next:** See [Data Model](02-data-model.md) for detailed custom record definitions.
