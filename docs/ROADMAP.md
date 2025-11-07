# Greenlight Approvals - Product Roadmap

**Last Updated:** 2025-11-05
**Current Phase:** Phase 5 (Reporting & Analytics)
**Target MVP:** January 2026

For completed features, see [COMPLETED_FEATURES.md](./COMPLETED_FEATURES.md).

---

## 📊 Roadmap Overview

**Remaining Development:** 80-97 hours (CRITICAL + HIGH PRIORITY phases only)

**Critical Path (Must-Have for MVP):**
1. ✅ Phase 4.5: Rule Re-Evaluation (VERIFIED WORKING - no work needed)
2. ✅ Phase 4.6: Custom Criteria (COMPLETE - core implementation done)
3. 🚧 **Phase 5: Reporting & Analytics** (26-30 hours MVP) - **IN PROGRESS**
4. 📋 Phase 6: Budget Integration (12-15 hours, helper + tray wiring complete)
5. ✅ Phase 7A: Email Notifications (MVP COMPLETE)

**Nice-to-Have (Post-MVP or v1.1):**
- Phase 7B+: Slack/Teams Integration (12-15 hours)
- Phase 7C: Bulk & Fast-Track Approvals (8-10 hours)
- Phase 8: Conditional Flows (Deferred - use separate rules instead)
- Phase 9: Stretch Goals (Future)

---

## Phase 5: Reporting, Analytics & Compliance 📊

**Status:** IN PROGRESS
**Priority:** HIGH - Critical Compliance Differentiator
**Total LOE:** 40-47 hours (MVP: 26-30 hours)
**Implementation Plan:** `InProgress/PHASE_5_QLIMPLEMENTATION_PLAN.md`

### Overview

Transform approval data into audit-ready compliance documentation and business intelligence.

**Architecture:** SuiteQL + Suitelets for complex reports, Saved Searches for employee dashboards
**Settings-Driven:** All thresholds configurable (late approval days, critical amounts, aging buckets)
**Key Innovation:** Query/presentation separation enables future addition of interactive dashboards

### Part A: Report Settings & Employee Searches (6.5 hours) - MVP

**1. Report Settings Record** (1.5 hours)
- Create `customrecord_gnl_report_settings`
- 9 configurable threshold fields:
  - Late approval days (default: 3)
  - Critical amount threshold (default: $50,000)
  - Aging bucket thresholds (1-7 days, 8-14, 15-30, 30+)
  - Performance rating thresholds (Excellent <1 day, Good 1-3, Fair 3-7, Poor >7)
- Single record per account (similar to Settings)

**2. Employee Dashboard Searches** (5 hours)
- 9 saved searches with email reminders:
  - My Pending Approvals (with email alert)
  - My Approval History
  - My Delegations
  - My Escalations
  - Approvals I Submitted
  - Rejected Items I Submitted
  - Late Approvals Assigned to Me
  - Recent Activity
  - Performance Metrics (my avg turnaround time)

### Part B: Core Compliance Suitelets (12 hours) - MVP

**3. Approval Cycle Time Report** (3 hours)
- `SL_GNL_ApprovalCycleTimeReport.js`
- Performance metrics by approver, rule, transaction type
- Uses pre-computed hours_to_action field
- Filters: date range, approver, rule, transaction type
- Outputs: Average time, median, min, max, count
- Performance ratings: Excellent/Good/Fair/Poor

**4. Approval Exceptions Report** (3 hours)
- `SL_GNL_ApprovalExceptionsReport.js`
- 7 exception types with severity levels
- Uses boolean exception flags for filtering
- Groups by exception type, shows counts and details
- Drill-down to instance records
- Export to CSV

**5. Transaction Approval Evidence** (3 hours)
- `SL_GNL_TransactionApprovalEvidence.js`
- Complete audit trail for specific transaction
- Shows all generations (resubmissions)
- All approvers with timestamps
- Configuration changes during approval process
- Exception flags and resolutions
- Perfect for auditor requests

**6. Pending Approvals Aging** (3 hours)
- `SL_GNL_PendingApprovalsAging.js`
- Configurable aging buckets from Report Settings
- Current pending approvals by age
- Groups by age bucket, shows counts
- Highlights late approvals (exceeds threshold)
- Drilldown to instances

### Part C: Audit Package Generator (8-9 hours) - MVP

**7. One-Click Audit Package** (6-7 hours)
- `SL_GNL_AuditPackageGenerator.js`
- Bundles all reports into single ZIP export
- Date range selection
- Includes:
  - Transaction Approval Evidence (all transactions)
  - Approval Log Export (complete log)
  - Rule Definitions Export
  - Exception Summary
  - Configuration Change Log
  - README/Data Dictionary
