---
title: "NetSuite Expense Report Approvals: The Control Everyone Rubber-Stamps"
description: "Expense reports are low-dollar, high-volume, and the most policy-violated transaction in most companies. Here's why native NetSuite expense approvals route to a single supervisor who clears everything, where corporate cards and travel tools slip past, and what real T&E control looks like."
pubDate: 2026-07-21
tags: ["NetSuite", "expense reports", "T&E", "approval workflows", "policy enforcement", "audit"]
featured: false
---

It's 4:40 on a Friday and a department head has fourteen expense reports waiting in NetSuite. She clicks into the first one, sees a number that looks about right, and approves it. Then she does the same thing thirteen more times. The whole queue is clear in under four minutes.

Buried in report number nine is a $580 dinner for two, a seat upgrade to business class, and a hotel two nights longer than the conference it was booked for. None of it was against policy that anyone spelled out to her, none of it got a second look, and all of it got reimbursed the following week.

Expense reports rarely get the attention that a purchase order or a vendor bill does, because each one is small. The problem is that they are also the transaction employees touch most, the one with the loosest policy enforcement, and the category auditors and fraud examiners reach for first.

## Why Small Dollars Get a Free Pass

A single expense report almost never crosses the threshold that triggers real scrutiny. Nobody escalates a $200 reimbursement. That is exactly what makes the category risky.

The dollars are small per report but large in aggregate, the volume is high enough that reviewers stop reading, and the rules are fuzzy enough that "reasonable" does a lot of work. Travel and entertainment is where personal spend gets mixed with business spend, where policy lives in a PDF nobody opens, and where the person approving is usually the submitter's direct manager, someone with every incentive to keep the relationship smooth and none to interrogate a dinner receipt.

So the control that exists on paper, supervisor approval, quietly becomes a formality. The approval happens. The review does not.

## Where Native NetSuite Expense Approvals Fall Short

NetSuite routes expense reports for approval, either through the employee's supervisor on the employee record or through the approval routing preference and SuiteApprovals. For the basic path, submit, route to supervisor, approve, it works. The trouble is that T&E is mostly edges, and the edges are where the money leaks.

**Routing follows the org chart, not the spend.** The default is the supervisor field on the employee record. That sends every report from a given employee to the same person regardless of what is on it. A $90 report and a $9,000 report take the identical path, and a report loaded with travel that should reach a controller stops at whoever happens to be the direct manager.

**Approval is one level deep.** A report that clearly warrants a second signature, high total, international travel, an unusual category, has nowhere higher to go under standard supervisor routing. There is no clean way to say "under $500 the manager is enough, over $2,000 it also needs the department controller." Tiered review is the thing expense approval most needs and the thing native routing handles worst.

**Policy is advisory, not enforced.** NetSuite has expense categories and can carry per-line limits, but a limit an employee can exceed and still submit, and a manager can still approve, is a suggestion. Out-of-policy lines, a meal over the cap, alcohol, a personal charge, a missing receipt, do not reliably hold the report or route it to someone who has to sign off on the exception specifically.

**Card feeds and travel tools land outside the control.** Most mid-market companies now run T&E through Concur, Expensify, Ramp, Brex, or a corporate card feed. When those tools push expense data into NetSuite, or when a report is created by integration or CSV, the approval that mattered either happened in the other system or did not happen at all. SuiteApprovals does not route transactions created by CSV import, SuiteScript, or web services, so the highest-volume expense data, the automated kind, is the least likely to hit a NetSuite approval step.

**Billable expenses need a different eye.** An expense marked billable to a customer or project gets re-invoiced downstream. Approving it is not only a spend decision, it is a decision about what the client sees. Standard supervisor routing treats a billable travel line the same as an internal one, and the person who understands the client relationship never enters the loop.

**No delegation when the approver travels.** Managers travel too. A report sitting in Pending Approval while the only approver is on the road delays a reimbursement, frustrates the employee, and tempts someone to hand out their login. We covered [the delegation gap on its own](/resources/04-delegation-vacation-problem/), and on expense reports it shows up constantly, because the people approving travel are frequently the ones traveling.

## What Weak T&E Control Costs

The cost is rarely one big number. It accumulates.

Policy leakage is the steady drain: over-limit meals, unnecessary upgrades, the occasional personal charge that rides through because reviewing every line is nobody's actual job. It is small each time and continuous.

Then there is fraud, which lives in this category for a reason. Duplicate submissions, inflated mileage, receipts that do not match the charge. When the only gate is a manager clearing a Friday queue, these get through, and T&E is consistently one of the more common places internal fraud is found.

At audit, expense reports are a favorite sample precisely because the controls are usually thin. When the reviewer pulls twenty reports and asks who approved a given line and against what policy, "the supervisor approved the whole report" is a weak answer, and it turns a quick sample into a [longer, more expensive review](/resources/03-real-cost-audit-prep/). The rubber stamp that felt efficient on Friday is the thing that costs days in audit season.

There is a quieter cost too. When [approvers don't actually know why a report reached them](/resources/12-approvers-dont-know-why/) or what they are supposed to be checking, approval degrades into a reflex, and a reflex catches nothing.

## What Expense Approval Should Actually Do

A T&E workflow that holds up under real volume behaves differently from a single supervisor step.

- Route on what is in the report, not just who submitted it. Total, category, billable flag, department, and travel type should all be able to change where a report goes.
- Support real tiers, so a small report clears at the manager and a large or unusual one picks up a controller or department head without a manual workaround.
- Treat out-of-policy lines as routed exceptions that hold the report until the right person signs off, rather than soft flags a busy manager clicks past.
- Approve every report regardless of how it entered NetSuite, including the ones a card feed or travel integration created, since those are the ones native routing is most likely to skip.
- Keep one immutable record per report of who approved it, under which rule, and when, so the answer at audit is a report you pull, not a story you reconstruct.

## How Greenlight Handles It

Greenlight evaluates approval rules through a User Event script on the transaction, so it fires on expense reports no matter how they were created. A report pushed in from a travel tool or a card feed is evaluated the same as one an employee keyed by hand, which closes the gap where integration-fed expenses slip past approval entirely.

Because a rule matches on ten segments and five configurable criteria, routing is not stuck on the org chart. A rule can send a routine report to the direct manager, escalate a high total or an international trip to a controller, and single out billable travel for the person who owns the client relationship. Steps run in sequence and resolve each approver from the report's context, so a two-level review is a rule setting, not a workaround.

Budget enforcement reads the account and subsidiary on the report, so a manager sees T&E against the [department's travel budget before it posts](/resources/15-netsuite-budget-enforcement-approvals/) instead of finding the overage at close. Segregation-of-duties enforcement covers the case where the submitter and an approver are the same person, a common one when a manager files their own travel, with a setting to warn, block, or notify. And every approval lands in an immutable log with the matching rule and each step recorded, so when an auditor pulls a sample of reports, the full approval history comes back in one search.

---

**Expense reports are the transaction your people touch most and your controls watch least, which is exactly why they deserve better than a supervisor clearing a Friday queue.** Greenlight routes T&E on what is actually in the report, enforces tiers and policy exceptions, catches the integration-fed reports native approvals skip, and logs every decision in one auditable record. [See expense approval routing in a 30-minute walkthrough →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
