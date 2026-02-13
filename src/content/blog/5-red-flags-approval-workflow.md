---
title: "5 Approval Workflow Red Flags Your Auditor Will Find Before You Do"
description: "Most finance teams don't discover approval gaps on their own. Here's what to look for before your next audit does it for you."
pubDate: 2026-02-12
tags: ["compliance", "audit", "approvals", "NetSuite"]
featured: true
---

Nobody wakes up in the morning excited about approval workflows. They're the kind of thing that fades into the background when everything is working — approvals are routing, people are clicking approve, transactions are posting. Life is good.

Then an audit happens.

Over 8+ years of NetSuite consulting, I've seen the same handful of issues surface during audits again and again. They're rarely dramatic. Nobody committed fraud. Nobody bypassed the system on purpose. They're quiet, structural gaps that accumulate over months or years while everyone assumes the process is working fine.

Here are the five most common ones — and what to do about each.

## 1. Transactions That Changed After Approval

This is the one that catches the most finance teams off guard.

A purchase order gets submitted for $8,000. The department manager approves it. Then before it's fully posted, someone adds a line item and the total jumps to $14,000 — past the threshold that should have required VP approval. But the VP never sees it. The approval was already done.

From the inside, nothing looks wrong. The transaction was approved. It posted. Everyone moved on. But when auditors compare the approved amount against the final posted amount and check it against your approval thresholds, the gap becomes obvious.

This happens more often than you'd think. In one environment I worked in, over 150 purchase orders had this exact issue across a six-month period.

**What to check:** Compare a sample of posted transactions against your approval thresholds. Look specifically at ones where the final amount is higher than the amount at the time of approval. If you find any where the increased amount should have triggered a higher-level approver, you've found the gap.

## 2. The "One Approver Does Everything" Pattern

Pull a report of who's approving what in your environment. In a surprising number of organizations, one or two people approve the vast majority of transactions — sometimes 70-80% of total volume.

This isn't necessarily wrong, but auditors see it as a concentration risk. If one person is approving hundreds of transactions a month, how thoroughly are they actually reviewing each one? And if that person is also involved in creating or modifying some of those transactions, you may have a segregation of duties issue.

The pattern usually develops gradually. Someone is reliable and responsive, so more approvals get routed to them. Or a manager leaves and their approvals get temporarily redirected to a colleague, and "temporary" becomes permanent. Nobody notices because the approvals are getting done.

**What to check:** Look at your approval data for the last quarter. Who are your top 5 approvers by volume? By dollar amount? Is anyone approving transactions they also created or submitted? If one person accounts for more than 50% of approvals in a transaction type, that's worth investigating.

## 3. No Record of What Was Actually Reviewed

Here's a question auditors love to ask: "When your VP approved this $50,000 vendor bill, what exactly did they see?"

In many NetSuite environments, the approval record is just a status change and a timestamp. It proves someone clicked a button. It doesn't prove what information was in front of them when they clicked it. If the transaction was edited after their approval — even a small change like a description update — the approval record now points to a version of the transaction that's different from what was reviewed.

This matters because the entire point of an approval control is that a qualified person reviewed the details and authorized the transaction. If you can't demonstrate what they reviewed, the control is weakened in the auditor's eyes.

**What to check:** Take a few recently approved transactions and look at the system notes. Can you reconstruct what the transaction looked like at the moment of approval? Or can you only see what it looks like now? If there's no snapshot or versioning, edits after approval can silently compromise your audit trail.

## 4. Approval Rules That Only Exist in Someone's Head

I once asked a Controller to show me their company's approval policy. She pulled up a Word document from 2019. Then I asked her to show me how those rules were configured in NetSuite. The two didn't match.

The Word document said POs over $25,000 required CFO approval. The system threshold was set at $50,000. Nobody could tell me when it changed or why.

This is more common than it should be. Approval policies get written during implementation, then the system gets tweaked over time — a threshold changes, a new approver is added, a department gets restructured. The policy document never gets updated. Or worse, the rules are embedded in SuiteScript or workflow configurations that only a developer can read, so nobody on the finance team can verify they're correct.

Auditors will ask to see your documented approval policy and then test whether the system enforces it. If there's a gap between what the policy says and what the system does, that's a finding — regardless of which version is "right."

**What to check:** Get your written approval policy and compare it line by line against your actual system configuration. Check every threshold, every role, every transaction type. If your approval rules live in code that you can't easily read and compare to the policy document, that's a separate problem worth solving.

## 5. The Vacation Workaround

Someone goes on vacation. Transactions start piling up in their approval queue. After a day or two, someone emails the NetSuite admin: "Can you just approve these so we can get the bills paid?"

The admin logs in, manually changes the status from "Pending Approval" to "Approved," and everything moves along. Crisis averted. Except now you have transactions in the system that were approved by an administrator rather than the designated approver, with no formal delegation, no documentation of why, and no record that it was authorized by anyone.

This happens in almost every NetSuite environment I've worked in. It's usually well-intentioned — people are trying to keep the business running. But from an audit perspective, it's an override of the approval control, and auditors specifically look for it.

The more sophisticated version of this is when someone shares their login credentials with a colleague to handle approvals during their absence. Same problem: the audit trail now shows the original person approving transactions they never actually reviewed.

**What to check:** Look for transactions approved by users with administrator roles, or approved outside of your normal workflow. Look for unusual patterns like approvals at odd hours, approvals in bulk (suggesting a backlog was cleared at once), or approvals by people who don't normally approve that transaction type. Any of these could indicate informal workarounds that bypass your controls.

## The Common Thread

None of these red flags involve anyone doing something malicious. They're all the result of reasonable people working within systems that don't quite enforce what the company's approval policy requires.

That's the uncomfortable truth about approval workflows: the gap between "we have an approval process" and "our approval process is audit-ready" is wider than most organizations realize. And because everything appears to be working from the inside, the gap tends to grow quietly until someone external — usually an auditor — takes a close look.

The good news is that all five of these are fixable. Some are process fixes. Some require better tooling. But the first step is always the same: know where you stand before your auditor tells you.

---

*Patrick is the founder of [Greenlight Approvals](https://greenlightapprovals.com), a NetSuite-native approval workflow platform built for audit readiness. Have questions about your approval workflows? Connect with him on [LinkedIn](https://linkedin.com).*
