---
title: "NetSuite Vendor Bill Approval Workflows: Where the Money Actually Leaves"
description: "The PO gets all the approval attention, but the vendor bill is the document that authorizes payment. Here's why native NetSuite bill approvals miss non-PO invoices, scripted entries, and three-way match exceptions, and what a workflow that catches them looks like."
pubDate: 2026-07-07
tags: ["NetSuite", "vendor bills", "accounts payable", "approval workflows", "three-way match", "audit"]
featured: false
---

An AP clerk keys a vendor bill for $48,000 against an open purchase order. The PO was approved back in March, so the bill sails through. It posts, it gets paid on the next run, and everyone moves on.

Two months later someone notices the PO was for $32,000. The vendor billed for more, the bill didn't match the order, and nobody caught it because the approval everyone trusted happened on the purchase order, not on the bill. The payment cleared without anyone approving the bill itself.

This is the blind spot in most NetSuite AP setups. The [purchase order gets careful approval routing](/resources/14-netsuite-purchase-order-approval-workflow/), and the vendor bill, the document that commits the payment, rides on the PO's coattails.

## The PO Is a Promise, the Bill Is the Payment

A purchase order is an intention to buy. It says the company plans to spend money with a vendor. Approving it matters, but approving it does not move any cash.

The vendor bill is different. It records an actual liability, it feeds the payment run, and once it posts it is the thing your auditors trace when they ask "why did we pay this vendor this amount." The bill is where the money is committed, and it is frequently the least controlled step in the whole procure-to-pay chain.

Part of the reason is a reasonable-sounding assumption: if the PO was approved, the bill against it is already authorized. That holds only when the bill matches the PO exactly. The moment the amounts diverge, the quantities differ, or the bill arrives with no PO behind it at all, the assumption stops holding and the bill has no control behind it.

## Where Native NetSuite Bill Approvals Fall Short

NetSuite can route vendor bills for approval, either through the approval routing preference or through the SuiteApprovals SuiteApp. Both work for the straightforward case: a bill over a threshold routes to a supervisor, who approves it before it can be paid. The gaps show up around the edges, and in AP the edges are most of the volume.

**Non-PO bills have no upstream approval to inherit.** Utilities, rent, legal fees, subscriptions, one-off services. A large share of vendor bills never start life as a purchase order. There is no approved PO to lean on, so the bill approval is the only control that exists. If routing is thin or thresholds are loose, these invoices get paid on the strength of a single AP clerk keying them in.

**Matching tolerance is not approval.** NetSuite's bill-to-order matching can flag a variance between the PO and the bill, but flagging a variance and routing that specific exception to the right person are two different things. A three-way match exception where the receipt, the PO, and the bill disagree needs someone with authority to look at it. Native tooling surfaces the difference; it does not reliably put the difference in front of a decision-maker and hold the bill until they respond.

**Scripted and imported bills skip approval entirely.** Most mid-market companies now feed vendor bills into NetSuite through OCR capture, AP automation platforms, EDI, or CSV upload. SuiteApprovals does not route transactions created by CSV import, SuiteScript, or web services. So the highest-volume, least-reviewed bills, the ones a machine posted without a person ever looking at them, are the ones that bypass approval. The tooling meant to speed AP up also removed the last human checkpoint.

**Approval is tied to the bill total, not the exposure.** Routing usually keys on the invoice amount. But the risk on a vendor bill is not only its face value. A duplicate bill, a bill to a brand-new vendor, a bill that pushes a GL account past budget, a bill just under a review threshold: none of these are captured by a single amount check. NetSuite will warn on a duplicate vendor bill number, but a warning an AP clerk can click past is not an approval.

**No delegation when the approver is out.** A bill sitting in Pending Approval while the only approver is on vacation can blow past an early-payment discount window or trip a late fee. We wrote about [the delegation gap in detail](/resources/04-delegation-vacation-problem/); on a vendor bill, the delay carries a direct dollar cost.

## What This Costs

The cost of weak bill approval lands in a few predictable places.

Duplicate payments come first. When the same invoice enters through both an email to AP and an automated feed, and neither path enforces a real approval, it gets paid twice. Recovering that money from a vendor is slow and sometimes impossible.

Overbillings that don't match the PO get paid because the bill was trusted on the PO's approval. Missed discounts and late fees accrue when bills stall in a queue with no delegation. At audit time, non-PO invoices with no clear approver are [the kind of gap that turns a routine review into a long one](/resources/03-real-cost-audit-prep/), and "the integration posted it" does not satisfy the person asking who authorized the payment.

There is a subtler cost too. When [approvers don't know why a bill landed in their queue](/resources/12-approvers-dont-know-why/), or the bill routes to someone with no context on the underlying purchase, approval turns into a rubber stamp that clears everything and catches nothing.

## What Bill Approval Should Actually Do

A vendor bill workflow that holds up under real AP volume does a few things the standard setup does not.

- **Approve every bill, regardless of how it entered.** Hand-keyed, OCR-captured, integration-fed, or CSV-loaded, the entry method should not decide whether a payment gets reviewed. If anything, the bills a machine created need the control more, since no one saw them on the way in.
- **Route non-PO bills on their own logic.** With no PO to inherit from, these bills need routing by GL account, vendor, department, or expense category, so a legal invoice reaches the GC's office and a facilities bill reaches facilities.
- **Turn match exceptions into routed approvals.** When the bill, the PO, and the receipt disagree beyond tolerance, that exception should go to a named approver and block payment until they act, not sit as a flag someone may or may not notice.
- **Match on risk, not just amount.** New vendor, possible duplicate, a bill that pushes an account over budget, a payment just under a threshold. These should be conditions a rule can route on, alongside the invoice total.
- **Keep a searchable, immutable approval history.** One record per bill showing who approved it, under which rule, and when, so the answer to "why did we pay this" is a report someone can pull, not a reconstruction after the fact. That is the data the [metrics that actually matter in AP](/resources/19-netsuite-approval-metrics-slas/) are built from, and it is what [segregation-of-duties controls](/resources/11-netsuite-segregation-of-duties/) depend on when the person entering the bill and the person approving it need to be different people.

## How Greenlight Handles It

Greenlight evaluates approval rules through User Event scripts on the transaction, so it fires on vendor bills no matter how they were created. A bill that arrived through an automation platform or a CSV load is evaluated the same as one a clerk keyed by hand, which means the scripted and imported bills native approvals skip still get routed.

Because a rule matches on ten segments and five configurable custom criteria, routing is not limited to the invoice total. A rule can target non-PO bills by GL account or vendor, send facilities invoices one direction and professional-services invoices another, or single out bills to a new vendor for extra review. Steps within a rule run in sequence and resolve each approver from the transaction's context, so the bill reaches the person who actually owns that spend.

Budget enforcement reads the account and subsidiary on the bill, so an approver sees the payment against the [right budget before it posts](/resources/15-netsuite-budget-enforcement-approvals/), rather than discovering the overage at month end. Segregation-of-duties enforcement covers the case where the person entering the bill is also in the approval chain, with a setting to warn, block, or notify. And every approval lands in an immutable log with the matching rule and each step recorded, so when an auditor asks who authorized a payment, one search returns the full history.

---

**The vendor bill is where the money actually leaves, so it deserves a stronger control than the PO's leftovers.** Greenlight approves every bill, including the scripted and imported ones native approvals skip, routes non-PO invoices on real business logic, and logs each approval in one auditable record. [See vendor bill routing in a 30-minute walkthrough →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
