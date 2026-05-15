---
title: "Segregation of Duties in NetSuite Approvals"
description: "Most NetSuite teams can't prove segregation of duties is enforced. Here's why that's a problem and what system-level SoD controls should look like."
pubDate: 2026-05-15
tags: ["approvals", "NetSuite", "compliance", "segregation of duties", "audit"]
featured: true
---

Segregation of duties is one of those controls that everyone agrees matters and almost nobody can prove is working.

The concept is simple. The person who creates a transaction shouldn't be the one approving it. The person who approves step one shouldn't also approve step two. These separations exist to prevent fraud, catch errors, and give auditors confidence that no single person can push a transaction through unchecked.

In practice, proving that these separations are actually enforced across every transaction, every approval step, and every edge case is a different problem entirely.

## The Gap Between Policy and Proof

Most organizations have a segregation of duties policy. It lives in a Word document, a wiki page, or a section of the employee handbook. It says things like "the creator of a purchase order cannot also approve it" and "no single individual should control both the initiation and authorization of a financial transaction."

The policy exists. The question auditors ask is whether the system enforces it.

In a lot of NetSuite environments, the answer is: we think so, but we'd have to check. And "checking" means pulling transaction histories, cross-referencing who created each record with who approved it, and manually verifying that no one approved their own work. For a sample of 50 transactions, that might take a few hours. For a full population review, it can take days.

The deeper problem is that even when someone does this analysis and finds no violations, they've only proven that violations didn't happen. They haven't proven that the system would have prevented one. An auditor testing the design of a control, not just the operating effectiveness, will ask: what would happen if the creator tried to approve their own PO right now? If the answer is "the system would let them and we'd catch it in review," that's a detective control, not a preventive one. Auditors value both, but preventive controls carry more weight.

## The Scattered Evidence Problem

In many organizations, the evidence that segregation of duties is being maintained doesn't live in one place.

The transaction lives in NetSuite. The approval might have happened via email. The discussion about who should approve it might be in Slack or Teams. The exception that allowed someone to approve their own work might be documented in a Jira ticket. The policy itself might be in SharePoint. The delegation that rerouted the approval might have been communicated verbally or over text.

When an auditor asks "can you show me that this $40K purchase order was approved by someone independent of the creator," the answer requires stitching together evidence from three or four systems. And if the delegation that rerouted the approval was informal, there may be no evidence at all.

I've seen finance teams spend hours reconstructing the story behind a single transaction during an audit. Multiply that by a sample size of 25 or 50 and you're looking at [weeks of audit prep time](/resources/03-real-cost-audit-prep/) that could have been avoided if the system had captured it in the first place.

## What "Not Enforced" Actually Costs

When auditors find segregation of duties gaps, the remediation isn't just fixing the control. It's proving that the gap didn't result in unauthorized transactions, restating affected periods if necessary, and implementing compensating controls until the primary control is verified as effective.

For SOX-regulated companies, a segregation of duties deficiency can escalate from a control deficiency to a significant deficiency to a material weakness depending on the scope of the gap and the dollar amounts involved. That escalation triggers additional testing, management disclosures, and in some cases restatements.

Even for non-SOX companies, auditors flag SoD gaps as findings that require management response and remediation plans. Those findings carry forward until the control is tested and verified in a subsequent audit. Every finding that carries forward adds scope and cost to the next engagement.

Most of these gaps aren't caused by bad actors. They're caused by [vacation coverage](/resources/04-delegation-vacation-problem/) where someone's backup happens to also be the creator, by small teams where one person wears multiple hats, or by approval routing rules that don't account for the relationship between the creator and the approver. Structural issues, not fraud.

## What System-Level SoD Controls Should Look Like

If segregation of duties enforcement is going to hold up under audit, it needs to be built into the approval system, not layered on top as a manual review.

The system should be able to block a violation before it happens, not just log it after the fact. If the creator of a purchase order is also the assigned approver, the system should either prevent the approval or flag it as an exception with a documented reason. Both are valid depending on the organization's risk tolerance, but the choice should be deliberate and configurable.

Creator self-approval is the obvious case, but duplicate approvals across steps matter just as much. If the same person approves step one and step two of a multi-step workflow, that defeats the purpose of having multiple steps. This includes parallel steps at the same level, where someone might approve two concurrent branches of the same workflow.

Small teams and delegation scenarios create situations where the only available approver is the person the policy says shouldn't approve. The system needs a defined path for this: escalate to a supervisor, allow with a logged exception, or block and notify a compliance contact. What it shouldn't do is quietly allow the approval or freeze the transaction indefinitely with no resolution path.

If the SoD configuration changes midstream, existing transactions should be governed by the policy that was in effect when they were created, not the current policy. Retroactive policy changes can invalidate prior audit evidence, so point-in-time snapshots matter.

And if approvals can happen from the application UI, from email, or in bulk, the SoD check needs to run in all three paths. A control that enforces SoD in the tray but not in email isn't a control. It's a suggestion.

## How Greenlight Handles Segregation of Duties

Greenlight enforces SoD at the point of every approval action, across all approval channels.

Creator self-approval and duplicate approval are configured independently. Each can be set to Disabled, Warn Only (approval proceeds, exception logged), or Enforce (approval blocked). The defaults reflect real-world risk: creator self-approval defaults to Enforce, duplicate approval defaults to Warn Only since backup approver scenarios make duplicate approvals more common and often legitimate.

When Enforce mode blocks someone who turns out to be the only possible approver, the system doesn't deadlock. Three configurable actions handle it: allow the approval with a logged exception, escalate to a supervisor or designated contact, or block and notify a compliance team. The check looks at delegation type, role membership, and group membership before determining if someone is truly the only option.

When an approval instance is created, Greenlight pre-flags potential SoD risks before anyone attempts to approve. If the creator is the direct approver, a member of the approver group, or holds the approver role, those flags surface immediately. You don't wait for someone to click Approve to find out there's a conflict.

This extends to [email approvals](/resources/10-netsuite-email-approvals/) too. If a recipient has a SoD conflict and the mode is set to Enforce, the approve and reject buttons are stripped from the email entirely. In Warn mode, a red warning banner appears before the action buttons. Server-side validation backs this up regardless, so even if someone bypasses the email controls, the approval path rejects the action.

The approval tray, email approvals, and bulk approvals all converge on the same server-side validation. There's no path to approve a transaction that skips the check. Every SoD event, whether it's a block, a warning, an escalation, or a single-approver exception, is captured on the approval instance record with the policy settings that were in effect at the time. One place, one record, queryable and exportable.

## The Question to Ask

If an auditor pulled a random transaction tomorrow and asked "was the approver independent of the creator, and can you prove it," how long would it take you to answer?

If it takes more than a few seconds, the control might exist as a policy but not as a system. And in an audit, the distinction between "we have a policy" and "the system enforces the policy and we can prove it" is the difference between a clean report and a finding.

---

*Patrick is the founder of [Greenlight Approvals](/#contact), a NetSuite-native approval workflow platform built for audit readiness. Questions? [LinkedIn](https://www.linkedin.com/in/patrick-olson-pmp/).*
