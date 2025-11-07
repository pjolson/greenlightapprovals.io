# Greenlight Approvals - Project Overview

**Last Updated:** 2025-11-04
**Author:** Patrick Olson
**Business:** Greenlight Software LLC (Wyoming)
**Domains:** greenlightapprovals.io, greenlightsoftware.io
**Target Launch:** January 2026

---

## 🎯 Project Vision

Greenlight Approvals is a **sophisticated NetSuite SuiteApp** that provides enterprise-grade, rules-based transaction approval workflows with:

- **Multi-dimensional rule matching** - Subsidiary, Department, Location, Class, Custom Segments, Amount ranges
- **Sequential approval steps** - Flexible approver types (Employee, Role, Group, Supervisor, Project Manager, Field Value, Vendor, Partner)
- **Delegation management** - Time-bound delegations with exclusive/shared modes
- **Escalation workflows** - Time-based escalation with single-hop support
- **Comprehensive audit logging** - Complete compliance trail for all actions
- **Modern slide-out tray UI** - Right-side tray with purple branding and animations
- **Email notifications** - Native NetSuite templates with click-to-approve functionality
- **Budget integration** - Real-time budget vs actual enforcement (Phase 6 in progress)

---

## 📊 Current Status (2025-11-05)

### Overall Completion

| Component | Status | Progress |
|-----------|--------|----------|
| **Core Rule Matching Engine** | ✅ Complete | 100% |
| **Approval Workflow System** | ✅ Complete | 100% |
| **Approval Tray UI** | ✅ Complete | 100% |
| **Email Notifications** | ✅ MVP Complete | 95% |
| **Audit Logging System** | ✅ Complete | 100% |
| **Reporting & Analytics** | 🚧 In Progress | 25% |
| **Budget Integration** | 🚧 In Progress | 55% (Helper + tray snapshot live) |
| **Slack/Teams Integration** | 📋 Planned | 0% |

**Overall Completion:**
- **Core Approval Engine:** 100% ✅
- **Full SuiteApp Product:** 70-75% ✅
- **MVP Readiness:** 83% ✅

### Phase Status

- ✅ **Phase 4.6 Complete** - Custom Criteria for Rule Matching
- ✅ **Phase 7A MVP Complete** - Email Notifications
- ✅ **Phase 7B Complete** - Email-Based Approvals
- ✅ **Audit Logging Phases 1-5 Complete** - Comprehensive compliance tracking
- ✅ **System-Agnostic Design Complete** - Universal NetSuite compatibility
- ✅ **Custom Forms Complete** - Dynamic field visibility and UX improvements
- 🚧 **Phase 5 In Progress** - Reporting, Analytics & Compliance
- 🚧 **Phase 6 In Progress** - Budget snapshots persisted + tray budget card live (reporting/export work remaining)

---

## 📐 Current Architecture

### Core Data Model

**Approval Rules** (`customrecord_gnl_approval_rule`)
- Defines matching criteria for transactions
- Supports 10 custom segment slots for dynamic matching
- Configurable priority scoring (4-tier: Highest, High, Medium, Low)
- Flow mode gating (Project-only, Intercompany-only)
- Currency-safe amount ranges with null handling
- Decision Context Template field for displaying contextual info to approvers
- Transaction Type filtering
- Custom criteria (5 slots with 12 operators each)

**Approval Steps** (`customrecord_gnl_approval_step`)
- Sequential steps within a rule (Step 1, Step 2, etc.)
- Approver types: Employee, Role, Group, Supervisor, Project Manager, Field Value, Vendor, Partner
- Escalation config: days threshold + escalation target
- Conditional logic: Field-based conditions with 13 operators (including BETWEEN)
- Group mode: "All Must Approve" vs "Any One" (field exists, "Any One" implemented)

**Approval Instances** (`customrecord_gnl_approval_instance`)
- Runtime state for each step on each transaction
- Tracks: status, approver, delegate, dates, comments
- Links: transaction → rule → step → instance
- Exception tracking: 7 boolean flags + primary exception type + severity
- Performance metrics: hours_to_action, percent_of_target
- Generation tracking: generation number, resubmit reason, approver chain
- Transaction snapshot: 16 fields captured at approval creation time

**Delegation** (`customrecord_gnl_delegation`)
- Time-bound delegations (start/end dates)
- Exclusive vs Shared modes
- Auto-applied during instance generation

**Approval Log** (`customrecord_gnl_approval_log`)
- Audit trail for every approval action
- Configuration change tracking: old/new values with display text
- Performance metrics: hours_to_action (pre-computed)
- Exception logging: type, severity, description
- Escalation details: type, original assignee
- Denormalized reporting fields: txn_number, action_by_name (no joins needed)

