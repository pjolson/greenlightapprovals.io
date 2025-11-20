---
title: "Budget Intelligence Overview"
description: "How Greenlight enforces budgets and alerts approvers before spend exceeds plan."
section: "Budgeting"
order: 2
---

Budget intelligence reads NetSuite budgets at submission time to warn or block transactions that would exceed plan.

Key behaviors:

1. **Pre-submit checks** run in the approval tray before users save. Warnings display variance, affected GLs, and approver escalation.
2. **Auto-routing** sends overages to CFO or budget owners when variance thresholds are crossed.
3. **Exception logging** captures reason codes and timestamps for every override, making audit exports one-click.

Configuration tips:

- Set variance thresholds by subsidiary, department, and vendor.
- Mirror routing rules to your approval matrix so overages go to the right executives.
- Enable notifications so approvers get context via email and in-tray.
