# AI Approval Assistant Integration

**Status:** Pending design approval  
**Last Updated:** 2025-11-04  
**Owner:** Greenlight Approvals Product Team

This document captures the end-to-end plan for embedding an AI-powered assistant inside the Greenlight approval tray. The goal is to give approvers a conversational way to surface budget data, approval history, and policy guidance without leaving the transaction.

---

## 1. Objectives & Use Cases

### 1.1 Business Goals
- Accelerate approver decisions by surfacing context on demand.
- Differentiate the product with an AI feature that resonates with NetSuite partners / SDN.
- Reduce clicks to dashboards/saved searches for budget and history questions.

### 1.2 User Scenarios
1. **Budget Check:** "What budget do we have left in Aftersales Care for November?"  
2. **Vendor Spend:** "How many POs did we approve for Vendor X this quarter?"  
3. **Approval History:** "Show the last five approvals I handled."  
4. **Policy Reminder:** "Why am I approving this step?" (pull rule/step context)  
5. **Exception Insight:** "Were there any escalations on this transaction before?"

### 1.3 Non-Goals
- Replacing NetSuite budgets or rebuilding budget data.  
- Free-form SQL generation (all queries must be pre-approved).  
- Offline/mobile assistant (Phase 1 is tray-only).

---

## 2. Architecture Overview

### 2.1 High-Level Components
1. **Assistant UI** – Chat panel rendered within the existing approval tray.  
2. **Intent Router** – Lightweight service or module that classifies user prompts into supported intents.  
3. **Data Handlers** – Deterministic SuiteQL/search routines for each intent.  
4. **Response Composer** – Formats the result set into conversational text and optional tables/charts.  
5. **Guardrails & Telemetry** – Logs interactions, controls cost, and prevents unsupported questions from generating action.

### 2.2 Data Flow
```
Approver → Tray Chat UI → Intent Router → Data Handler(s) → Response Composer → Tray UI.
```
- Conversation state stored per transaction (session) to allow follow-ups like "show #3".  
- LLM usage limited to intent classification and phrasing (no arbitrary database access).  
- Budget and history data fetched via existing SuiteQL/search helpers.

---

## 3. Development Stages & Effort

| Stage | Scope | LOE (hrs) |
|-------|-------|-----------|
| 1. Basic Concierge | Tray chat UI, intent router, 3–4 intents (budget, vendor spend, recent approvals), guardrails | 16–20 |
| 2. Enhanced Insights | Additional intents, inline tables/sparklines, conversation memory, error handling | +12–15 |
| 3. Wow Factor | Proactive prompts, multi-step follow-ups, quick-action palette, telemetry dashboard | +15–18 |

> Total for “wow” experience ≈ 45–50 hours when stacked sequentially.

### 3.1 Stage 1 – Basic Concierge (16–20 hrs)
- Chat panel + session handling in `CS_GNL_ApprovalTray.js`.  
- Intent classifier (LLM or ruleset) with prompts for budget, vendor spend, approval history, policy context.  
- Data handlers using SuiteQL/search (budget snapshot, vendor PO count, `getCompletedApprovalsData`).  
- Response templating + fallback message for unsupported questions.  
- Governance/cost guardrails (rate limit per transaction/user).

### 3.2 Stage 2 – Enhanced Insights (adds ~12–15 hrs)
- Per-dimension budget breakdown (line-level aggregation).  
- Exception/late approval summary intents.  
- Inline table rendering (HTML/Chart.js micro-visuals).  
- Conversation memory (session-scoped context object).  
- Better logging & admin toggles per intent.

### 3.3 Stage 3 – Wow Factor (adds ~15–18 hrs)
- Proactive suggestions on tray open (e.g., "Budget at 85%, review?").  
- Multi-step flows: "Show last 5" → "Open #3".  
- Quick-question palette / suggested prompts.  
- Voice-trigger or command palette (optional).  
- Usage analytics dashboard (which intents used, success rate, cost).

---

