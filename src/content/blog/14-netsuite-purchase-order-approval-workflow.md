---
title: "NetSuite Purchase Order Approval Workflows: What Most Companies Get Wrong"
description: "The standard NetSuite PO approval workflow handles the happy path. It's the rejection cycles, missing audit trails, and overwritten data that create real problems."
pubDate: 2026-05-25
tags: ["NetSuite", "purchase orders", "approval workflows", "audit", "SuiteFlow"]
featured: false
---

The standard Purchase Order Approval Workflow in NetSuite covers the basics. A PO gets created, routed to a supervisor or purchase approver based on dollar thresholds, and either approved or rejected. For a single-subsidiary company with straightforward spending authority, it works.

But most companies outgrow it faster than they expect. Not because the approval routing breaks, but because everything around it does. Rejection tracking gets lost. Audit trails have gaps. Resubmitted POs carry no history of what went wrong the first time. That's the normal lifecycle of a purchase order that doesn't get approved on the first pass.

## What the Standard Workflow Actually Does

NetSuite's PO Approval Workflow ships as a [SuiteApp (Bundle 239645)](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N2398841.html). It uses SuiteFlow to move a purchase order through a series of states: check the user's role, check whether an approver is assigned, compare the PO total against the creator's purchase limit, then route to the appropriate approver.

The approval chain follows the employee record hierarchy. If a Purchase Approver is set on the employee record, that person gets the PO. Otherwise it goes to the Supervisor. If the approver's own purchase limit is lower than the PO total, the system routes up to the next person in the chain. Foreign currency POs are converted to the employee's base currency before the limit check runs.

Approved POs lock and trigger an email to the creator. Rejected POs unlock, the creator gets notified, and they can edit and resubmit.

The rejection path is where the problems live.

## The Rejection Problem Nobody Plans For

When an approver clicks Reject, the standard workflow changes the Approval Status from "Pending Approval" to "Rejected," sends a notification to the creator, and unlocks the record. Nothing else happens.

There's no built-in way to capture *why* the PO was rejected. No required reason field. No log of the rejection event. The approver clicks a button and the PO goes back to the creator with no context beyond whatever was in the email notification, if anything was written at all. [Your approvers don't know why they're approving](/resources/12-approvers-dont-know-why/), and the system doesn't track why they're rejecting either.

This works for the first rejection. The creator checks their email, reads the note, fixes the PO, and resubmits. But what about the second rejection? Or the third?

If you've added a custom body field like `custbody_rejection_reason` to capture the reason (a common first attempt), that field gets **overwritten** every time the PO is rejected again. The reason from the first rejection disappears. You lose the pattern, you can't see that the same PO was sent back three times for three different reasons, and you have nothing to show your auditors.

System Notes will show that the Approval Status field changed from "Pending Approval" to "Rejected" and back again. But System Notes capture *what changed*, not *why*. They'll tell you the field value flipped. They won't tell you the approver sent it back because the vendor quote was expired or the budget was already committed elsewhere.

## Why Notes Don't Solve This Either

The instinct is to use NetSuite's native Notes feature and attach a note to the PO each time it's rejected. Sounds reasonable, but Notes have limitations that make them unreliable here.

Saved Search results for User Notes are [restricted to the current user's notes](https://netsuite.smash-ict.com/netsuite-user-notes-integration/). If three different approvers reject a PO across three rounds, no single person can pull a saved search that shows all three rejection notes unless they have Administrator access. Notes also aren't exposed through the REST API, and querying them through SuiteQL is [unintuitive](https://netsuite.smash-ict.com/netsuite-user-notes-integration/). For something as critical as rejection history on a purchase order, you need data you can search, report on, and hand to an auditor.

## The Custom Rejection Record Approach

The approach that holds up, and the one [multiple NetSuite consultancies have documented](https://technologyblog.rsmus.com/technologies/netsuite/approval-workflow/), is a dedicated custom record for rejection events made a child of the transaction.

The record is simple. Four fields:

- **Transaction**: List/Record field referencing the parent PO
- **Rejection Reason**: free-form text from the approver
- **Rejected By**: employee field, auto-populated
- **Date Rejected**: date field, auto-populated

Because the Transaction field creates a parent-child relationship, these records show up as a subtab on the purchase order. Open any PO and you can see every rejection in sequence: who sent it back, when, and why. Each rejection creates a **new record** instead of overwriting a field, so nothing gets lost between cycles.

In the workflow, the Reject transition creates a new rejection record and routes the approver to fill in the reason. [Sikich](https://www.sikich.com/insight/netsuite-rejection-reasons-on-approval-workflows/) and [others](https://suiteanswersthatwork.com/netsuite-approval-workflow-rejection-reason-suitelet/) recommend using a Suitelet for this. When the approver clicks Reject, a popup opens requiring the reason before the transition completes. This avoids the timing problem where the record moves to the Rejected state before the reason is captured, which can happen with a simple "Go to Record" action.

It's the cleanest approach I've seen for keeping discrete data on each rejection loop without losing history. A saved search on the rejection record, filtered by Transaction Type = Purchase Order, gives finance and audit teams a complete view of every rejection across all POs, sortable by approver, date, or amount. That's the kind of reportable data auditors actually want. A single body field that gets overwritten, or Notes that can't be searched across users, will leave you with exactly the kind of [audit gap that's hard to explain](/resources/03-real-cost-audit-prep/) when someone asks for the full approval history on a seven-figure PO.

## The Other Gaps That Compound

Rejection tracking is the most visible problem, but the standard PO workflow has other structural gaps that affect daily operations:

**Role dependency.** The workflow checks whether the PO creator has the Employee Center role. If they're using a Purchasing or full-access role instead, the PO [auto-approves and skips the workflow entirely](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4158616141.html). This catches a lot of companies off guard.

**No approver, no approval.** If the creator's employee record has no Supervisor or Purchase Approver assigned, the PO auto-approves. No fallback, no alert, no queue for unassigned approvals.

**Sequential routing only.** Approvals follow a linear chain up the hierarchy. There's no native way to require parallel sign-off from both Finance and Procurement on the same PO.

**No delegation.** If your approver is on vacation, the PO sits in Pending Approval until they return or someone with admin access steps in. (We wrote about this [in detail](/resources/04-delegation-vacation-problem/).)

**Transaction-level only.** Approval covers the entire PO. You can't route individual line items to different approvers based on GL account, department, or item category.

These are the [red flags auditors look for](/resources/5-red-flags-approval-workflow/), and they show up in most mid-market companies within the first year of using the standard workflow.

## What "Getting It Right" Looks Like

A PO approval workflow that holds up under real conditions does four things the standard bundle doesn't:

**Rejection reasons live in searchable data.** Not a body field that gets wiped on resubmission. Not a Note that only one user can search. A record you can report on.

**Full approval history survives every cycle.** The fifth rejection is as well-documented as the first. Nothing gets overwritten.

**Routing follows business logic.** Department, amount, vendor, subsidiary. Not just a supervisor hierarchy on the employee record.

**Exceptions don't require admin intervention.** Delegation, parallel approvals, missing approvers. The workflow handles them instead of stalling until someone with full access steps in.

You don't have to throw out SuiteFlow or start from scratch. But you do have to build beyond what the standard bundle provides, and plan for the rejection path as carefully as the approval path.

---

**If your PO approval workflow only works when everyone approves on the first pass, it doesn't really work.** Greenlight handles rejection tracking, parallel routing, and delegation natively, with no Suitelets or custom records required. [See how it works in a 30-minute walkthrough.](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