**Settings** (`customrecord_gnl_settings`)
- Centralized config (single record per account)
- Flow modes, transaction types, scoring weights, no-match behavior
- Custom segment field mappings (seg1-seg10 → cseg_xxx)
- License tier and expiration tracking
- Multi-select subsidiary field for controlling which subsidiaries use Greenlight
- Active transaction types configuration
- Email template field references (5 SELECT fields pointing to Email Template records)
- 13 email-related fields for granular control

**Approval Queue** (`customrecord_gnl_approval_queue`)
- Queue-based architecture for email approvals
- HMAC token validation for security
- Status tracking: Pending, Processing, Completed, Failed
- Defense-in-depth: Token re-validated by queue processor

**Report Settings** (`customrecord_gnl_report_settings`)
- Configurable thresholds for compliance reporting
- Late approval days, critical amounts, aging buckets
- Performance rating thresholds

---

## 🗂️ File Structure

```
src/
├── FileCabinet/
│   └── SuiteScripts/
│       └── GreenlightApprovals/
│           ├── UE/
│           │   ├── UE_GNL_RuleEvaluation.js           ✅ Rule matching + instance generation
│           │   ├── UE_GNL_ApprovalRule_Audit.js        ✅ Rule change tracking
│           │   ├── UE_GNL_ApprovalStep_Audit.js        ✅ Step change tracking
│           │   ├── UE_GNL_Settings_Audit.js            ✅ Settings change tracking
│           │   ├── UE_GNL_ReportSettings_Audit.js      ✅ Report settings tracking
│           │   └── UE_GNL_ApprovalStepValidation.js    ✅ Step validation
│           ├── SS/
│           │   ├── SS_GNL_Escalation.js                ✅ Escalation processor
│           │   └── SS_GNL_ApprovalQueue.js             ✅ Email approval queue processor
│           ├── SL/
│           │   ├── SL_GNL_ApprovalActions.js           ✅ Approval actions API
│           │   └── SL_GNL_EmailApproval.js             ✅ Email-based approval handler
│           ├── CS/
│           │   ├── CS_GNL_ApprovalTray.js              ✅ Approval tray UI
│           │   └── CS_GNL_ApprovalStepHelper.js        ✅ Step form dynamic visibility
│           └── lib/
│               ├── GNL_RuleHelpers.js                  ✅ Rule matching utilities
│               ├── GNL_FeatureHelpers.js               ✅ Feature detection
│               ├── GNL_EmailHelpers.js                 ✅ Email sending library
│               ├── GNL_LogHelpers.js                   ✅ Audit logging utilities
│               └── GNL_ExceptionDetector.js            ✅ Exception detection
├── Objects/
│   ├── customrecord_gnl_approval_rule.xml              ✅ Rule definition
│   ├── customrecord_gnl_approval_step.xml              ✅ Step definition
│   ├── customrecord_gnl_approval_instance.xml          ✅ Runtime instances
│   ├── customrecord_gnl_delegation.xml                 ✅ Delegation management
│   ├── customrecord_gnl_approval_log.xml               ✅ Audit trail
│   ├── customrecord_gnl_settings.xml                   ✅ Central config
│   ├── customrecord_gnl_approval_queue.xml             ✅ Email approval queue
│   ├── customrecord_gnl_report_settings.xml            ✅ Reporting thresholds
│   ├── customlist_*.xml                                ✅ 20+ custom lists
│   ├── custbody_*.xml                                  ✅ Transaction body fields
│   ├── custform_*.xml                                  ✅ Custom forms (3 forms)
│   └── custemailtmpl_*.xml                             ✅ Email templates (5 templates)
├── manifest.xml                                         ✅ Project manifest (optional features)
├── deploy.xml                                           ✅ Deployment config
└── project.json                                         ✅ SDF config
```

---

## 🎓 Quick Start for New Team Members

### Understanding the Workflow

1. **Transaction Created** → System evaluates matching rules
   - `UE_GNL_RuleEvaluation.js` runs on create/edit
   - Matches transaction dimensions (subsidiary, dept, location, class, amount, custom segments, custom criteria)
   - Scores rules by specificity (highest score wins)
   - Sets transaction to **Draft** status with matched rule ID stored

2. **User Submits for Approval** → Approval instances created
   - User clicks "Submit for Approval" in tray
   - `SL_GNL_ApprovalActions.js` creates instances for each step
   - Transaction status changes to **Pending**
   - First approver receives email notification

3. **Approver Takes Action** → Workflow progresses
   - Approver can approve/reject via:
     - Approval tray UI (right-side slide-out)
     - Email click-to-approve buttons
   - `SL_GNL_ApprovalActions.js` validates permissions
   - Instance status updated (Approved/Rejected)
   - Audit log entry created
   - Exception detection runs
   - Next approver notified (if approved)

