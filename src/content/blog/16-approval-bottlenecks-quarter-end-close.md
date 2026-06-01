---
title: "What Approval Bottlenecks Cost Your NetSuite Quarter-End Close"
description: "Approval delays push journal entries, accruals, and reconciliations past the NetSuite close deadline, and turn last-week transactions into audit gaps. Here's where the time goes."
pubDate: 2026-06-01
tags: ["NetSuite", "quarter-end close", "approval workflows", "CFO", "audit readiness", "finance operations"]
featured: true
---

Every quarter, the same thing happens. Finance sends the close calendar out two weeks ahead. The deadlines are clear and the cut-off dates are set. Then, somewhere around day three, the CFO asks the same question: what's still stuck in approvals?

It's always a handful of things. A few POs that never got signed off, a vendor invoice that's been sitting with a department head since last Tuesday, an expense report that was rejected, resubmitted, and is now waiting on someone in another time zone. On their own, none of these is a big deal. Together they push the close back by days.

## How Close Teams Work Around Stuck Approvals

Everything is supposed to be approved before the period closes. When it isn't, the close team improvises.

They accrue for whatever is stuck in pending approval, estimating the amount off the PO or the invoice scan, and reverse it the next period. Reminder emails go out to approvers who haven't acted. When those go unanswered, someone escalates to a manager. And the whole time, the team keeps a manual tally of what cleared and what's still in limbo.

This is what an approval process looks like when it has no awareness of the financial calendar. The workflow doesn't know that a PO submitted on March 28th has to clear before March 31st or it turns into an accrual. In NetSuite, native approval routing has no concept of the period at all. It routes to the next person in the chain and waits.

## Where the Days Go

The hold-up is usually spread across dozens of small transactions, all stuck for the same few reasons.

**Late submissions.** Requesters enter POs and expense reports in the last week of the quarter, either because they sat on them or because the need just came up. The approval clock starts with three days left in the period.

**Sequential routing on complex transactions.** A PO that needs sign-off from a department head, then procurement, then finance has three handoffs. If each person takes a day, that's three business days. Submit it on the Wednesday before quarter-end and it won't clear until the following Monday, which is next quarter.

**Missing approvers.** Someone is on PTO. Someone changed roles and the employee record still points to them. The workflow notifies a person who will never act, and nobody catches it until the close team goes looking. We've written about this [delegation gap before](/resources/04-delegation-vacation-problem/), and it lands hardest at period-end.

**Rejections without context.** A transaction gets rejected, but the [approver doesn't say why](/resources/12-approvers-dont-know-why/). The requester guesses, makes a change, resubmits, and it gets rejected again. Each round burns a day. Two rejection cycles on a transaction submitted in the final week, and it won't close in the current period.

**No visibility into the queue.** The close team has no running view of what's pending. To find out, someone runs saved searches, cross-references aging, and sends out batched reminders. That's a manual process layered on top of what should be a workflow.

## The Accrual Tax

Every transaction stuck in approval at period-end carries a downstream cost.

If you accrue for it, that's a journal entry to create, review, approve (yes, another approval), and reverse next period. Multiply by 20 or 30 transactions and the close team spends hours on entries that exist only because approvals didn't finish on time.

If you don't accrue, you're understating liabilities. The expense is real. The goods were ordered or the service was delivered. The only reason it's off the books is that a workflow is still waiting for someone to click a button. For companies where materiality thresholds matter, this is how you end up with audit adjustments that shouldn't have happened.

Either way, it's work. Accruals mean more journal entries, more review, and messy period-over-period comparisons when the reversal hits. Skipping them means risk, and the [audit-trail gaps](/resources/03-real-cost-audit-prep/) pile up in exactly the areas auditors like to sample.

## The Compounding Problem

The cost carries into the next quarter, too. Whatever misses the cut-off gets approved in week one of the new period, and now last quarter's expenses are posting in the current one. The accrual reversal nets it out, but the timing mismatch makes variance analysis harder. Department heads see actuals that don't match what they spent. FP&A spends time explaining why March expenses are showing up in April.

This is the part that never appears in a time study. Nobody tracks the hours spent explaining timing differences in budget reviews, or the back-and-forth when a department head questions why Q2 actuals are inflated by Q1 carryover. But it happens every quarter in companies where approval timing isn't managed.

## Where a Workflow Tool Helps

No tool makes a person click faster. What a workflow can do is take out the friction that turns a one-day approval into a five-day one, hold the routing correct when a transaction changes late in the period, and keep the late ones defensible when they finally clear. That plays out in a few specific places at quarter-end.

**Approvals that don't require a NetSuite login.** A lot of period-end delay is nothing more than login friction. The approver sees the notification, means to deal with it, and doesn't open NetSuite until two days later. Greenlight sends a secure email approval they can approve or reject straight from their inbox, so the decision happens when they read it rather than the next time they happen to log in.

**The full picture in front of the approver.** Most rejection cycles trace back to an approver who didn't have enough context and bounced the transaction to be safe. Greenlight shows the line detail, the budget impact, and the prior approval history in a single view. When the approver has what they need the first time, you get fewer of the reject-revise-resubmit loops that eat days in the final week.

**Routing that updates when the transaction does.** A PO gets edited in the final week. A department changes. An amount gets revised. Native NetSuite routing locks to wherever it first sent the record, which is how a transaction ends up on the wrong approver or skips one it needed. Greenlight re-checks the routing rules on every save, so a last-minute edit doesn't quietly strand the approval with the wrong person.

**A record that holds up when things clear late.** The transactions that squeak through in the last hours of the period are the ones auditors pull first. Greenlight keeps an immutable trail of what each approver saw and when they signed off, and it exports the supporting package in one step. So the late approvals aren't the ones that turn into an audit finding.

## The Numbers

A mid-market finance team running a five-day close with 20 to 30 transactions stuck in approval at quarter-end can spend 15 to 25 hours on approval-related close work: chasing approvers, creating accruals, reversing them, and reconciling timing differences. That's across the close team, not one person. At four quarters a year, it adds up to somewhere between 60 and 100 hours spent on work that exists only because approvals didn't finish before the period closed. For a team pushing toward a three-day close, that's often the gap between hitting the number and missing it. The exact figures will vary by company; treat the ranges as a rough model, not a benchmark.

The harder cost to measure is the decisions made on incomplete data. When the Q1 close slips because approvals are still clearing, the board deck runs on preliminary numbers, variance analysis is half-done, and forecast updates wait. The approval queue ends up gating everything that depends on a finished close.

---

**Your close timeline shouldn't come down to who logs into NetSuite first.** Greenlight is a NetSuite-native approval application that keeps routing correct when transactions change, lets approvers sign off from email with full context, and records an immutable trail of every decision, so even the approvals that land at the last minute hold up under audit. [See how it works in a 30-minute walkthrough →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
