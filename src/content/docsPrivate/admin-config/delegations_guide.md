---
title: "Delegations Guide"
description: "How to configure, manage, and audit approval delegations in Greenlight Approvals."
section: "Administration"
order: 90
---

Delegations allow approvers to temporarily assign their approval authority to another user.  
This is useful for covering vacations, leaves of absence, role transitions, and shared responsibilities.

This guide explains how to configure delegations, how they affect approval workflows, and how Greenlight enforces compliance rules around delegation usage.

## 1. Overview

Delegations enable one user (the **delegator**) to transfer approval responsibilities to another user (the **delegate**) for a defined period of time.

Greenlight supports:
- Date-bound delegations  
- Exclusive or non-exclusive delegation modes  
- Automatic reassignment of approval steps  
- Full audit logging of delegated actions  

Delegations apply across all rules unless limited by SoD or step conditions.

## 2. Creating a Delegation

Delegations are created from:

**Navigation:**  
**Approvals → Delegations → New**

### 2.1 Required Fields

**Fields**
- **Delegator** – User assigning approval authority.  
- **Delegate** – User receiving delegated authority.  
- **Start Date** – Delegation becomes active on this date.  
- **End Date** – Delegation ends on this date.  
- **Active** – Enables or disables the delegation.  

### 2.2 Optional Fields

**Fields**
- **Exclusive Mode** – If enabled, only the delegate may approve.  
- **Notes** – Optional explanation for audit trail.

### 2.3 Behavior

**Behavior**
- Delegations apply automatically during the active period.  
- Delegator may still approve unless **Exclusive Mode** is enabled.  
- Greenlight logs delegated approvals in Approval Logs and the Audit Package.

## 3. Delegation Evaluation Logic

Greenlight evaluates delegations whenever a step is assigned or acted upon.

### 3.1 Active Delegation Check

**Behavior**
- Greenlight checks if a valid delegation exists for the approver.  
- Delegations are time-bound using Start/End dates.  
- Multiple delegations are allowed but evaluated independently.

### 3.2 Exclusive Mode Behavior

**Behavior**
- If Exclusive Mode is enabled, only the delegate may approve.  
- Delegator is prevented from approving steps during the delegation period.

### 3.3 Standard Mode Behavior

**Behavior**
- Both the delegator and delegate may approve.  
- Approval Drawer displays a note indicating delegated authority.  
- Both users' identities appear in logs for audit transparency.

## 4. Delegations & SoD (Segregation of Duties)

Greenlight includes delegation-aware SoD checks.

### 4.1 Delegation Conflicts

**Behavior**
- Delegates inheriting conflicting responsibilities may trigger SoD warnings.  
- Enterprise tier enforces these conflicts and may block step assignment.  
- Warnings appear in the Approval Drawer and approval logs.

### 4.2 Enterprise Enforcement

**Behavior**
- Delegation cannot override SoD enforcement rules.  
- Delegates cannot bypass self-approval restrictions.  
- Duplicate approval rules still apply.

## 5. Delegations in the Approval Drawer

Delegation status is clearly visible to approvers.

### 5.1 Drawer Indicators

**Behavior**
- Drawer displays “Acting as Delegate for [User]” when applicable.  
- Step assignment section shows the original approver and delegate.  
- Timeline logs list approval method as “Delegated Approval”.

### 5.2 Comment Behavior

**Behavior**
- Delegated approvals may include comments.  
- Comments contain both the delegator and delegate for clarity.

## 6. Delegation Logs & Audit Package

Greenlight tracks all delegated activity.

### 6.1 Logging Behavior

**Behavior**
- Delegated approvals generate log entries with:
  - Delegator  
  - Delegate  
  - Timestamp  
  - Step  
  - Action  
  - Notes  

### 6.2 Audit Package Behavior

**Behavior**
- Delegation logs included in Audit Package CSV exports.  
- Enterprise includes extended context for conflict detection.  
- Delegation logs appear alongside approval and exception logs.

## 7. Troubleshooting Delegation Issues

### Common Issues

**Delegation Not Applying**
- Delegation inactive or outside date range  
- Step-level SoD rules blocking delegation  
- Delegate has insufficient NetSuite permissions  

**Delegate Cannot Approve**
- Exclusive Mode disabled → delegator may still approve  
- Delegation expired  
- Delegate’s role missing access to transaction or Drawer  

**Wrong Approver Receiving Step**
- A more specific delegation applies  
- Delegation precedence based on date ranges and exclusivity  

## 8. Related Documentation

- **Approval Steps Guide**  
- **Segregation of Duties (SoD) Guide**  
- **Audit Package Guide**  
- **Approval Drawer Guide**
