---
title: "Segregation of Duties (SoD) Guide"
description: "How Greenlight detects and enforces Segregation of Duties (SoD) policies during approval workflows."
section: "Administration"
order: 6
---

Segregation of Duties (SoD) protects financial processes by preventing users from performing conflicting actions, such as creating and approving the same transaction.  
Greenlight includes built‑in SoD detection (Pro) and enforcement controls (Enterprise).

This guide explains every SoD setting, how SoD checks are evaluated, and how violations impact approval steps.

## 1. Overview

Greenlight’s SoD engine enforces a core financial control: **no user should be responsible for both creating and approving the same transaction** unless explicitly allowed.

SoD evaluates:
- The transaction creator  
- Assigned approver  
- Prior approvals on the same transaction  
- Delegation relationships  
- Rule and step configuration  

The SoD engine runs during rule evaluation, step assignment, and final approval.

## 2. Tier Behavior

SoD functionality differs by license tier.

### 2.1 Tier Summary

**Tier Behavior**
- **Core** – No SoD detection or enforcement.  
- **Pro** – SoD detection + warnings (no enforcement).  
- **Enterprise** – Full SoD enforcement with configurable policies.

### 2.2 What Pro Includes

**Behavior**
- Self‑approval warnings  
- Duplicate approval warnings  
- Violations highlighted in the Approval Drawer  
- Logged in Approval Instance

### 2.3 What Enterprise Adds

**Behavior**
- Enforced blocking (step cannot proceed)  
- Auto‑skipping of invalid steps  
- Customizable violation policies  
- Delegation checks  

## 3. SoD Settings

SoD is configured in **Approvals → Settings**.

### 3.1 SoD Configuration Fields

**Fields**
- **Enable SoD** – Activates SoD policy engine.  
- **SoD Mode** – Disable / Warn / Enforce (based on tier).  
- **Allow Self‑Approval** – Overrides self‑approval detection.  
- **Allow Duplicate Approval** – Allows the same approver on multiple steps.  
- **On Violation** – Warn / Enforce / Skip (Enterprise only).  
- **Notification Group** – Recipients for SoD alerts.

### 3.2 Behavior

**Behavior**
- SoD Mode controls global behavior.  
- Step‑level SoD fields can override global settings.  
- Enterprise policies apply at both rule and step level.

## 4. SoD Violation Types

Greenlight detects multiple forms of SoD risk.

### 4.1 Self‑Approval

Occurs when:
- The creator is assigned as the approver for a step, AND  
- Self‑approval is not allowed.

**Behavior**
- Pro: Warns user but allows approval.  
- Enterprise: Blocks the step or skips based on policy.

### 4.2 Duplicate Approvals

Occurs when:
- The same user approves multiple steps in the same workflow.

**Behavior**
- Pro: Warns only.  
- Enterprise: Enforce/skip policies apply.

### 4.3 Delegation Conflicts

Occurs when:
- A delegated approver is allowed to approve on behalf of a restricted user.

**Behavior**
- Enterprise enforces delegation SoD rules.  
- Pro logs the conflict only.

### 4.4 Cross‑Role Conflicts

If approval roles violate internal policies (e.g., AP Clerk approving high‑value steps).

**Behavior**
- Enterprise only.  
- Controlled via custom rule configuration.

## 5. Evaluation Lifecycle

SoD checks occur at multiple stages of the workflow.

### 5.1 During Step Assignment

**Behavior**
- Step’s assigned approver is evaluated against creator and prior actors.  
- If violation occurs:
  - Pro: User sees a warning.  
  - Enterprise: Step may block or skip.

### 5.2 During Approval Attempt

**Behavior**
- When an approver attempts to approve, Greenlight re-evaluates SoD.  
- Violations appear in:
  - Approval Drawer  
  - Approval logs  
  - Audit package  

### 5.3 During Re‑Evaluation

**Behavior**
- If rules change after editing the transaction, SoD is rechecked.  
- Prevents bypass via transaction edits.

## 6. Step-Level SoD Controls

Step-specific SoD options override global settings.

### 6.1 Step Controls

**Fields**
- **Allow Self‑Approval (Step)**  
- **Allow Duplicate Approval (Step)**  
- **On Violation (Step)** – Warn / Enforce / Skip  

### 6.2 Behavior

**Behavior**
- Step rules override global settings.  
- Enterprise steps may skip automatically if configured.  
- Violations always appear in logs.

## 7. SoD in the Approval Drawer

The drawer provides real‑time feedback.

### 7.1 Drawer Indicators

**Behavior**
- SoD warnings or errors appear at the top of the **Details** tab.  
- Violating steps include red highlight or icons.  
- Approvers see contextual notes explaining the violation.

### 7.2 Drawer Limitations

**Behavior**
- The Drawer displays SoD results but cannot override enforcement.  
- Approvers may not bypass SoD in Enterprise mode.

## 8. Violations in Logs & Audit Package

SoD violations are tracked for audit and compliance.

### 8.1 Logging Behavior

**Behavior**
- Violations recorded as log entries.  
- Includes user, step, violation type, timestamp.  
- Reported in audit exports.

### 8.2 Audit Package Integration

**Behavior**
- All SoD-related logs included in the CSV export.  
- Enterprise packages highlight SoD enforcement history.

## 9. Troubleshooting SoD Issues

### Common Issues

**Step Blocked Unexpectedly**
- Enterprise enforcement active  
- Step-level SoD overrides global settings  

**Warnings Not Appearing**
- SoD disabled or in “Disable” mode  
- User role missing permission to view drawer warnings  

**Delegation Conflicts Not Detected**
- Delegation record missing or expired  
- Incorrect configuration in Settings  

## 10. Related Documentation

- **Approval Steps Guide**  
- **Approval Rules Guide**  
- **Settings Guide**  
- **Approval Drawer Guide**  
- **Audit Package Guide**