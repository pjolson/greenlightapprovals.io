---
title: "The Controller's Guide to Audit-Ready NetSuite Approvals"
description: "Controllers own audit readiness but rarely own the approval system. A practical framework for evaluating your NetSuite approval controls before your auditors do."
pubDate: 2026-06-05
tags: ["controller", "audit readiness", "compliance", "NetSuite", "approvals", "SOX", "internal controls"]
featured: false
---

You're sitting across from your external auditor at the start of fieldwork. The PBC list arrives. Half the items on it are approval-related: approval trails for sampled transactions, documentation of routing logic, evidence that segregation of duties held during the period, exception logs for any overrides or delegations. You know the work got done. The question is whether the answers you produce will close the item or generate follow-up requests that stretch fieldwork by a week.

Controllers own audit readiness, but they rarely own the approval system. That gap is where findings come from.

## What Auditors Are Actually Testing

Every approval control gets evaluated on two dimensions: design effectiveness and operating effectiveness.

Design effectiveness asks whether the control, as designed, would prevent or detect the problem it's supposed to address. Does your approval routing actually require a second person to sign off on transactions above the threshold? Does the system enforce segregation of duties, or does the policy just say it should? If the design has a gap, the control fails before anyone ever uses it.

Operating effectiveness asks whether the control worked consistently over the entire audit period. It passed on January 3rd. Did it also pass on September 17th? And can you prove it? This is where evidence quality matters. An approval trail that shows who approved, when, and what they saw at the time is operating evidence. A workflow that routes correctly but leaves no record is a design that can't be tested.

The topics covered in common NetSuite approval discussions map directly to this framework. The [cost of assembling audit evidence manually](/resources/03-real-cost-audit-prep/) is an operating effectiveness problem. The [red flags auditors look for in approval workflows](/resources/5-red-flags-approval-workflow/) are design gaps. [Segregation of duties](/resources/11-netsuite-segregation-of-duties/) straddles both: the policy is a design question, but whether it held for every transaction during the period is an operating question.

Why does the distinction matter? Because it determines finding severity. A design deficiency means the control never could have worked. An operating deficiency means it should have worked but didn't. Design failures are harder to remediate and more likely to escalate.

## The Four Questions You'll Get Asked

Auditors don't test in the abstract. They ask specific questions, pull specific samples, and follow the evidence wherever it leads. Four questions come up in almost every engagement that touches approval controls.

**"Show me the approval trail for these 30 transactions."** The auditor pulls a sample and asks for the complete approval history: who approved, when, what routing rule triggered the approval, and what the transaction looked like at the time of sign-off. A complete answer includes all of that in a format the auditor can tie back to the general ledger. What most teams produce instead is a combination of saved searches, email threads, and verbal explanations that take hours to assemble and still leave gaps. The [real cost of that assembly process](/resources/03-real-cost-audit-prep/) goes well beyond the time spent. It signals to the auditor that the control environment is fragile, which invites deeper testing.

**"How do you know your approval rules match your policy?"** Your approval policy says transactions over $10,000 require VP sign-off. Your NetSuite workflow routes to the department manager regardless of amount. That gap is a deficiency. The auditor wants to see a reconciliation between written policy and system configuration, ideally with a date showing when it was last verified. Most companies don't have this document. They assume the system matches the policy because someone set it up that way two years ago. This is one of the [clearest red flags auditors look for](/resources/5-red-flags-approval-workflow/): policy that says one thing and a system that does another, with no one tracking the drift.

**"What happens when the normal approver isn't available?"** Vacation, leave, turnover. The auditor wants to know how the [delegation process works](/resources/04-delegation-vacation-problem/) and whether delegated approvals respected the same controls as standard ones. The controller's responsibility here is to produce a delegation log: who delegated to whom, for what period, and whether any delegated approval created a segregation of duties conflict. If your delegation process is informal (someone forwards an email, a manager just handles it), that's an undocumented control change, and the auditor will treat it as one.

**"Can the person who creates a transaction also approve it?"** This is the [segregation of duties question](/resources/11-netsuite-segregation-of-duties/), and it's where deficiency classification matters most from the controller's perspective. If the answer is "our policy prohibits it," the auditor's next question is "show me the system enforcement." Policy without enforcement is a design deficiency. If the system does enforce it but someone bypassed the control during the period, that's an operating deficiency. The distinction matters because a design deficiency in SoD is harder to downgrade. It suggests the control environment never addressed the risk, rather than that a working control had a one-time failure.

## The Self-Assessment Most Controllers Skip

Before your auditor arrives, you can test your own controls with the same questions they'll ask. Most controllers don't do this because it takes time they don't have during close, and the answers require pulling data from a system they don't directly manage. But the exercise takes less time than the fieldwork extension you'll face if the answers aren't ready.