## 4. Implementation Details

### 4.1 Assistant UI
- Embed chat widget under current "Smart Insights" section.  
- Session persistence keyed by transaction ID + user ID + day (clears after close or approval).  
- UX features: typing indicator, minimal animation, copy-to-clipboard button for results.

### 4.2 Intent Router
- Use a constrained prompt to classify each query into supported intents (e.g., `budget_status`, `vendor_history`, `approval_history`, `policy_faq`, `exception_summary`).  
- Fallback label `unknown` returns a helpful message and recommended prompts.  
- Rate-limit classification calls per session (e.g., 1 every 3 seconds) to control API spend.

### 4.3 Data Handlers
- **Budget Status:** call `BudgetHelpers.getDepartmentSnapshot({ departmentId, period })`, aggregate by line segment.  
- **Vendor History:** reuse existing `getCompletedApprovalsData` filtered by vendor + date range.  
- **Approval History:** `getCompletedApprovalsData` filtered by current approver.  
- **Policy FAQ:** read from `custrecord_gnl_rule_decision_context` / `custrecord_gnl_step_context`.  
- **Exception Summary:** `getApprovalExceptionsData` + `getEscalationHistory` scoped to transaction.  
- Each handler returns structured JSON so the composer can render text and tables.

### 4.4 Response Composer
- Templates per intent: conversational text + optional stats (count, sum, percentage).  
- For tables, render HTML with consistent styling (max 5 rows, "View more" link to saved search if needed).  
- For budgets, show remaining amount, % utilized, and highlight near-threshold situations.  
- Compose disclaimers when data is older than X minutes (if cached).

### 4.5 Guardrails & Telemetry
- Log question, intent, handler duration, success/failure, and API cost.  
- Admin settings: enable/disable assistant, per-intent toggle, daily quota per user.  
- Security: ensure responses only include data approver has permission to see (reuse existing governance logic).  
- Errors: user-friendly message plus reference ID for support.

---

## 5. Integration with Budget Phase (Phase 6)
- Budget helper library (`lib/GNL_BudgetHelpers.js`) will expose per-dimension snapshots.  
- Approval assistant leverages the same helper; no new budget tables are written.  
- Instances store budget snapshot JSON for audit (e.g., `custrecord_gnl_inst_budget_snapshot`).  
- Tray assistant can refresh data on demand with a "Refresh budget figures" button (calls SuiteQL live).

---

## 6. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| LLM cost overruns | Rate limiting, caching intents, small prompt context |
| Data leakage (LLM sees sensitive fields) | Send only minimal metadata in prompts, never raw financial values; compose response locally |
| Unsupported questions frustrate users | Provide suggested prompts and "We can’t answer that yet" replies |
| Performance impact | Lazy-load assistant assets only when tray opens; reuse existing Suitelet endpoints |
| SDN review concerns | Keep AI layer optional, document limited scope; emphasize deterministic queries |

---

## 7. Deliverables
- Updated tray client script + UI components.  
- New `lib/GNL_AssistantIntents.js` (intent router + handlers).  
- Admin configuration (toggle + usage stats).  
- Documentation: user guide + admin guide + SDN partner brief.  
- Demo script for partners ("Ask the approval assistant" scenario).

---

## 8. Open Questions
1. Preferred LLM provider (OpenAI, OCI Generative AI, others)?  
2. Should we support voice input in Phase 1 or defer?  
3. Is there demand for cross-transaction queries ("show all approvals this week") or should we stay transaction-centric initially?  
4. How do we expose assistant usage to admins (email digest, dashboard)?  
5. Do we cache budget data per session, and if so, for how long?

---

## 9. Next Steps
- ✅ Document scope and architecture (this file).  
- 📋 Confirm LLM provider and cost model.  
- 📋 Implement Phase 6 budget helper (dependency).  
- 📋 Prototype Stage 1 assistant and demo to partner.  
- 📋 Gather feedback; iterate toward Stage 2/Stage 3 based on demand.