- CSV format for Excel import
- Generates in background for large datasets

**8. Supporting Reports** (2 hours)
- Rule Definitions Export (CSV)
- Configuration Change Log (CSV)
- Delegation History (CSV)
- Escalation Log (CSV)

### Part D: One-Click Audit Package Deployment Script (0.5 hours)

**9. Deployment Convenience Script**
- Creates Report Settings record with defaults
- Creates all 9 employee saved searches
- Generates audit package template

### Post-MVP Enhancements (14-17 hours)

**Part E: Visual Dashboards** (6-7 hours)
- Chart.js integration for visualizations
- Executive Metrics Dashboard
- Department Performance Dashboard
- Approval Volume Trends
- Exception Trends Over Time

**Part F: Industry-Specific Audit Packages** (5-6 hours)
- SOX 404 Package (Sarbanes-Oxley)
- FDA 21 CFR Part 11 Package
- ISO 9001 Package
- HIPAA Package
- FINRA/SEC Package
- Custom Package Builder

**Part G: Real-Time Compliance Monitoring** (3-4 hours)
- Compliance Health Dashboard
- Alert feed by severity
- Compliance health score (0-100)
- Trend analysis

**Part H: Configurable Audit Exports (Phase 5B)** (6-8 hours)
- Child record (`customrecord_gnl_audit_export`) hanging off Report Settings
- Slots enforceable by license tier (Base vs SOX/HIPAA add-ons)
- Mix-and-match export definitions (Saved Search or SuiteQL per row)
- README generation driven by record metadata
- Automation to seed default seven exports + premium templates

### Why This is THE Differentiator

- **60-second audit response** vs. 60-hour manual process = **99% time savings**
- **Immutable audit trail** that cannot be deleted (unlike System Notes)
- **Industry-specific packages** = auditor-ready documentation
- **Real-time compliance monitoring** = catch violations before audits
- **ROI:** One audit = $3,000-$12,000 saved in staff time

---

## Phase 6: Budget vs Actual Enforcement 💰

**Status:** IN PROGRESS (Helper + tray snapshot live 2025-11-05)
**Priority:** HIGH - Key Differentiator
**LOE:** 12-15 hours
**Design Doc:** `BUDGET_INTEGRATION_DESIGN.md`

### Overview

Real-time budget enforcement using NetSuite native budgets during approval workflows.

**Unique Feature:** Only approval tool with native NetSuite budget integration - no competitor has this!

### Current Progress (2025-11-05)
- ✅ SuiteQL helper + diagnostics (`GNL_BudgetHelpers_V2.js`, `SL_GNL_BudgetSnapshot.js`) returning budget/actual/projected/utilization with per-dimension detail.
- ✅ Rule + instance schema deployed (budget enablement fields, snapshot storage, supporting custom lists).
- ✅ `UE_GNL_RuleEvaluation` aggregates transaction lines, persists JSON snapshots, and refreshes on resubmission.
- ✅ Approval tray renders Budget Snapshot summary + line breakdown with severity badges and warnings.

### Next Steps
1. Confirm “Actual Spend” alignment against posted transactions and document the validation steps.
2. Feed snapshot data into reporting/Audit Package exports (Cycle Time, Exceptions, Audit Package README).
3. Publish admin guidance for resolving budget overages (owner registry/process instructions).
4. Optional enhancements: relax filters when only Department budgets are required, add client-side budget owner lookups.

### Features

**1. Budget Integration via SuiteQL** (4-5 hours)
- ✅ `GNL_BudgetHelpers_V2.js` library created with `getBudgetSnapshot()` helper.
- Expand helper to include convenience wrappers (e.g., `checkDepartmentBudget()`, `checkVendorBudget()`) for rule consumption.
- Harden SuiteQL joins for multi-period ranges and optional `accountIds` filtering.
- Calculate budget utilization (actual + current transaction vs budget)

**2. Rule Configuration** (1 hour)
- Add budget enforcement fields to Rule record:
  - Budget check enabled (checkbox)
  - Budget type (Department, Vendor, Class, Location, GL Account)
  - Budget period (Current Month, Quarter, Year)
  - Threshold percentage (default 100%)
- Add budget snapshot fields to Instance record:
  - Budget amount, actual spend, current transaction, projected spend
  - Utilization %, overage amount, period

**3. Rule Evaluation Integration** (3-4 hours)
- Modify `UE_GNL_RuleEvaluation.js` to check budgets during rule matching
- Store budget status in runtime for use in afterSubmit
- Save budget snapshot to approval instance when triggered
- Log budget check results