Work through these three categories. Each item is a yes or no. A "no" doesn't necessarily mean you have a finding, but it means you have a gap you should understand before your auditor finds it.

**Evidence readiness**

- Can you export a complete approval trail for any transaction in under 10 minutes? If it takes longer, your operating effectiveness evidence depends on manual assembly, which introduces error and delay.
- Does the trail include the routing trigger (which rule fired and why)? Without it, the auditor can't verify that the right person approved for the right reason.
- Does the trail capture the point-in-time transaction state at each approval step? If a transaction was edited after approval, the auditor needs to see what the approver actually signed off on. This is the core issue behind [approval re-evaluation](/resources/01-approval-re-evaluation/): whether post-approval changes invalidate the original sign-off.

**Control design**

- Do your system routing rules match your written approval policy? When was the last time someone verified the match?
- Do post-approval edits to amount, vendor, or GL coding trigger a re-approval? If they don't, a transaction can change materially after sign-off with no control coverage.
- Are approval thresholds set by role, not by individual? Role-based rules survive turnover. Individual-based rules go stale.

**Enforcement**

- Is segregation of duties enforced at the system level, or only by policy? Policy-only SoD means every transaction is a potential exception.
- Does enforcement extend to email approvals and bulk approvals? If someone can approve 40 transactions in a batch without individual review, the control didn't operate on those transactions.
- Do delegated approvals go through the same SoD checks as standard ones? A delegation that creates a creator-approver conflict negates the control for every transaction approved during the delegation window.

## What a Finding Costs Beyond the Remediation

The direct cost of remediating a control deficiency is real but contained: update the workflow, document the change, test it. The indirect costs are what compound.

A finding in the current period expands testing scope in the next. The auditor will sample more transactions, test the control more frequently, and spend more time on the area. That means longer fieldwork and higher fees, even after you've fixed the underlying issue.

You'll write a management response explaining the root cause, the remediation plan, and the timeline. If the same area had a finding in a prior period, the response needs to address why the earlier remediation didn't hold. Carry-forward findings erode credibility with the audit committee and make it harder to negotiate scope reductions in future years.

For SOX-reporting companies, the stakes escalate. A significant deficiency in approval controls can be aggregated with other control weaknesses and classified as a material weakness, which requires disclosure. Even short of that, a significant deficiency triggers additional management testing and auditor scrutiny that can consume weeks of the team's time.

For non-SOX companies, the cost is less visible but still real: higher audit fees, longer fieldwork, less leverage when you push back on scope expansion. Each finding is a data point the engagement partner uses when planning next year's audit. When [the approval chain breaks](/resources/06-breaking-the-approval-chain-blog/), the consequences extend well past the quarter in which it happened.

## Building the Approval Control Package

The most effective thing a controller can do is assemble the approval evidence package before the PBC list arrives. Don't wait for the auditor to ask. Build it during close, when the data is fresh and the team is already in the system.

The package has four components.

**Approval policy document with version history and system reconciliation.** This is the written policy, plus a mapping that shows how each policy requirement is implemented in the system, plus the date each mapping was last verified. If the policy says VP approval above $25,000, the mapping shows which NetSuite workflow rule enforces that threshold and confirms it's currently active. Version history matters because the auditor needs to know what the policy was during the period under review, not just what it is today.

**Approval trail export covering the audit period.** Every transaction that went through the approval workflow, with the full chain: who approved, when, what rule triggered the routing, and what the transaction looked like at each approval point. This should be exportable in a single step, not assembled from multiple saved searches.

**Exception log.** Every deviation from normal routing during the period: delegations (who, to whom, dates, and whether SoD held), overrides, segregation of duties warnings, and chain breaks with documented reasons. Auditors expect exceptions. What they don't expect is exceptions with no record of who authorized them or why.

**Control change log.** Any modification to approval rules, thresholds, routing logic, or role assignments during the audit period. If you changed a threshold from $5,000 to $10,000 in March, the auditor needs to see when, who authorized it, and whether transactions between the old and new threshold were tested.

Greenlight produces all four components natively. The approval trail is immutable and includes point-in-time transaction state at each step. The exception log captures delegations, SoD conflicts, and chain breaks with reasons. Rule changes are versioned. The full package exports in one step. But regardless of what tool you use, these are the four things your auditor needs, and the controller who has them ready before fieldwork starts is the one whose audit goes according to plan.

Audit readiness isn't something you prepare for in the two weeks before fieldwork. It's a property of how your approval controls are designed, enforced, and documented every day of the period. The controller who treats audit evidence as a byproduct of well-designed controls, rather than a deliverable assembled after the fact, doesn't scramble when the PBC list lands. The package is already there.

---

**Your auditor's PBC list shouldn't be the first time you test your approval controls.** Greenlight captures a complete approval trail, enforces segregation of duties at the system level, and exports the full evidence package in one click. [See the audit export in a 30-minute walkthrough →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
