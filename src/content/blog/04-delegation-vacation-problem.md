---
title: "Approval Delegation Done Wrong: The Vacation Problem"
description: "Someone goes on vacation. Approvals pile up. And then things start to break in ways that won't surface until your next audit."
pubDate: 2026-02-11
tags: ["approvals", "delegation", "audit"]
featured: false
---

Thursday afternoon. Your VP of Finance is leaving for 10 days. She clears most of her queue but not all. By Monday there are 15 transactions sitting there. By Wednesday, AP is getting vendor calls and someone emails the NetSuite admin: “Can you just push these through? Maria’s out.”

The admin changes status from Pending to Approved. Logjam cleared. Except it isn’t — you just deferred it to your next audit.

**How it usually plays out.** I’ve seen this in almost every NetSuite environment. The workarounds: admin override (fast, but now you have “approvals” by someone who isn’t an authorized approver). Shared login (“just log in as me and approve what comes in” — audit trail says the VP did things she didn’t). Temporary rule changes that sometimes get reverted and sometimes don’t. “Just this once” approvals with no delegation doc, just a Slack thread that’s already buried. All well-intentioned. All create audit risk.

**What auditors look for.** They’re trained to spot it: approvals by admin accounts, approval clustering (20 in 90 seconds on a Monday morning), approver inconsistency (why did someone else sign for two weeks in July?), workflow config changes that were later reverted. The workaround that kept the business running can look like a control failure six months later.

**What proper delegation looks like.** Pre-authorized (set up before the absence). Time-bound (auto-expires when they’re back). Scoped (the delegate has appropriate authority). And captured in the audit trail — when the delegate approves something, the trail should show it was delegated, who from, who to, and the period. Without that, auditors see someone approving outside their normal scope and have to ask.

**The frequency problem.** It’s not just vacation. Conferences, sick days, travel. In a mid-size org with a few people in the chain, someone’s out most weeks. If there’s no formal delegation, your team is improvising dozens of times a year. Each one is a small risk. They add up.

Quick test: If your VP went on vacation tomorrow, what would happen to their queue? If the answer is “we’d figure it out” or involves an admin or shared login, you have a gap. Worth closing before the next audit.

---

*Patrick is the founder of [Greenlight Approvals](https://greenlightapprovals.io/), a NetSuite-native approval workflow platform built for audit readiness.*
