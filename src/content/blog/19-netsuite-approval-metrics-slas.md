---
title: "Approval Metrics and SLAs: What to Measure in Your NetSuite Approval Process"
description: "You can't shorten an approval cycle you don't measure. Here are the metrics worth tracking, how to set SLAs that hold up, and why native NetSuite won't report any of it for you."
pubDate: 2026-06-15
tags: ["NetSuite", "approval workflows", "metrics", "SLA", "controller", "finance operations", "accounts payable"]
featured: true
---

A board member asks the CFO a simple question during the quarterly review: how long does it take us to approve a purchase order? The CFO looks at the controller. The controller knows the real answer is "it depends," but that isn't going to land in a board meeting. So someone promises to pull the numbers and follow up.

Then they go looking, and the numbers aren't there. NetSuite can show every transaction that's currently pending approval. What it can't show is how long each one has been waiting, how long the last hundred took to clear, or which approver is the reason the average looks the way it does. The status is visible. The clock isn't.

This is the gap most finance teams live with. They manage an approval process they can't actually see, and they only find out something is slow when a vendor calls or the close slips. Measuring it changes that, but only if you measure the right things.

## The Metrics Worth Tracking

There are a dozen things you could count. A handful are worth reporting.

**Approval cycle time.** The clock from submission to final approval. This is the headline number, the one the board member was asking for. Track it as a median rather than an average, because a few transactions stuck for three weeks will drag a mean into uselessness while the typical experience stays fine. Segment it by transaction type. A vendor bill and a capital purchase order have no business sharing a benchmark.

**Wait time versus touch time.** Cycle time hides where the delay lives. Touch time is the few minutes an approver spends actually reading and deciding. Wait time is everything else, the hours or days a request sits in a queue while nothing happens. On most teams the wait dwarfs the touch by an order of magnitude. The distinction matters because it points at different fixes. If touch time is high, your approvers don't have enough context to decide quickly. If wait time is high, the problem is that nobody knew the request was waiting. We've made the case before that [moving faster is the wrong goal](/resources/02-faster-approvals-wrong-goal/) when speed comes at the cost of judgment, and this is the metric that keeps you honest about which kind of delay you're actually cutting.

