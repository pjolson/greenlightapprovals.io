---
title: "NetSuite Intercompany Transaction Approvals: The Two-Sided Problem"
description: "An intercompany transaction hits two sets of books, but NetSuite approval routing only knows about one subsidiary. Here's why intercompany journals, transfers, and charges slip through approval, and what dual-sided routing should look like."
pubDate: 2026-06-21
tags: ["NetSuite", "intercompany", "approval workflows", "OneWorld", "multi-subsidiary", "month-end close", "transfer pricing"]
featured: true
---

A controller in the US entity books an intercompany charge to the UK entity for shared services. It's a routine allocation, a number she's posted every month for a year. She approves her own journal, it posts, and she moves on.

Two weeks later the UK controller is closing his books and finds a due-to balance he didn't expect. Nobody told him the charge was coming. He didn't agree to the amount, the cost driver, or the timing. Now the two entities disagree about a number that has to net to zero at consolidation, and reconciling it eats the first three days of close.

Nothing broke. The transaction routed the way NetSuite was configured to route it. An intercompany transaction affects two subsidiaries, and the approval only ran through one.

## Why Intercompany Is Different

Most approval thinking assumes a transaction belongs to one entity. A purchase order is the US subsidiary's purchase order. A vendor bill is the German subsidiary's bill. One owner, one approval chain, one set of books.

Intercompany breaks that assumption. An intercompany journal entry, an inventory transfer between warehouses in different subsidiaries, an allocation of shared cost, an intercompany sale and the matching purchase, all of these touch two entities at once. Each side carries a due-to or due-from balance that has to match the other, because at consolidation the pair eliminates. If the two sides don't agree, the elimination doesn't clean up, and the difference shows up as a reconciling item that someone has to chase.

So the real approval question isn't only whether the transaction should happen. It's whether both entities agree it should happen, at this amount, in this period. Native NetSuite routing only puts that question to one of them.

## Where Native NetSuite Falls Short

NetSuite OneWorld handles the mechanics of intercompany well enough. Advanced Intercompany Journal Entries let one journal post lines across multiple subsidiaries. The Intercompany Framework can auto-generate the matching side of a transaction and net balances. The accounting itself works.

The approval layer is weaker.

SuiteApprovals routes on a transaction's primary subsidiary. An intercompany journal has a subsidiary field, the approval rule reads it, and the transaction goes to that entity's approver. The counterparty subsidiary, the one that ends up with the offsetting balance, has no native gate in that flow. Its finance team finds out when the balance appears, after it has posted. This is the same single-subsidiary constraint that makes [routing the same logic across many entities so painful](/resources/13-multi-subsidiary-approval-workflows/). Here it doesn't just duplicate rules, it leaves the receiving entity with no approval at all.

A few specific gaps come up repeatedly:

**Self-approval on intercompany journals.** The person who posts the allocation is often the same person with rights to approve it. Native tooling rarely forces an independent reviewer, and intercompany is a related-party area, the kind of thing [segregation of duties controls](/resources/11-netsuite-segregation-of-duties/) exist to cover. When an auditor asks who reviewed the entry, "the person who booked it" is the answer that draws a follow-up.

**No counterparty sign-off.** There's no native concept of "both the sending and receiving entity must approve." You can route to the originating subsidiary or the receiving subsidiary, but expressing "both, in sequence" means building it yourself in SuiteFlow with custom conditions that read the intercompany subsidiary field.

**Transfer pricing goes unreviewed.** Intercompany charges often carry a markup for tax and transfer-pricing reasons. The markup has real consequences with tax authorities, but nobody approves the rate. The journal posts at whatever the template says, and the review, if it happens, happens at year end when the transfer-pricing study is being assembled.

**Scripted and imported intercompany transactions skip approval.** A lot of intercompany volume is generated rather than keyed by hand, through allocation scripts, CSV uploads, scheduled journals, and integrations. SuiteApprovals does not route transactions created by CSV import, SuiteScript, or web services, so the highest-volume intercompany entries are often the ones with no approval at all.

## What the Close Pays for It

The cost of all this lands at month and quarter end.

Unreconciled intercompany is one of the most common reasons a close runs long. When the two sides of an intercompany pair don't match, the consolidation doesn't eliminate cleanly, and finance spends days tracing differences back to a journal that one entity posted and the other never saw. Every one of those is the same [approval bottleneck that drags out the close](/resources/16-approval-bottlenecks-quarter-end-close/): a transaction that needed agreement, didn't get it, and now needs cleanup under deadline.

The pattern repeats every period because the control gap is structural. As long as one entity can commit the other entity to a balance without that entity approving it, the mismatches keep getting created, and the close keeps absorbing them.

## What Two-Sided Approval Should Look Like

The fix is to treat the counterparty as a required approver, not a downstream surprise.

- **Both entities in the chain.** An intercompany transaction over a threshold should route to an approver in the originating subsidiary and an approver in the receiving subsidiary before it posts. Sequential, so the receiving side sees the amount and the cost driver and can decline before a balance lands on its books.
- **The counterparty resolved dynamically.** The rule shouldn't hard-code who the UK approver is. It should read the transaction's intercompany subsidiary and resolve the right person for that entity at submission time, the same way department-head routing resolves the right head per subsidiary.
- **Intercompany as a matching dimension.** Whether a transaction is intercompany, and which two entities it spans, should be criteria the rule can match on, alongside amount and transaction type. A rule should be able to say: intercompany journals between these entities, above this amount, route through both controllers.
- **Enforcement regardless of source.** If the entry came from an allocation script or a CSV upload, the same dual-sided rule should fire. The entry method shouldn't decide whether the counterparty gets a vote.
- **One audit trail covering both sides.** When the auditor asks who approved the intercompany charge, the answer should be a single record showing both entities signed off, with timestamps, not two separate histories stitched together by hand.

## How Greenlight Handles It

Greenlight evaluates approval rules through User Event scripts on the transaction, so it fires on intercompany journals, transfers, and charges no matter how they were created, including the scripted allocations and CSV imports that native approvals skip.

Because subsidiary is one of ten matching segments on a rule and sits alongside five configurable custom criteria, a single rule can target intercompany transactions specifically and branch on the entities involved. The steps within that rule run in sequence, and each step resolves its approver dynamically from the transaction's context, so one step can route to the originating entity's controller and the next to the receiving entity's, with each person resolved per subsidiary rather than named on the rule.

Segregation-of-duties enforcement covers the self-approval case directly. If the person who posted the intercompany journal is also in the approval chain, Greenlight can warn, block, or notify depending on how strict you set it, so the related-party review the auditor expects actually happens.

Budget enforcement reads per subsidiary, so the receiving entity's approver sees the charge against that entity's budget rather than a consolidated number that hides where the cost is really landing. Every approval lands in an immutable log with the rule that matched, both steps that resolved, and the subsidiary context for each side. One search returns the full two-sided history, which is what you hand over when an auditor questions an intercompany balance.

---

**An intercompany transaction commits two entities, so one of them shouldn't be able to approve it alone.** Greenlight routes intercompany journals, transfers, and charges through both the originating and receiving subsidiary, enforces separation of duties on the people who post them, and logs both approvals in one auditable record. [See two-sided intercompany routing in a 30-minute walkthrough →](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