4. **Workflow Completes** → Transaction finalized
   - All steps approved → Transaction status = **Approved**
   - Any step rejected → Transaction status = **Rejected** (back to Draft)
   - Final notification sent to submitter
   - Native NetSuite approval status synced (for supported transaction types)

### Key Concepts

**Rule Matching:**
- Rules are matched on **every save** during Draft status
- Rule ID is stored on transaction for instance generation
- Re-evaluation happens automatically when fields change
- Specificity scoring prevents ambiguous matches

**Conditional Steps:**
- Steps can be conditional (only created if field condition matches)
- 13 operators supported including BETWEEN for range-based routing
- Enables direct approval patterns (skip intermediate approvers)

**Smart Re-Evaluation:**
- Transaction edits during Draft trigger re-evaluation
- Old instances marked as SUPERSEDED if rule changes
- New instances generated from new matched rule
- Complete audit trail preserved across all generations

**Exception Detection:**
- 7 exception types auto-detected (self-approval, late, missing approver, etc.)
- Multi-layer tracking: individual flags + primary exception + severity + general flag
- Enables zero-formula compliance reports

**Email Approvals:**
- Queue-based architecture for security and scalability
- HMAC token validation (defense-in-depth)
- Branded success pages with auto-close
- Professional rejection forms with character limits

---

## 🔑 Key Differentiators

1. **Comprehensive Audit Logging** - Zero-formula saved searches with pre-computed metrics
2. **System-Agnostic Design** - Works on ANY NetSuite edition (Starter to Enterprise)
3. **Budget Integration** (Stage 1 live) - SuiteQL helper + tray budget card surface real-time budget context during approvals
4. **Industry-Specific Audit Packages** (Planned) - SOX, FDA, ISO, HIPAA, FINRA compliance
5. **Modern UX** - Right-side tray, purple branding, professional design
6. **Smart Re-Evaluation** - Automatic rule re-matching prevents compliance bypass
7. **Conditional Steps** - Range-based routing eliminates rule explosion
8. **Email-Based Approvals** - External approvers without NetSuite login

---

## 📈 Development Timeline

**2025-10-12 to 2025-10-13:** Phase 2-3 (Decision Context, Draft Workflow, Role/Group Support)
**2025-10-16:** Phase 4.5 Analysis, Roadmap Expansion, Compliance Repositioning
**2025-10-17 to 2025-10-18:** Phase 4.5 Implementation (Smart Re-Evaluation + Conditional Steps)
**2025-10-19:** Phase 4.6 (Custom Criteria), System-Agnostic Design
**2025-10-20:** Phase 7A Email Notifications (10 commits in one day!)
**2025-10-22:** Phase 7A MVP Complete (6 transaction types, smart re-approval)
**2025-10-23:** Phase 7B Email-Based Approvals (Queue architecture)
**2025-10-24:** Custom Forms & UX Improvements
**2025-11-05:** Phase 6 Budget Snapshot wired into approval instances + tray (summary + detailed breakdown)
**2025-11-04:** Phase 6 Stage 1 Budget helper + validation Suitelet verified in sandbox
**2025-10-30 to 2025-11-01:** Audit Logging Phases 1-5 (Comprehensive compliance system)
**2025-11-02:** BETWEEN Operator, Native Approval Sync, Bug Fixes

**Next:** Phase 5 - Reporting & Analytics (26-30 hours MVP)

---

## 📞 Getting Help / Resuming Work

**When starting a new session:**

1. Review this overview for current status
2. Check [RECENT_UPDATES.md](./RECENT_UPDATES.md) for latest changes
3. Review [ROADMAP.md](./ROADMAP.md) for what's next
4. Reference specific topic docs as needed

**Key Questions to Provide:**
- What phase are you working on?
- What did you just try/deploy?
- What errors or issues are you seeing?
- What's the next step you want to achieve?

---

## 📚 Related Documentation

- [COMPLETED_FEATURES.md](./COMPLETED_FEATURES.md) - Detailed feature implementation
- [ROADMAP.md](./ROADMAP.md) - Future phases and planning
- [AUDIT_LOGGING.md](./AUDIT_LOGGING.md) - Comprehensive audit system
- [EMAIL_NOTIFICATIONS.md](./EMAIL_NOTIFICATIONS.md) - Email implementation
- [TECHNICAL_REFERENCE.md](./TECHNICAL_REFERENCE.md) - Constants, architecture decisions
- [TESTING_DEPLOYMENT.md](./TESTING_DEPLOYMENT.md) - Testing and deployment
- [RECENT_UPDATES.md](./RECENT_UPDATES.md) - Chronological changelog
- [POST_MVP_IDEAS.md](./POST_MVP_IDEAS.md) - Future enhancements

---

**Last Synchronized:** 2025-11-02
**Documentation Set:** v1.0 (Split from original DEVELOPMENT_NOTES.md)
