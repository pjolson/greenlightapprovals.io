---
title: "Multi-Subsidiary NetSuite Approval Workflows (OneWorld)"
description: "One approval rule per subsidiary. Copy it ten times. Pray nobody changes one without updating the rest. There's a better way to handle multi-sub approvals in NetSuite."
pubDate: 2026-05-19
tags: ["approvals", "NetSuite", "multi-subsidiary", "OneWorld", "approval workflow"]
featured: true
---

The first subsidiary is easy. You build an approval rule for purchase orders. Manager approves up to $5,000, director up to $25,000, VP of Finance above that. It works. Transactions route correctly, approvers know what to do, and the audit trail is clean.

Then you add a second subsidiary. Different country, different currency, different department structure. The same approval logic should apply, but the people are different. The thresholds might convert awkwardly across currencies. The departments don't map one-to-one.

If you're using SuiteApprovals, you copy the rule. You adjust the subsidiary field, swap out the approvers, and save. Two rules that do roughly the same thing.

By the time you have ten subsidiaries, you have ten copies. Somebody updates a threshold on six of them and forgets the other four. Nobody notices for two months because those subsidiaries have lower transaction volume. When the auditor pulls the approval matrix, it doesn't match across entities. You spend a week reconciling.

This is the normal state of multi-subsidiary approvals in NetSuite. Not broken in a dramatic way. Broken in the way that creates slow, expensive cleanup later.

## Why One Rule Per Subsidiary Is the Default

SuiteApprovals, NetSuite's native approval SuiteApp, accepts a single subsidiary value per rule. That's a design constraint, not a configuration choice. If you need the same routing logic for ten subsidiaries, you create ten rules.

Oracle even provides a "Make Copy" function for this exact purpose. The assumption is that you will duplicate.

This means every change to approval logic has to be repeated N times, where N is the number of subsidiaries the rule applies to. An updated threshold, a new approver, a changed department filter. Each one is a manual edit across every copy. The rules can't be linked or synced. They're independent records that happen to look similar.

SuiteApprovals also limits you to two approval templates: "all levels of approval" (sequential through every level) or "one level based on approver's limit." There's no conditional branching within a rule. If your US entity needs two approval levels but your UK entity needs three because of a local tax review, that's two completely different rule structures.

## SuiteFlow Doesn't Scale Either

The alternative is building approval workflows in SuiteFlow. You get more flexibility with conditions and transitions, but the multi-subsidiary problem just shows up in a different form.

SuiteFlow workflows are account-level objects. They fire on every transaction of that record type across all subsidiaries. To route differently by subsidiary, you add conditions: if Subsidiary = US, transition to State A. If Subsidiary = UK, transition to State B.

One NetSuite admin documented maintaining 26 separate "if subsidiary equals X" entries within a single workflow. Every time the organization added a subsidiary, every workflow that referenced subsidiary logic needed a new branch. Miss one and the transaction either routes incorrectly or falls through with no approval at all. That kind of gap can go unnoticed for weeks in a lower-volume entity.

The workaround that experienced consultants recommend is adding a custom field to the subsidiary record itself (something like "Approval Region" or "Brand Group"), then referencing that field in the workflow condition instead of hard-coding subsidiary IDs. One condition replaces twenty-six. It's a good pattern, but it's still custom development that somebody has to build, test, and maintain.

## The Problems That Compound at Scale

Individual annoyances at three subsidiaries become structural risks at ten or twenty.

**Approver access.** NetSuite restricts role access by subsidiary. An approver can only act on transactions from subsidiaries their role is authorized to see. If a VP needs to approve POs across five entities, their role must explicitly grant access to all five. This often means creating custom roles specifically for cross-subsidiary approvers, which introduces its own maintenance burden and security considerations.

**Currency thresholds.** A $5,000 approval threshold means different things in USD, EUR, and GBP. NetSuite converts transaction amounts to the employee's currency when comparing against approval limits, but this creates confusion when the same dollar-amount rule behaves inconsistently across entities with different base currencies.

**Intercompany transactions.** Intercompany journals, purchase orders, and inventory transfers create records touching two subsidiaries. There's no native intercompany-specific approval tool. If an intercompany PO needs sign-off from both the originating and receiving entity's finance team, you're building that logic from scratch.

**Transactions that bypass approvals entirely.** SuiteApprovals does not route transactions created via CSV import, SuiteScript, web services, or RESTlets. In multi-subsidiary environments where integrations feed transactions into NetSuite automatically, those records skip the approval workflow entirely. This is a documented limitation, and it's one that grows more dangerous as organizations scale and lean more heavily on integrations.

