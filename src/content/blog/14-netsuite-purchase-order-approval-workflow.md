---
title: "NetSuite Purchase Order Approval Workflows: What Most Companies Get Wrong"
description: "The standard NetSuite PO approval workflow handles the happy path. It's the rejection cycles, missing audit trails, and overwritten data that create real problems."
pubDate: 2026-05-25
tags: ["NetSuite", "purchase orders", "approval workflows", "audit", "SuiteFlow"]
featured: true
---

The standard Purchase Order Approval Workflow in NetSuite covers the basics. A PO is created, routed to a supervisor or purchase approver based on dollar thresholds, and either approved or rejected. For a single-subsidiary company with straightforward spending authority, it works.

But most companies outgrow it faster than they expect — not because the approval routing breaks, but because everything around it does. Rejection tracking gets lost. Audit trails have gaps. Resubmitted POs carry no history of what went wrong the first time. These aren't edge cases. They're the normal lifecycle of a purchase order that doesn't get approved on the first pass.

## What the Standard Workflow Actually Does

NetSuite's PO Approval Workflow ships as a [SuiteApp (Bundle 239645)](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2398841.html). It uses SuiteFlow to move a purchase order through a series of states: check the user's role, check whether an approver is assigned, compare the PO total against the creator's purchase limit, then route to the appropriate approver.

The approval chain follows the employee record hierarchy. If a Purchase Approver is set on the employee record, that person gets the PO. If not, it goes to the Supervisor. If the approver's own purchase limit is lower than the PO total, the system routes up to the next approver in the chain. Foreign currency POs are converted to the employee's base currency before the limit check runs.

When a PO is approved, the creator gets an email and the record locks. When it's rejected, the creator gets an email, the record unlocks, and they can edit and resubmit.

That rejection path is where things start to fall apart.

## The Rejection Problem Nobody Plans For

Here's what the standard workflow does when an approver clicks Reject: it changes the Approval Status field from "Pending Approval" to "Rejected," sends an email to the creator, and unlocks the record. That's it.

There is no built-in mechanism to capture *why* the PO was rejected. No required reason field. No structured log of the rejection event. The approver clicks a button and the PO goes back to the creator with no context beyond whatever was written in the email notification — if anything was written at all. [Your approvers don't know why they're approving](/resources/12-approvers-dont-know-why/), and the system doesn't know why they're rejecting either.

This is manageable for the first rejection. The creator checks their email, reads the note, fixes the PO, and resubmits. But what happens when a PO is rejected a second time? Or a third?

If you've added a custom body field like `custbody_rejection_reason` to capture the reason — a common first attempt — that field gets **overwritten** on every rejection cycle. The reason from the first rejection is gone. You have no record of the pattern, no way to see that the same PO was rejected three times for three different reasons, and no structured data for your auditors.

System Notes will show that the Approval Status field changed from "Pending Approval" to "Rejected" and back again. But System Notes capture *what changed*, not *why*. They'll tell you the field value flipped. They won't tell you the approver rejected it because the vendor quote was expired or the budget was already committed elsewhere.

## Why Notes Don't Solve This Either

The instinct is to use NetSuite's native Notes feature — attach a note to the PO each time it's rejected. In theory, this creates a running log. In practice, Notes have limitations that make them unreliable for this purpose.

Saved Search results for User Notes are [restricted to the current user's notes](https://netsuite.smash-ict.com/netsuite-user-notes-integration/). If three different approvers reject a PO across three cycles, no single person can pull a saved search that shows all three rejection notes unless they have Administrator access. Notes also aren't exposed through the REST API, and querying them through SuiteQL is [not straightforward](https://netsuite.smash-ict.com/netsuite-user-notes-integration/). For something as critical as rejection history on a purchase order, you need data you can reliably search, report on, and hand to an auditor.

## The Custom Rejection Record Approach

The pattern that works — and the one [multiple NetSuite consultancies have documented](https://technologyblog.rsmus.com/technologies/netsuite/approval-workflow/) — is a dedicated custom record for rejection events, made a child of the transaction.

The record is simple. Four fields:

- **Transaction** — a List/Record field referencing the parent PO
- **Rejection Reason** — free-form text from the approver
- **Rejected By** — employee field, auto-populated
- **Date Rejected** — date field, auto-populated

Because the Transaction field creates a parent-child relationship, these records show up as a subtab on the purchase order. Open any PO and you can see every rejection in sequence — who rejected it, when, and why. Each rejection creates a **new record** rather than overwriting a field, so the history is preserved across every cycle.

In the workflow, the Reject transition creates a new rejection record and routes the approver to fill in the reason. [Sikich](https://www.sikich.com/insight/netsuite-rejection-reasons-on-approval-workflows/) and [others](https://suiteanswersthatwork.com/netsuite-approval-workflow-rejection-reason-suitelet/) recommend using a Suitelet for this — when the approver clicks Reject, a popup opens requiring the reason before the transition completes. This avoids the timing problem where the record transitions to the Rejected state before the reason is captured, which can happen with a simple "Go to Record" action.

Is this the only way to handle it? No. But it's the cleanest approach I've seen for keeping discrete data on each rejection loop without losing history. The alternative — a single body field that gets overwritten, or Notes that can't be reliably searched — creates exactly the kind of [audit gap that's hard to explain](/resources/03-real-cost-audit-prep/) when someone asks for the approval history on a seven-figure PO.

## The Other Gaps That Compound

Rejection tracking is the most common pain point, but it's not the only one. The standard PO workflow has structural limitations that affect day-to-day operations:

**Role dependency.** The workflow checks whether the PO creator has the Employee Center role. If they don't — if they're using a Purchasing or full-access role — the PO is [automatically approved and skips the workflow entirely](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4158616141.html). This catches a lot of companies off guard.

**No approver, no approval.** If the creator's employee record has no Supervisor or Purchase Approver assigned, the PO auto-approves. There's no fallback, no alert, no queue for unassigned approvals.

**Sequential routing only.** Approvals follow a linear chain up the hierarchy. There's no native way to require parallel approvals — Finance *and* Procurement both signing off on the same PO, for example.

**No delegation.** If your approver is on vacation, the standard workflow has no built-in delegation mechanism. The PO sits in Pending Approval until they return or someone with admin access intervenes. (We wrote about this problem [in detail](/resources/04-delegation-vacation-problem/).)

**Transaction-level only.** Approval is for the entire PO. You can't route individual line items to different approvers based on GL account, department, or item category.

These aren't obscure edge cases. They're the [red flags auditors look for](/resources/5-red-flags-approval-workflow/) — the normal complexity of procurement in a mid-market company that the standard workflow wasn't built to handle.

## What "Getting It Right" Looks Like

A PO approval workflow that holds up under real conditions does a few things the standard workflow doesn't:

It captures rejection reasons as structured, searchable data — not overwritten fields or unsearchable notes. It preserves the full approval history across every cycle, so the fifth rejection is as well-documented as the first. It routes based on business logic — department, amount, vendor, subsidiary — not just a supervisor hierarchy. And it handles the exceptions (delegation, parallel approvals, missing approvers) without requiring admin intervention every time someone goes on PTO.

None of this requires throwing out SuiteFlow or starting from scratch. But it does require building beyond what the standard bundle provides — and planning for the rejection path with the same rigor you put into the approval path.

---

**If your PO approval workflow only works when everyone approves on the first pass, it doesn't really work.** Greenlight handles rejection tracking, parallel routing, and delegation natively — no Suitelets or custom records required. [See how it works in a 30-minute walkthrough.](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
