---
title: "Approval Delegation Done Wrong: The Vacation Problem"
description: "Someone goes on vacation. Approvals pile up. And then things start to break in ways that won't surface until your next audit."
pubDate: 2026-02-11
tags: ["approvals", "delegation", "audit"]
featured: false
---

It's a Thursday afternoon. Your VP of Finance is heading to Cabo for 10 days. She's been approving purchase orders, vendor bills, and journal entries all morning, trying to clear the queue before she leaves. She gets through most of them but not all.

By Monday, her approval queue has 15 transactions sitting in it. By Wednesday, the AP team is getting calls from vendors asking why their invoices haven't been paid. Purchasing can't release POs that are stuck waiting for sign-off. People start getting creative.

Someone emails the NetSuite admin: "Can you just push these through? Maria's out until next week."

The admin logs in, changes a few transaction statuses from "Pending Approval" to "Approved," and the logjam clears. Everyone gets back to work. Problem solved.

Except it isn't. It's just been deferred to your next audit.

## How It Usually Plays Out

This scenario — or something close to it — happens in almost every NetSuite environment I've worked in. The details vary, but the pattern is consistent:

An approver is unavailable. Transactions pile up. The business needs to keep moving. Someone finds a workaround. The workaround bypasses the approval control. Nobody thinks of it as a control bypass because they're just trying to keep things running.

The workarounds I've seen most often:

**The admin override.** An administrator manually changes transaction statuses to move them through. Quick and effective. Also creates transactions in the system that were "approved" by someone who isn't an authorized approver, with no documentation of why.

**The shared login.** The absent approver shares their NetSuite credentials with a colleague. "Just log in as me and approve whatever comes in." The audit trail now shows the original approver taking actions they never actually took. And you've just violated every access control policy ever written.

**The rule change.** Someone temporarily modifies the approval workflow to route around the absent person. Maybe they lower a threshold, add an alternate approver, or skip a step entirely. The intent is to revert it when the person returns. Sometimes it gets reverted. Sometimes it doesn't.

**The "just this once" escalation.** A manager approves something outside their normal authority because "it's just this one time and Maria will be back Monday." There's no formal delegation. No documentation. Just a verbal agreement that probably happened over Slack and is already buried under 200 other messages.

Each of these is well-intentioned. Each one creates an audit problem.

## What Auditors See

When auditors test approval controls, they specifically look for anomalies that suggest informal workarounds. They're trained to spot the patterns:

**Approvals by administrator accounts.** If a transaction was approved by a user with an admin role, auditors will ask why an admin was in the approval chain. If there's no documentation, it looks like a bypass.

**Approval clustering.** Twenty transactions approved in rapid succession on a Monday morning, when the normal pattern is 3-4 per day? That looks like someone clearing a backlog, which raises questions about review quality.

**Approver inconsistency.** If your VP normally approves high-value POs, but for two weeks in July someone else did — auditors will ask who authorized that delegation, when it was effective, and whether it was documented.

**Workflow configuration changes.** If approval routing rules were modified and then changed back, that shows up in the system history. Auditors will ask what changed, why, and whether the temporary configuration created any gaps during the period it was active.

The uncomfortable reality is that the workaround someone used to keep the business running during a vacation may look, to an auditor reviewing data six months later, exactly like a control failure.

## What Proper Delegation Looks Like

The solution isn't to stop people from going on vacation. It's to handle their absence in a way that maintains the control while keeping business moving.

Proper approval delegation has a few characteristics:

**It's pre-authorized.** The delegation is set up before the absence, not improvised after the queue backs up. The approver designates a specific backup, and that designation is documented in the system.

**It's time-bound.** The delegation has a start date and an end date. When the approver returns, the delegation expires automatically. No one has to remember to revert it.

**It's scoped appropriately.** The delegate should have appropriate authority for what they're approving. A department manager delegating to a peer manager makes sense. Delegating to an AP clerk does not.

**It's captured in the audit trail.** When the delegate approves a transaction, the audit trail should show that it was a delegated approval — who the original approver was, who the delegate is, and the delegation period. This is critical. Without it, auditors see someone approving transactions outside their normal scope and have to ask questions.

**The original approver can review upon return.** Ideally, the returning approver can quickly see what was approved on their behalf while they were out, giving them an opportunity to flag anything unusual.

## The Frequency Problem

Vacations are the obvious trigger, but delegation isn't just a vacation problem. People are unavailable for all kinds of reasons: conferences, sick days, parental leave, client travel, back-to-back meetings. In a mid-size organization with 4-5 people in the approval chain across different transaction types, someone is out on any given week.

If your approval system doesn't have a formal delegation mechanism, that means your team is improvising a workaround roughly once a week. Fifty-two times a year. Each one is a small audit risk. Over a year, those add up.

And here's the thing that makes this tricky: the workarounds usually *work* from an operational standpoint. Invoices get paid. POs get released. Nobody complains. The system doesn't throw an error. Everything looks fine until someone with fresh eyes and a compliance mandate starts pulling the thread.

## A Simple Test

Here's a quick way to assess where you stand. Ask yourself these questions:

**If your VP went on vacation tomorrow, what would happen to their approval queue?** If the answer involves anyone logging in as them, an admin manually approving transactions, or "we'd figure it out," you have a delegation gap.

**Can you show an auditor every transaction that was approved by a delegate in the last 12 months?** Not just that a delegation happened, but which specific transactions were approved under that delegation, and that the delegation was properly authorized and time-bound.

**Has anyone ever temporarily modified your approval workflow to route around an absent person?** If yes, can you demonstrate that the modification was reverted and that no transactions were improperly approved during the temporary change?

If any of these give you pause, it's worth addressing before your next audit — not because it's a hard problem to solve, but because it's an easy one to ignore until it becomes a finding.

---

*Patrick is the founder of [Greenlight Approvals](https://greenlightapprovals.io/), a NetSuite-native approval workflow platform built for audit readiness.*