**Voided transactions get stuck.** When a transaction under SuiteApprovals is voided, it stays in "Pending Approval" status indefinitely. The approve and reject buttons are removed from the record. Approvers who try to act via email get an "Approval Action Denied" response. These records pile up in approval queues and create noise that makes it harder for approvers to focus on the transactions that actually need attention.

**One inactive approver blocks everything downstream.** An employee leaves the company, their NetSuite access is disabled, and suddenly every pending transaction in their approval queue is frozen. At scale across thirty subsidiaries, a single inactive approver can hold up hundreds of records. Finding and reassigning those approvals is a manual process.

## What Multi-Subsidiary Approval Rules Should Look Like

The problem isn't that NetSuite can't handle multiple subsidiaries. OneWorld is designed for it. The problem is that the approval tools built on top of OneWorld treat each subsidiary as an isolated unit.

A rule that routes purchase orders over $10,000 to the department head should be one rule that applies across whichever subsidiaries you select. The routing logic is the same. The approver resolution should be dynamic, pulling the right person based on the transaction's subsidiary and department at the time of submission.

That means:

- **Multi-select on subsidiary.** One rule, many entities. Change the threshold once, it applies everywhere.
- **Dynamic approver resolution.** The system finds the right approver based on the transaction's context, not a hard-coded name on the rule. Department head for the purchasing department in the UK subsidiary is a different person than the department head for purchasing in the US subsidiary. The rule shouldn't care. It should resolve the right person at runtime.
- **Subsidiary as a routing dimension, not a rule boundary.** Subsidiary should be one of many criteria that determine whether a rule matches a transaction, alongside department, class, location, amount, and custom segments. Not the container that the entire rule lives inside.
- **Consistent enforcement regardless of transaction source.** Whether a PO is entered manually, uploaded via CSV, or created through an integration, the same approval rules should fire. The entry method shouldn't determine whether controls apply.

## How Greenlight Handles Multi-Subsidiary Approvals

Greenlight's approval rules support multiple subsidiaries on a single rule. You select the subsidiaries the rule applies to. If the transaction's subsidiary matches any of them, the rule evaluates.

Subsidiary is one of ten custom segment slots on the rule record, sitting alongside department, class, location, and five configurable custom criteria fields. All of these are matching dimensions. A single rule can say: this applies to purchase orders, in these three subsidiaries, for these departments, above this amount. One rule covers what would take three or more copies in SuiteApprovals.

Approver resolution is dynamic. When a rule matches a transaction, Greenlight evaluates each step at submission time. Steps support eight approver types, including role-based and group-based assignment. The system resolves the actual approver based on the transaction's subsidiary context. The department head in your UK subsidiary is different from the department head in the US subsidiary, and the step handles that without separate configuration.

Because Greenlight is a SuiteApp running on SuiteScript, it fires via User Event scripts on the transaction record. That means it evaluates regardless of how the transaction was created. Manual entry, CSV import, RESTlet, integration. The same rules apply. There's no silent bypass for scripted transactions.

When rules change, the change happens once. Update a threshold, add a step, swap an approver type. Every subsidiary attached to that rule picks up the change immediately. No copying, no syncing, no hoping somebody remembered to update all ten versions.

Budget enforcement works across subsidiaries too. Each approval shows the transaction's impact against the relevant budget for that subsidiary, department, and account combination. Approvers see budget vs. actual for the specific entity they're approving, not a consolidated number that obscures where the spend is actually hitting.

The audit trail captures the rule that matched, the step that resolved, the approver who acted, and the subsidiary context for the transaction. One search, one export, full coverage across entities. No stitching together separate approval histories from different subsidiary-scoped rules.

## The Maintenance Test

Here's a practical way to evaluate your current setup. Count the number of approval rules or workflow branches you maintain. Divide by the number of subsidiaries. If the ratio is close to 1:1, your approval logic is duplicated per entity and every future change carries a multiplication tax.

Then ask: if you added a subsidiary tomorrow, how many rules, workflows, roles, and saved searches would you need to create or update? If the answer involves a checklist longer than a few items, the architecture is going to resist growth.

Multi-subsidiary approval workflows don't need to be complicated. They need to be consolidated. One rule, many entities, dynamic resolution, consistent enforcement. The subsidiaries are different. The controls shouldn't be.

---

If your approval rules are duplicated across every subsidiary, you already know the maintenance cost. Greenlight consolidates multi-subsidiary routing into single rules with dynamic approver resolution and consistent enforcement regardless of how the transaction was created. [See how it works in a walkthrough.](https://meetings-eu1.hubspot.com/patrick-olson?uuid=bfd45059-ae2d-4014-b832-419301f042e9)
