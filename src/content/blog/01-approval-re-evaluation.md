---
title: "What Happens When Your Approval Tool Doesn't Re-Evaluate Rules"
description: "A real story about 150 purchase orders, a routine edit, and an approval gap nobody saw coming."
pubDate: 2026-02-13
tags: ["approvals", "NetSuite", "compliance"]
featured: false
---

I want to tell you about something I saw during a NetSuite engagement that changed how I think about approval workflows.

A mid-market company — let's call them Acme — had been running a popular third-party approval tool in NetSuite for about two years. It was working fine, or so they thought. Approvals were routing. People were clicking approve. Transactions were posting. Everyone was happy.

Then their auditors pulled a sample of purchase orders from Q3.

## The Finding

Out of the sample, the auditors flagged several POs where the approved amount didn't match the original routing threshold. A purchase order for $42,000 had been approved by a department manager whose approval limit was $10,000. The VP of Finance, who should have been in the approval chain for anything over $10K, had never seen it.

When the finance team dug in, they found it wasn't just a few. It was over 150 purchase orders across a six-month period. All approved. All posted. All missing at least one required approver.

The auditors issued a material control deficiency finding.

## What Actually Happened

Here's the thing — nobody did anything wrong. No one bypassed the system. No one gamed a permission. The approval tool worked exactly as it was designed.

The problem was in *how* it was designed.

The tool evaluated approval routing rules at one moment: when the transaction was first submitted for approval. It looked at the amount, checked it against the threshold rules, identified the right approvers, and set the approval chain. So far, so good.

But here's what happens in the real world. A buyer creates a PO for $8,000 — well under the $10K VP threshold. They submit it for approval. The department manager gets notified, reviews it, and approves it. Clean.

Except before the PO is fully posted, the buyer realizes they forgot a line item. Or the vendor sends an updated quote. Or purchasing adds freight charges. The PO goes from $8,000 to $14,000.

In Acme's system, that edit didn't trigger a re-evaluation of the approval routing rules. The tool had already decided this was a "department manager only" approval. The chain was set. The $14,000 PO posted with only a department manager's sign-off.

Multiply this by every PO that gets edited between submission and posting — which, if you've spent any time in a purchasing department, you know is a lot of them — and you get 150 misrouted approvals in six months.

## Why This Isn't Obvious

This is the kind of gap that's almost impossible to catch through normal operations. From the department manager's perspective, they approved a PO and it posted. Normal. From the VP's perspective, they never saw the PO, so they had no reason to ask questions. From the buyer's perspective, they edited a PO and it went through. Normal.

Nobody experienced friction. Nobody got an error. The system didn't flag anything. It just quietly routed a $14,000 transaction through a $10,000 approval chain, because it was still using the rules it evaluated when the transaction was $8,000.

The only people who caught it were the auditors, six months later, looking at the data with fresh eyes.

## This Isn't a Bug — It's an Architecture Decision

When I started looking into this more closely — not just at Acme, but across other NetSuite environments I was working in — I realized this wasn't a fluke. It's a fundamental architectural decision that most approval tools make, often without documenting it clearly.

Evaluating rules once, at submission time, is simpler to build. It's faster to execute. And for most transactions that never change after submission, it works perfectly fine.

But NetSuite isn't a system where transactions stay frozen after submission. Purchase orders get revised. Vendor bills get adjusted. Journal entries get corrected. Expense reports get updated with additional receipts. This is normal, expected behavior in any finance operation.

An approval system that doesn't account for this is making an implicit bet: that the data at submission time will be the same as the data at posting time. And in a lot of NetSuite environments, that bet loses more often than anyone realizes.

## What Auditors Are Actually Testing

If you're preparing for an audit — SOX, internal controls review, or external — this specific scenario is worth thinking about. Auditors are increasingly sophisticated about approval workflow testing. They don't just check that an approval exists on a transaction. They check that the *right* approval exists based on the *final* state of the transaction.

That means pulling the posted amount, comparing it to approval thresholds, and verifying that every required approver in the chain actually signed off. When the posted amount crosses a threshold that the original submission amount didn't, and the higher-level approver is missing — that's a finding.

The challenging part is that you won't see this in your approval tool's reporting. The tool thinks everything routed correctly, because based on the data it evaluated, it did. You'd need to independently compare posted transaction data against routing rules and approval history to find the gap.

Most finance teams don't have that comparison running. Which is why it tends to surface during audits rather than during normal operations.

## Questions Worth Asking

If you're running approval workflows in NetSuite — whether native workflows, a third-party tool, or something custom-built — here are a few questions worth investigating:

**Does your approval routing re-evaluate when transaction data changes?** Not just when someone clicks "resubmit," but when a line item is added, an amount changes, or a vendor is swapped. If the answer is "I'm not sure," that's worth finding out before your auditors do.

**What happens between approval and posting?** In some configurations, there's a window where an approved transaction can be edited before it's fully posted. If edits in that window don't trigger re-approval, you may have the same exposure Acme did.

**Can you run a retrospective check?** Even if your current tool doesn't re-evaluate in real time, you can periodically compare posted transaction amounts against your approval thresholds to see if anything slipped through. It's manual, but it's better than waiting for an audit finding.

**Are your approval thresholds documented outside of code?** If the only place your routing rules live is in a SuiteScript file or a workflow configuration screen, it's hard for a non-technical stakeholder to verify that the rules match the company's approval policy. Discrepancies between policy and system configuration are another common audit finding.

## The Bigger Picture

The Acme story stuck with me because it highlights something I've seen repeatedly in NetSuite environments: the gap between "approvals are happening" and "approvals are happening correctly" is wider than most people think.

Approval tools are often evaluated on speed and convenience. Can we get approvals done faster? Can we reduce the number of clicks? Can we make it easier for approvers? These are fine goals, but they're not what your auditors are evaluating.

Your auditors care about one thing: can you demonstrate that the right person approved the right transaction at the right amount, every time, with evidence? If your approval system can't guarantee that — especially when transactions change after initial submission — then every approved transaction carries a small amount of risk that compounds over time.

150 POs in six months. That was one company, one transaction type, one gap. The math scales from there.

---

*Patrick is the founder of [Greenlight Approvals](https://greenlightapprovals.com), a NetSuite-native approval workflow platform built for audit readiness.*
