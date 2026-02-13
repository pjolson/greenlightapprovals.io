---
title: "What Happens When Your Approval Tool Doesn't Re-Evaluate Rules"
description: "A real story about 150 purchase orders, a routine edit, and an approval gap nobody saw coming."
pubDate: 2026-02-01
tags: ["approvals", "NetSuite", "compliance"]
featured: false
---

I want to tell you about something I saw during a NetSuite engagement that changed how I think about approval workflows.

A mid-market company — call them Acme — had been running a popular third-party approval tool for about two years. Approvals were routing. People were clicking approve. Everyone was happy. Then their auditors pulled a sample of POs from Q3.

**The finding.** Several POs had been approved by people whose limits shouldn’t have allowed it. A $42,000 PO approved by a department manager with a $10K limit. The VP of Finance never saw it. When they dug in, it wasn’t a few — it was over 150 POs in six months. The auditors wrote it up as a material control deficiency.

Nobody had done anything wrong. The tool worked exactly as designed. The problem was *how* it was designed.

It evaluated routing rules at one moment: when the transaction was first submitted. So a buyer creates a PO for $8,000, submits it, the manager approves. Then someone adds a line or the vendor sends an updated quote — the PO goes to $14,000. In Acme’s system, that edit didn’t trigger a re-evaluation. The chain was already set. The $14K PO posted with only the manager’s sign-off.

Multiply that by every PO that gets edited between submit and post (and in purchasing, that’s a lot), and you get 150 misrouted approvals. From the inside, no one saw friction. The only people who caught it were the auditors, six months later.

**Why it’s not obvious.** Most approval tools evaluate rules once at submission. It’s simpler to build. But NetSuite isn’t a place where transactions stay frozen — POs get revised, bills get adjusted, expense reports get more receipts. If your tool doesn’t re-evaluate when data changes, you’re betting that submit-time and post-time match. In a lot of environments, that bet loses.

**What to do.** Does your routing re-evaluate when amounts or line items change — not just when someone clicks “resubmit”? If you’re not sure, find out before the auditors do. You can also run a spot check: compare posted amounts to your thresholds and see if anything slipped through with the wrong approver.

The Acme story stuck with me because it’s a perfect example of the gap between “approvals are happening” and “approvals are happening correctly.” That gap is wider than most people think.

---

*Patrick is the founder of [Greenlight Approvals](https://greenlightapprovals.io/), a NetSuite-native approval workflow platform built for audit readiness.*
