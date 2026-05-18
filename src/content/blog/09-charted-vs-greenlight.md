---
title: "Charted vs Greenlight Approvals for NetSuite"
description: "Charted vs Greenlight Approvals compared. AP suite bundling vs compliance-first design, budget intelligence, SoD enforcement, and audit depth."
pubDate: 2026-04-22
tags: ["approvals", "NetSuite", "compliance", "comparison"]
featured: false
---

Charted (formerly SquareWorks Consulting) offers an AP automation suite built natively inside NetSuite. Approval automation is one component of that suite, sitting alongside invoice AI, payment processing, 3-way matching, and accrual automation. For AP teams that want a single vendor covering the full procure-to-pay cycle, the bundled approach has clear advantages.

Greenlight Approvals has a narrower focus and a different starting point: compliance-first controls, budget-aware routing, and audit depth that treats the approval decision as the most important moment in the transaction lifecycle. Both tools are NetSuite-native. Both eliminate email chains and manual routing. The trade-off is depth versus breadth.

This isn't a teardown of Charted. It's a comparison of two design priorities so you can match the right tool to your team's needs.

## What Charted Offers

Charted's approval automation is part of a broader AP automation platform that includes invoice OCR, vendor onboarding, ACH/international payments, check printing, 3-way matching, document management, and accrual automation. The approval module is included with the suite, no separate license required.

**Broad transaction coverage:** Charted supports vendor bills, purchase orders, payment batches, vendor records, accrual journal entries, purchase requisitions, and any NetSuite record type. Wide net that covers most approval scenarios.

**Multi-dimensional routing:** Routing supports vendor, department, class, subsidiary, amount, and custom fields with sequential, parallel, and conditional approval chains. Configuration is designed to be intuitive without scripting.

**Email approvals and delegation:** Approvers can act on transactions from email without logging into NetSuite. Delegation and escalation handle reassignment when approvers are unavailable.

**Super approver capabilities:** Users with elevated permissions can approve entire records (skipping remaining steps), change active approvers mid-process with documented reasons, and modify approval types on the fly.

**License cost savings:** Charted markets a key financial benefit: eliminating NetSuite approver license fees. They cite $7,500+ in average annual savings by removing the need for per-user approval licenses.

**Audit trails:** Approval history captures timestamps, approver actions, comments, and delegation logging. Charted describes this as "100% audit trail compliance."

For AP teams that want approval workflows bundled into a full procure-to-pay platform without adding per-user license costs, Charted covers a lot of ground.

## The Key Differences

Charted builds approvals as one feature inside a full AP automation suite. Greenlight builds approvals as the core product, with every design decision oriented around the approval decision itself: the context around it, the controls governing it, and the evidence trail it produces.

### Budget Awareness

Charted routes approvals based on transaction attributes (vendor, department, class, subsidiary, amount) but the approval decision happens without live budget context. Approvers see the transaction but not how it affects departmental or GL spend.

Greenlight captures a budget snapshot during rule evaluation using SuiteQL against native NetSuite budgets. The approval tray displays budget vs. actual data inline, with line-by-line breakdowns and color-coded utilization warnings. Approvers toggle between Month, Quarter, and YTD views without leaving the transaction. Budget enforcement can warn or block at the rule level: type, period, and threshold are all configurable.

**This matters when** "can we afford this?" is part of the approval decision, not a separate conversation with FP&A. If approvers currently check a budget report before clicking approve, budget-aware approvals eliminate that step.

### Segregation of Duties

Charted references "automated segregation of duties tracking" in its marketing materials, but the product documentation describes a more limited control: approval history logging and the ability to track who acted on what. The specific enforcement mechanisms, what happens when a violation is detected, aren't detailed.

Greenlight enforces segregation of duties across three dimensions: creator self-approval detection (blocking or warning when the transaction creator tries to approve), duplicate approval prevention, and single-approver edge case handling. Each dimension is independently configurable: warn, enforce, or block and notify. SoD checks run at the point of every approval action, with violations logged automatically. Assignment emails proactively warn approvers about SoD restrictions before they open the transaction.

**This matters when** auditors ask "was the approver independent of the transaction creator?" rather than just "was it approved?" Tracking that a violation occurred after the fact is different from preventing it at the point of action.

### Rule Re-Evaluation

Charted's documentation doesn't describe how the system handles transactions edited after initial routing. Most approval tools evaluate rules at a single point (creation or submission) and the routing stays fixed.

Greenlight evaluates rules on every transaction save during Draft status. Change the amount, add a line, shift the department. The system re-evaluates which rule applies. If the matched rule changes, existing approval instances are marked as superseded and new ones are generated. The complete history is preserved across all generations.

A PO that starts at $8,000 and grows to $45,000 after line item changes should route through the approval chain that matches $45,000, not the one that matched $8,000. We've seen [150+ misrouted POs in a single environment](/resources/01-approval-re-evaluation/) from exactly this gap.

