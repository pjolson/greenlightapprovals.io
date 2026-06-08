---
title: "Migrating from Email Approvals to a Real NetSuite Workflow"
description: "Most teams know their email-and-spreadsheet approval process is broken. The hard part isn't picking a tool. It's untangling what you're actually doing today so you can build something that holds up."
pubDate: 2026-06-08
tags: ["approvals", "NetSuite", "migration", "workflow", "implementation", "email", "compliance"]
featured: false
---

Someone on your team keeps a spreadsheet. Maybe it's the AP manager. Maybe it's an office admin who inherited it three years ago. The spreadsheet tracks which POs have been approved, by whom, and roughly when. "Roughly" because the dates come from email timestamps, and half the approvals happened over text message or a hallway conversation that someone remembered to log after the fact.

Everyone knows the process is held together with tape. But it works, mostly. Transactions get approved. Vendors get paid. The business runs. The problem surfaces when someone asks a question the spreadsheet can't answer. Which version of the PO did the VP approve? Was the vendor changed after sign-off? Did anyone check whether the approver had authority for that amount? The spreadsheet says "approved." It doesn't say much else.

Migrating to a real workflow isn't about buying software. It's about figuring out what you're actually doing today, deciding what you should be doing, and building something that closes the gap between the two.

## Step 1: Map What's Actually Happening

Before you design anything, document your current process exactly as it operates. Not as it's written in a policy document. Not as management thinks it works. The version that AP lives with every day.

Start with three questions for every transaction type you approve (POs, bills, expense reports, journal entries, vendor payments):

**Who approves it?** Write down every person who has ever approved this transaction type in the last 12 months. Include the backups, the people who cover during vacations, and the manager who sometimes just tells AP to push it through. You'll find that your "two-person approval chain" actually involves six or seven people with no consistent logic for who gets which transaction.

**What triggers the approval?** Is it amount? Department? Vendor? Subsidiary? All of the above, but only sometimes? Most email-based processes have rules, but the rules live in someone's head. The AP manager knows that anything over $10,000 goes to the CFO, that facilities POs go to the ops director regardless of amount, and that the CEO's expense reports go to the board treasurer. None of this is written down in a way that a system could enforce.

**What information does the approver see?** In most email chains, the approver sees whatever the requester chose to include. Sometimes it's a PDF of the PO. Sometimes it's a forwarded email that says "can you approve this?" with no attachment. Sometimes the approver replies "approved" to a message they received three days ago, and the transaction has changed twice since then. This is the [approval re-evaluation problem](/resources/01-approval-re-evaluation/): the thing that was approved may not be the thing that gets processed.

Document all of this without judgment. You're not fixing anything yet.

## Step 2: Find the Gaps That Matter

Once you have the map, compare it to what your approval policy says should happen. Every difference is a gap. Not all gaps are equal, and sorting them wrong is how migration projects stall.

**Start with audit risk.** If your policy requires segregation of duties but your process lets the person who creates a PO also approve it by replying to their own email thread, that's a [segregation of duties failure](/resources/11-netsuite-segregation-of-duties/) that an auditor will flag. If your policy says VP approval above $25,000 but your email chain sometimes skips the VP when they're slow to respond, that's a control breakdown. These gaps need to be solved in the new workflow before anything else.

Bottlenecks come next. The VP who takes three days to respond to approval emails. The single point of failure when someone goes on vacation with no [delegation process](/resources/04-delegation-vacation-problem/). The transactions that sit in someone's inbox because the email got buried. These are real problems, but they're operational, not compliance. Your new workflow should fix them, and it probably will just by existing. But don't let them drive the design.

Then there's the stuff that's just messy. Inconsistent naming conventions in email subjects. Approvals tracked in three different spreadsheets. Outlook rules that auto-sort approval emails into a folder no one checks. You don't need to solve these. They'll disappear on their own when the email chain goes away.

## Step 3: Design the Routing Logic on Paper First

Someone opens the workflow builder and starts clicking. Two weeks later, you have a routing tree with 47 branches, 12 exception paths, and a condition that references a custom field nobody remembers creating. This happens on almost every implementation where the design phase got skipped.

A whiteboard or a simple table works better than any tool at this stage. For each transaction type, write down:

- **Entry criteria.** What triggers this workflow? Transaction type, status, or a combination?
- **Routing rules.** Who approves, based on what conditions? Amount thresholds, department, subsidiary, vendor category? Keep the conditions to the minimum that enforces your policy.
- **Escalation path.** What happens if the approver doesn't act within your SLA? Pick one path per rule. Complex escalation trees are the first thing that breaks.
- **Exception handling.** What happens when someone needs to override the normal path? Who can authorize it? How is it logged?

Every additional routing condition is a branch you'll need to test and maintain. If your paper design has more than a handful of conditions per transaction type, you're probably encoding exceptions that should be handled as exceptions, not as routing rules.

Your controller should be able to look at this document and say "yes, that matches our policy" before anyone touches the system. That review is worth the time. It's also the policy-to-system reconciliation document your [auditor will eventually ask for](/resources/17-controllers-guide-audit-ready-approvals/).

## Step 4: Decide What to Migrate and What to Leave Behind

Not everything from your current process belongs in the new workflow.

The routing logic has to move. That's the core of it: who approves what, based on which conditions, codified in the system instead of in someone's head. Your approval history from the old process should be archived somewhere accessible (auditors may ask about pre-cutover transactions), but don't try to import it into the new system. Old spreadsheet records are evidence of the old process, not seed data for the new one.

What you should actively leave behind: the workarounds. The email forwards, the "just approve it" text messages, the verbal sign-offs that get logged after the fact. If someone still needs a workaround after migration, that tells you the routing logic has a gap. Same goes for any complex saved searches, custom records, or scripted patches you built to make NetSuite's standard approval workflow behave. Don't replicate those. They were fixes for a system that didn't fit. You're replacing the system.

## Step 5: Run Parallel for a Period

The cleanest migration approach is a parallel run. For two to four weeks, process approvals through both the old method and the new workflow. It's tedious. But it catches problems that no amount of design review will surface.

You're looking for routing mismatches (did the workflow send a transaction to a different approver than the email process would have?), missing approvers who were active under the old process but aren't in the new rules, and timing differences that might signal a notification gap or an unnecessary routing step. Track exception volume too. If more than 5% of transactions need manual intervention during parallel, the routing logic needs another pass.

Some of what you find will be the new workflow correctly enforcing a policy the old process was ignoring. That's not a bug. Other findings will be legitimate gaps in your routing rules. The parallel period is cheap insurance for telling the difference.

After parallel, cut over completely. Don't leave the old process running "just in case." Within a month, people will be emailing approvals alongside the workflow, and you'll have two systems of record that disagree with each other.

## Step 6: Close the Evidence Gap from Day One

On the day you flip the switch, your new workflow becomes the system of record for approval controls. A lot of teams treat audit evidence as a problem they'll solve once the workflow is stable. That's backwards. If the first month of transactions flows through a workflow that doesn't capture complete evidence, you've created a new [audit prep problem](/resources/03-real-cost-audit-prep/) to replace the old one.

From the first transaction, you need: the complete approval chain (who, when, in what order), the routing trigger (which rule fired and why), the transaction state at each approval step, and any exceptions with documented reasons. Delegations, SoD conflicts, overrides. All of it.

If your workflow tool doesn't capture this automatically, you'll end up rebuilding the spreadsheet in a new format. The [red flags your auditor looks for](/resources/5-red-flags-approval-workflow/) don't go away because you moved to a workflow. They go away because the workflow produces evidence the email chain never could.

## The Hard Part Isn't Technical

Most teams overthink the system and underthink the inventory. The real work is Step 1: sitting down with AP and documenting how approvals actually move through your organization today. Once that's honest and complete, the routing logic almost writes itself.

Greenlight was built for this transition. It maps routing rules to your approval policy, captures immutable evidence from the first transaction, and handles the compliance requirements that email chains can't: [segregation of duties](/resources/11-netsuite-segregation-of-duties/), [delegation with audit trails](/resources/04-delegation-vacation-problem/), [re-evaluation when transactions change after approval](/resources/01-approval-re-evaluation/), and [email approvals with enough context to actually make a decision](/resources/10-netsuite-email-approvals/).

---

**Ready to replace the spreadsheet?** Greenlight migrates your approval process into NetSuite with full audit trails from day one. No scripting, no consultants, no six-month implementation. [See the migration path in a 30-minute walkthrough →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