**4. Approval Tray UI** (3-4 hours)
- Add `displayBudgetAlert()` function to Client Script
- Show budget alert box with:
  - Budget amount vs actual vs projected
  - Utilization percentage
  - Overage amount and percentage
  - Period (e.g., "October 2025")
  - "View Transaction Breakdown" button (optional drill-down)
- Style budget alert with warning colors

**5. Testing & Validation** (1-2 hours)
- Test department budget enforcement
- Test vendor budget enforcement
- Test transactions with no budget (should not block)
- Verify budget snapshot accuracy
- Test budget utilization calculations

### Scope

**Phase 1:** Department budgets, Vendor spend budgets
**Phase 2 (Backlog):** GL Account, Class, Location, Multi-dimensional budgets

---

## Phase 7: UX, Communications & Integrations 🎨

**Status:** Partial (Email MVP Complete)
**Priority:** MIXED (A is HIGH, B-D are MEDIUM)

### Phase 7A: Email Notifications ✅ COMPLETE

**Status:** MVP Complete (2025-10-22)
**Code:** 100% complete
**Remaining:** Post-MVP enhancements (12-17 hours) - See `InProgress/PHASE_7A_REMAINING_TASKS.md`

### Phase 7B: Slack & Microsoft Teams Integration (12-15 hours)

**Status:** Planned
**Priority:** MEDIUM - Modern Expectation

**1. Slack Integration** (6-8 hours)
- Incoming Webhooks - Send approval notifications to Slack channels
- Slash Commands - `/greenlight approve [transaction_id]`
- Interactive Buttons - Approve/Reject in Slack messages
- Channel Configuration - Route by transaction type/rule

**2. Microsoft Teams Integration** (6-7 hours)
- Incoming Webhooks - Send to Teams channels
- Adaptive Cards format
- Bot Framework - Interactive approve/reject actions
- Channel Configuration

### Phase 7C: Bulk & Fast-Track Approvals (8-10 hours)

**Status:** Planned
**Priority:** MEDIUM - Efficiency Feature

**1. Bulk Approval Interface** (5-6 hours)
- `SL_GNL_BulkApproval.js` suitelet with queue UI
- Multi-select checkbox list
- Filter by date, type, amount, department
- Sort by urgency, amount, date
- Batch approve action
- Transaction detail preview
- Permission validation

**2. Fast-Track Rules** (3-4 hours)
- Auto-approve conditions on rules
- `custrecord_gnl_rule_fast_track` checkbox
- `custrecord_gnl_fast_track_criteria`
- Automatically approve instances meeting criteria
- Log auto-approval in audit trail

### Phase 7D: Custom Center & UX Polish (2-5 hours)

**Status:** Planned
**Priority:** LOW - Optional Polish

- Create "Greenlight Approvals" center
- Personal approval queue view
- Filter by transaction type, urgency, amount
- Quick approve/reject actions
- Integration with existing tray UI

---

## Phase 8: Conditional & Dynamic Approval Flows 🔀

**Status:** DEPRIORITIZED
**Priority:** LOW-MEDIUM - Revisit After Customer Demand

### Analysis (2025-10-16)

After analysis, determined that **most use cases can be handled with separate rules** instead of conditional steps.

**When Separate Rules Work (RECOMMENDED):**
- Legal review for specific class → Create separate rule matching that class
- CFO approval for high amounts → Already handled by amount ranges
- Different approvers for vendors → Add vendor field to rule matching

**When You'd Actually NEED Conditional Steps:**
1. Admin wants fewer rules (convenience, not necessity)
2. Rule explosion problem - Too many combinations (e.g., 3 optional approvers = 8 rule variations)
3. Condition field not suitable for rule matching

**Remaining Optional Enhancements (Only if customer demand):**
- Advanced conditional step logic (AND/OR operators)
- Dynamic step injection (mid-approval field changes)

**Recommendation:**
- ⏸️ Skip for now - use separate rules instead
- 📋 Document "rule explosion" scenarios if customers report them
- 🔮 Revisit after 6-12 months of customer feedback

**Design Doc:** `CONDITIONAL_DYNAMIC_APPROVAL_FLOWS.md`

---

## Phase 9: Stretch Goals & Future Enhancements 🚀

**Status:** Future
**Priority:** LOW - Post-MVP

### Potential Enhancements

1. **Anomaly Detection** (6-8 hours)
   - First-time vendor flagging
   - 10x typical transaction amount alerts
   - After-hours submission detection
   - Fraud prevention and error catching

2. **Group Mode Logic** (3-4 hours)
   - Implement "All Must Approve" vs "Any One" logic
   - Field already exists, just need implementation
   - Majority voting, thresholds