### Audit Trail Depth

Charted provides approval history with timestamps, approver actions, comments, and delegation logging. This covers the core requirement: you can see who approved what and when.

Greenlight captures a deeper record for every approval event: which rule triggered the routing, a transaction snapshot at the time of approval (16 denormalized fields), whether the transaction changed after approval, whether an override occurred and why, performance metrics like hours-to-action, and exception flags across twelve categories. Exception detection runs automatically. Self-approvals, late approvals, missing approvers, and other anomalies are flagged without manual review. All of this exports as a one-click audit package with modular report selection.

Finance teams where [audit prep takes weeks](/resources/03-real-cost-audit-prep/) know the difference between "we can look it up" and "here's the export."

### Multi-Dimensional Rule Matching

Charted supports routing based on vendor, department, class, subsidiary, amount, and custom fields with sequential, parallel, and conditional chains.

Greenlight matches on ten dimensions simultaneously: subsidiary, department, location, class, up to ten custom segments, amount ranges, transaction type, and five custom criteria fields with twelve operators each. Rules are scored by specificity, with the most specific match winning automatically. Conditional steps add another layer, where approval steps only activate when a field-based condition is met, using thirteen operators including BETWEEN for range-based routing.

Multi-subsidiary organizations where Marketing's threshold in one subsidiary differs from Engineering's in another, and capital expenditures route differently from operating expenses regardless of department, get the most from specificity-scored matching. It handles that complexity within a manageable number of rules.

### Approval Experience

Charted provides email-based approvals and in-NetSuite approval actions. Super approvers can skip steps and reassign mid-process. The emphasis is on flexibility and reducing friction in the approval flow.

Greenlight provides a right-side approval tray with tabbed views for Details, Insights, Budget, and Timeline. The tray shows approvers why the transaction routed to them, where it stands against budget, who else is in the approval chain, and what changed since the last approval cycle. Actions process synchronously with a 1-3 second response time, while follow-up operations run asynchronously.

The ability to skip steps and reassign mid-process optimizes for speed. Contextual trays with budget data and routing rationale optimize for decision quality.

### Pricing Transparency

Charted offers three tiers (Essentials, Core, and Complete) but doesn't publish pricing. All tiers direct prospects to contact sales for a quote. The approval module is bundled with the broader AP suite, so pricing reflects the full platform, not approvals alone.

Greenlight publishes pricing directly: Core at $499/month and Professional at $1,199/month, with Enterprise pricing available on request. All tiers include unlimited approvers, no per-user fees. You're paying for the approval engine specifically, not a bundled AP suite.

Bundled pricing makes it harder to isolate the cost of approval controls versus invoice processing or payment automation. Unbundled pricing lets you compare the approval capability directly.

## Which One Fits

**Charted is a strong fit if:**

- You want approval workflows as part of a full AP automation suite
- Invoice AI, payment processing, and 3-way matching are equally important to your team
- Eliminating NetSuite approver license fees is a key cost driver
- Super approver flexibility to skip steps and reassign mid-process fits your workflow
- You prefer a single vendor covering the full procure-to-pay cycle
- Email-based approvals without NetSuite login are important for your approver base (Greenlight also offers [full-context email approvals](/resources/10-netsuite-email-approvals/) with line items, SoD warnings, and no license required)

**Greenlight Approvals is a better fit if:**

- You need approvers to see live budget impact before making approval decisions
- Transactions change after initial save and routing needs to reflect the current state
- Segregation of duties must be enforced at the point of action, not just tracked after the fact
- Your approval rules vary across many dimensions with specificity-based matching
- Audit prep currently takes days or weeks of manual evidence assembly
- You want transparent, published pricing with unlimited approvers and no per-seat fees
- You're in a SOX, regulatory, or audit-intensive environment where approval controls are scrutinized

## Breadth vs Depth

Charted and Greenlight Approvals come at the approval problem from different directions. Charted starts with AP automation breadth. Approvals are one component of a full procure-to-pay platform that handles everything from invoice capture to payment execution. Greenlight starts with approval depth. Every feature is designed around making the approval decision informed, independent, auditable, and defensible.

Both are NetSuite-native. Both eliminate email chains and manual routing. The right choice depends on whether your biggest need is a unified AP platform or focused approval controls.

If your team needs a single suite covering invoices, payments, matching, and approvals, Charted offers that breadth with a strong NetSuite-native foundation. If your team needs budget-aware routing, system-enforced segregation of duties, dynamic rule re-evaluation, and audit packages that don't require weeks of manual assembly, Greenlight was built for that.

---

**Looking for approval depth, not AP suite breadth?** Greenlight focuses on the approval decision: budget context, SoD enforcement, dynamic re-evaluation, and audit exports that take minutes. [See it in a 30-minute walkthrough →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
