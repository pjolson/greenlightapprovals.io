---
title: "Your Approvers Don't Know Why They're Approving"
description: "Approval routing works on day one. Then the tickets start. Why am I on this? What am I supposed to check? The problem isn't the rules. It's that nobody told the approver."
pubDate: 2026-05-18
tags: ["approvals", "NetSuite", "approval workflow", "change management", "medtech"]
featured: true
---

We spent three weeks building out approval rules for a medical device company running NetSuite. Complex organization. Multiple subsidiaries, regulated procurement, dozens of department and class combinations that each needed different routing. The approval matrix lived in a spreadsheet before we touched it. Translating that into system rules was the kind of project where you block out a room, pull in stakeholders from finance and ops, and work through it line by line.

Department, class, amount threshold, subsidiary. We mapped every combination. Tested it. On day one, the routing worked exactly as designed. Transactions hit the right people in the right order based on the right criteria.

Also on day one, the emails started.

*Why am I an approver on this PO?*

*What am I supposed to be checking here?*

*I got three approvals this morning and I don't know what any of them are for.*

*Is this a budget thing or a compliance thing? Who approved before me?*

Within a week the finance team had a backlog of internal tickets. Not about broken routing. About confused approvers. The rules were right. The approvers just had no idea why the rules applied to them.

## The Part Everyone Skips

This is what almost every approval implementation misses. Teams spend weeks or months defining rules: who approves what, at what thresholds, for which departments. That's the hard analytical work, and it matters. But the output of all that work is invisible to the person who actually has to act on it.

The approver sees a transaction. They see an Approve button. They see their name on a list. What they don't see is *why*.

Why did this route to me and not my colleague? Is it because of the amount? The department? The vendor? Am I here because of my role in the hierarchy, or because someone delegated to me? What happened before my step? Did someone else already review this, or am I first?

Without answers to those questions, approvers do one of two things. They rubber-stamp it because they trust the system put it in front of them for a reason. Or they stall, sending emails and Slack messages trying to figure out what they're supposed to evaluate. Either way, the approval workflow isn't doing what you built it to do.

## Routing and Approval Are Treated as Separate Problems

Most approval systems have a sophisticated routing engine. It evaluates rules, matches criteria, assigns steps. But the approval interface is a transaction record with a button. The approver gets the *what* (here's a PO) but never the *why* (here's why you're reviewing it).

That disconnect gets worse as routing complexity increases. The more dimensions your rules consider, the less obvious it is to an approver why a particular transaction landed on their desk. A hierarchy-based system where your boss approves everything doesn't need explanation. A rules-based system where routing depends on six criteria simultaneously does.

The medtech company had done everything right on the configuration side. Their rules were precise, well-documented, and correctly implemented. But none of that documentation traveled with the approval. The approver saw a PO for $47,000 from a specific vendor. They didn't see that it routed to them because it was a Class III device component purchase in the R&D department exceeding the $25,000 threshold, and that their role as department head made them the required second-level approver after the project lead.

That context existed in the system. It just never reached the approver's screen.

## What Approvers Actually Need

An informed approver needs three things when they're looking at a pending transaction:

**Why this routed to them.** Not the rule ID or a technical reference. A plain explanation of which criteria matched. The transaction is a Purchase Order in the Engineering department, Class III Medical Devices, for $47,000, which exceeds the $25,000 threshold. That's why you're here.

**Where they are in the chain.** Is this the first approval step or the fourth? Did someone already review and approve before them? Is someone waiting after them? Knowing your position in the sequence changes how you evaluate. A final approver scrutinizes differently than a first-pass reviewer.

**What to pay attention to.** Budget utilization for the relevant department and period. Whether the transaction changed since the last approval step. Whether there are segregation of duties considerations. Whether a delegation is in effect. These are the difference between an informed decision and a guess.

## How the Approval Tray Handles This

Greenlight's approval experience is built around a contextual tray, not just a button on a transaction record. When an approver opens a transaction that's pending their action, the tray gives them four views:

**Details** shows the rule that matched, the criteria that triggered routing, the approver's role in the step, and what type of approval is required (individual, any-of-group, all-of-group).

**Insights** shows who else is in the approval chain, what's already happened, what steps remain, and whether anything has changed since the last evaluation. If the transaction was edited after a previous approval step, that gets flagged.

**Budget** pulls real-time budget vs. actual data from NetSuite's native budgets via SuiteQL. Month, quarter, and YTD views with line-by-line breakdowns and color-coded utilization. No separate report. No pinging finance to ask whether this purchase is within budget.

**Timeline** shows the full approval history across all generations. If the transaction was re-evaluated because someone changed the amount or department, the timeline shows the prior approval cycle, why it was superseded, and what changed.

The approver isn't guessing. They're not sending a Slack message to finance. They're not emailing their manager asking why they're on this approval. The answers are already there.

## The Same Problem, Worse, Over Email

The context gap compounds when approvals happen outside NetSuite. Most approval notification emails contain a transaction number, maybe an amount, and a link to log in. Even less context than the approver would have inside the system.

Greenlight's approval emails carry the same context as the tray: transaction header fields, line items, the rule that matched, delegation notices if someone else was the original approver, and [segregation of duties warnings](/resources/11-netsuite-segregation-of-duties/) if the approver has a conflict. The approver can make an informed decision from their inbox without opening NetSuite. (We covered this in detail in our post on [approving transactions from email](/resources/10-netsuite-email-approvals/).)

An approver without context can't do their job. And an approval without informed review is just a timestamp in a log.

## The Rollout Problem

Back to the medtech company. The approval rules were correct. The system worked. But for two weeks after go-live, the finance team was fielding questions from approvers who didn't understand their role in the process. You can't train your way out of that. You can't reasonably expect 40 approvers across multiple departments to memorize a complex routing matrix.

Every organization that implements rules-based approvals hits this wall. The more sophisticated your rules, the more confused your approvers will be on day one. And day 30. And day 90. People change roles, new employees join, thresholds get updated, the approval matrix evolves. The confusion doesn't go away on its own. It gets worse.

The fix is building the explanation into the approval itself. When every approval carries its own context, the approver doesn't need to understand the entire routing matrix. They just need to look at what's in front of them.

## What Auditors See

When approvers don't understand why they're approving, they approve without meaningful review. Auditors have a term for this: [rubber-stamping](/resources/5-red-flags-approval-workflow/). It shows up as suspiciously fast approval times, zero rejections across hundreds of transactions, and approvers who can't explain their review process when asked.

A system that shows approval context to the approver also creates a record that the approver *had* the context. The audit trail shows they were presented with the matching criteria, the budget data, the delegation status, and any exception flags. That's a stronger position in an audit than "we trained them on the policy."

## Routing Is Only Half the Problem

If your team is about to implement approval workflows, or if you've already implemented them and you're fielding the same "why am I on this?" questions, the pattern is predictable. Getting the rules right is necessary. But the rules only work if the people acting on them can see what's going on.

The approval matrix shouldn't live in a spreadsheet that only the admin team understands. It should live on the transaction, in plain language, when the approver needs it.

---

**Your approvers shouldn't need a decoder ring.** Greenlight shows every approver why they're in the chain, what to check, and where the transaction stands against budget. Right on the transaction, right when they need it. [See how it works →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