3. **Signature Sign-Off** (Post-MVP)
   - E-signature integration for approval actions
   - Compliance requirement for certain industries
   - Requires third-party integration (DocuSign, Adobe Sign)

4. **Multi-Condition Step Logic** (6-8 hours)
   - Support complex conditions like "IF amount > 50k AND international order"
   - Current workaround: Use helper fields or separate rules
   - Wait for customer demand before implementing

5. **Optional Enhancements:**
   - Dynamic Deployment Manager
   - Validation Framework
   - License Enforcement
   - Unit tests (N/unit module)
   - Performance testing with high-volume scenarios

---

## 📅 Realistic Timeline to MVP

**Total Remaining:** 80-97 hours (CRITICAL + HIGH PRIORITY only)

### Phase-by-Phase Timeline

**November 2025 (4-6 weeks):**
- ✅ Phase 4.5: Rule Re-Evaluation - VERIFIED WORKING
- ✅ Phase 4.6: Custom Criteria - COMPLETE
- 🚧 **Phase 5: Reporting & Analytics (26-30 hours MVP)** - Weeks 2-6
  - Week 1: Settings + Employee Searches (6.5 hrs)
  - Week 2: Core Suitelets (12 hrs)
  - Week 3: Supporting Reports + Audit Package (8-9 hrs)

**December 2025 - January 2026 (6-8 weeks):**
- **Phase 6: Budget Integration (12-15 hours)** - Weeks 1-2
- **Phase 7B: Slack & Teams (12-15 hours)** - Weeks 3-4
- **Phase 7C: Bulk & Fast-Track (8-10 hours)** - Weeks 5-6
- **Testing & Documentation (4-6 hours)** - Weeks 7-8

### Critical Path

**Must-Have for Beta:**
1. Phase 5 (Reporting & Analytics) - Required for audit/compliance
2. Phase 6 (Budget Integration) - Key differentiator
3. ✅ Phase 7A (Email Notifications) - COMPLETE

**Can Defer to v1.1:**
- Phase 7B (Slack/Teams) - Nice to have
- Phase 7C (Bulk Approvals) - Can add based on feedback
- Phase 7D (Custom Center) - UX polish

### Target Dates

**Part-Time Development (10-15 hours/week):**
- **MVP Complete:** Late January to February 2026
- **Beta Testing:** +1-2 months (March-April 2026)
- **Production Ready:** April-May 2026

**Full-Time Development (40 hours/week):**
- **MVP Complete:** Late December 2025
- **Beta Testing:** +1-2 months (January-February 2026)
- **Production Ready:** March 2026

---

## 📊 Overall Project Completion Status

| Component | Status | Progress |
|-----------|--------|----------|
| **Core Rule Matching Engine** | ✅ Complete | 100% |
| **Custom Segments & Criteria** | ✅ Complete | 100% |
| **Approval Workflow System** | ✅ Complete | 100% |
| **Delegation & Escalation** | ✅ Complete | 100% |
| **Approval Tray UI** | ✅ Complete | 100% |
| **Email Notifications** | ✅ MVP Complete | 95% |
| **Audit Logging System** | ✅ Complete | 100% |
| **System-Agnostic Design** | ✅ Complete | 100% |
| **Custom Forms** | ✅ Complete | 100% |
| **Reporting & Analytics** | 🚧 In Progress | 0% |
| **Budget Integration** | 📋 Planned | 0% |
| **Slack/Teams Integration** | 📋 Planned | 0% |
| **Bulk Approvals** | 📋 Planned | 0% |

**Overall Completion:**
- **Core Approval Engine:** 100% ✅
- **Full SuiteApp Product:** 70-75% ✅
- **MVP Readiness:** 83% ✅

---

## 🎯 Strategic Positioning

**Primary Value:** 60-second audit response vs. 60-hour manual process (99% time savings)
**Secondary Value:** Budget integration prevents overruns ($200k-$500k annual savings)
**ROI:** 5-20x annual return (audit savings + budget prevention)

**Competitive Advantage:**
- Only NetSuite approval tool with one-click audit packages
- Only tool with native budget integration
- Immutable audit trail (unlike System Notes)
- Industry-specific templates (SOX, FDA, ISO expertise)

**Market Position:** Top 3 NetSuite approval platform after MVP complete
- #1 for: Compliance/audit documentation, budget integration, modern UX
- #2-3 for: Enterprise maturity (will improve with customer feedback)

---

**Last Updated:** 2025-11-02
**See Also:**
- [COMPLETED_FEATURES.md](./COMPLETED_FEATURES.md) - What's been built
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Current status