**First-pass yield.** The percentage of transactions that clear the chain without being rejected and resubmitted. Every bounce restarts the clock and adds a full cycle. A low first-pass yield usually traces back to a single cause, which is that [approvers don't have enough information to say yes the first time](/resources/12-approvers-dont-know-why/), so they reject to be safe. If you can't track rejections directly, count revisions per transaction as a proxy. Ardent Partners' 2024 AP Metrics that Matter report put the average invoice exception rate at roughly one in five, with top performers closer to one in nine, so there's real room between typical and good.

**Queue aging.** Not the average, the oldest. A report that lists pending items by how long they've sat, oldest first, surfaces the request that's about to become a problem before the vendor escalates it. Average cycle time tells you how the process performs. Aging tells you where it's failing right now.

**Bottleneck by approver.** Where does the time concentrate? In a lot of organizations almost everything routes through one or two people, often a founder or the CFO, and that worked fine until volume grew. ApprovalMax calls it the keyholder pattern, and the symptom is that one approver consistently takes days while everyone else takes hours, and nobody notices until someone asks why procurement feels slow. You can only see this if you measure cycle time per approver, not just per transaction.

**Approvals completed after the period cutoff.** The count of transactions that cleared approval in the new period but belonged to the old one. This is the metric that ties the approval queue to the close, and it's the one finance feels most directly, because every late approval is either an accrual to book and reverse or a liability left off the books. We've written about [what those bottlenecks cost the quarter-end close](/resources/16-approval-bottlenecks-quarter-end-close/), and tracking the count over time tells you whether the problem is getting better or just getting normalized.

## Setting SLAs That Hold Up

A metric tells you what happened. An SLA tells people what's expected. The two work together, and an SLA without a metric behind it is just a sentence in a policy document nobody enforces.

Good approval SLAs are tiered. A $200 supply reorder and a $40,000 equipment purchase should not carry the same target, because the risk and the scrutiny they deserve are different. Tier by transaction type, by dollar amount, and by risk. A routine reorder under a low threshold might be expected same or next business day. A high-value purchase that needs a VP might reasonably take longer, because you want that person to actually look.

Name the approver, not the role in the abstract. An SLA that says "management approval within two days" fails the moment you ask who management is for this transaction in this subsidiary. The target has to resolve to a person, or it can't be breached, escalated, or measured.

Define the clock in business days, not calendar days. A request submitted at 4 p.m. on a Friday hasn't breached anything by Monday morning, and an SLA that says otherwise just trains people to ignore it.

Set the escalation rule before you need it. The point of an SLA isn't to generate a report of who missed it. It's to trigger an action when the clock runs out, so the request moves to someone who can act instead of sitting. This is the same gap that shows up when [an approver goes on vacation and nobody reassigned their queue](/resources/04-delegation-vacation-problem/). Without a defined escalation path, the SLA breach is just a number you find out about later.

Be careful where you set the threshold. Too tight and everything escalates, the alerts become noise, and people tune them out. Too loose and nothing ever does, which means the SLA isn't doing any work. The right threshold is the one that fires often enough to matter and rarely enough to mean something.

As for what good looks like, treat external benchmarks as directional rather than gospel. APQC and Ardent Partners data put typical end-to-end invoice cycle times in the range of ten to twenty days, with top performers landing closer to three. Hackett Group reports that the procurement organizations it classifies as digital world class run requisition-to-PO cycles well more than half shorter than their peers. Those figures measure the full lifecycle, not just the approval step, and they come from studies with their own definitions, so don't anchor your SLA to someone else's number. Measure your own baseline first, then set a target that beats it.

## Why This Is Hard in Native NetSuite

Here's the part that catches teams off guard. None of these metrics fall out of NetSuite on their own.

SuiteApprovals and SuiteFlow are built to route a transaction and record its current status. They are not built to report on how that status got there over time. When a purchase order moves from Pending Approval to approved, NetSuite knows it happened, but the timestamp of that transition isn't sitting in a native field you can drop into a saved search. It lives in the system notes, the audit log of field changes, and pulling cycle time out means building a transaction search that filters against those notes and reconstructs the timeline from the old and new status values.

That works for a one-off. As a standing report it's fragile and slow, and it gives you elapsed time on a single transaction rather than a trend you can manage. There's no native SLA field, no escalation-on-breach, no first-pass-yield report, and no cycle-time dashboard. The platform tracks the state of each approval without tracking the performance of the process. These are the kinds of gaps that don't show up in a demo and surface six months later when someone asks for the numbers, and they're part of the broader set of [limitations in the native approval tooling](/resources/07-suiteapprovals-vs-greenlight/).

## The Metrics That Mislead

Measuring the wrong thing is worse than measuring nothing, because it gives you false confidence.

Average cycle time is the usual culprit. It looks precise and it hides everything that matters. A team can post a healthy average while a quarter of its transactions blow past any reasonable SLA, because the fast ones paper over the slow ones. Report the median and the tail, not the mean.

Watch for metrics people can game. If you reward approvers purely on speed, you get fast approvals and weaker review, which is exactly the outcome a control is supposed to prevent. The number goes green and the risk goes up. Pair any speed metric with first-pass yield and exception counts so that rushing shows up somewhere.

And be skeptical of volume metrics dressed up as performance. Approvals processed per day tells you how busy people are, not whether the process is working. The metrics that matter are the ones tied to an outcome a controller actually owns: cycle time against an SLA, transactions cleared before the cutoff, exceptions that needed a human to intervene.

## Where Greenlight Helps

A workflow tool can't make the metrics matter, but it can make them exist without a forensic exercise against system notes every month.

Greenlight timestamps each step of every approval as it happens, so cycle time, wait time, and time per approver are records the system already holds rather than numbers you reconstruct after the fact. The approval instance carries its own performance data, which means the report is a query, not an archaeology project.

Escalation is built in. When a step sits past its threshold, Greenlight can move it along instead of waiting for someone to notice, and time-bound delegations cover the absences that otherwise strand a queue. Exception detection flags the transactions that are aging or off the normal path, including the predictive ones that are heading for trouble before they breach, so the oldest item in the queue finds you rather than the other way around.

Because every decision lands in an immutable log with the routing rule that fired and the context the approver saw, the same data that answers the board member's question also holds up when the auditor asks a harder one. The measurement you build to run the process is the measurement that proves it ran.

---

**You can't shorten an approval cycle you've never measured.** Greenlight records every approval step with timestamps, escalates the ones that stall, and surfaces cycle time, bottlenecks, and exceptions without a saved search against system notes. [See the metrics in a 30-minute walkthrough →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
