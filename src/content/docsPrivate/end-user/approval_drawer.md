---
title: "Using the Approval Drawer"
description: "How users interact with the Greenlight Approval Drawer to review, approve, reject, and understand approval workflow context."
section: "Users"
order: 3
---

The Approval Drawer is the primary interface for approvers, submitters, and reviewers to interact with Greenlight.  
It displays full workflow context, history, exceptions, and action buttons directly inside the transaction record.

This guide explains each section of the drawer and how users can navigate through approval details.

## 1. Overview

The Approval Drawer appears on the right side of supported transaction types and provides:

- Access to all approval context  
- Approve and Reject actions  
- Timeline and comments  
- Budget insight (Pro & Enterprise)  
- AI Insights (Pro limited, Enterprise full)  
- Exceptions and SoD warnings  
- Delegation indicators  

The Drawer loads automatically when a user with appropriate access views a transaction.

## 2. Opening the Drawer

The Drawer loads when a user opens an eligible transaction.

**Behavior**
- The Drawer appears on the right and can be collapsed or expanded.  
- It refreshes automatically as steps complete or comments are added.  
- Users never need to reload the page to see updates.

If the Drawer does not appear:
- The transaction may not be configured for approval  
- The user may lack necessary permissions  
- A script deployment issue may exist  

## 3. Drawer Tabs

The Drawer organizes information into tabbed sections.  
The exact tabs available depend on license tier and configuration.

### 3.1 Details Tab

**Fields**
- Transaction header  
- Classification fields  
- Amounts  
- Step name and description  
- Current approver  
- Budget block (Pro & Enterprise)  
- AI Insights block (Pro limited, Enterprise full)  
- Exceptions and SoD warnings  

**Behavior**
- This is the primary review area before taking action.  
- Exceptions appear at the top for visibility.  

### 3.2 Timeline Tab

**Fields**
- Full step history  
- Approval and rejection actions  
- Delegated actions  
- Comments and notes  
- Escalations  

**Behavior**
- Updates in real time as actions occur.  
- Entries show method of approval (Drawer, Email, Delegate).  

### 3.3 Comments Tab

**Behavior**
- Users may leave optional comments.  
- Comments appear in the timeline and Audit Package.  
- Comments help create clarity during the approval process.  

## 4. Approving in the Drawer

Approvers may take action directly inside the Drawer.

### 4.1 Approval Action

**Behavior**
- Clicking **Approve** completes the current step.  
- The workflow advances to the next step automatically.  
- SLA metrics update and the timeline refreshes.  
- Approval comments (optional) are stored in logs.  

### 4.2 Approval Requirements

**Fields**
- User must be the assigned approver  
- SoD rules must not be violated  
- User must have access to the transaction  

Pro & Enterprise:
- Budget warnings may appear  
- AI insights provide extra context  

## 5. Rejecting in the Drawer

Users may reject a step if they are the current approver.

### 5.1 Rejection Action

**Behavior**
- Reject stops the workflow  
- Submitter is notified  
- Reject notes appear in the timeline  

### 5.2 When to Reject

**Examples**
- Incorrect vendor or amount  
- Missing documentation  
- Policy violation  
- Data inconsistencies needing revision  

## 6. Delegation Indicators

The Drawer clearly shows when a user is acting as a delegate.

### 6.1 Drawer Behavior

**Behavior**
- Banner displays: “Acting as delegate for [Delegator]”  
- Both delegator and delegate appear in logs  
- Enterprise SoD rules still apply  

## 7. Exceptions & Warnings

Exceptions provide visibility into issues affecting step assignment or workflow evaluation.

### 7.1 Types of Exceptions

**Fields**
- Assignment failures  
- SoD violations  
- Budget variance warnings  
- Queue processing errors  
- Data integrity issues  

### 7.2 Drawer Behavior

**Behavior**
- Exceptions appear at the top of the Details tab  
- Some exceptions are informational  
- Critical exceptions may block approval actions  

## 8. Budget Block (Pro & Enterprise)

The Budget Block shows real-time budget context.

### 8.1 Budget Fields

**Fields**
- Period budget  
- Actuals  
- Pending amount  
- Variance  
- Variance percentage  

### 8.2 Behavior

**Behavior**
- Color-coded (green/yellow/red) based on variance  
- Enterprise includes expanded insights  

## 9. AI Insights Block (Pro & Enterprise)

AI Insights appear at the top of the Details tab.

### 9.1 Insight Types

**Fields**
- Transaction summary  
- Vendor insights  
- Budget variance explanation  
- Historical spend insight  

### 9.2 Behavior

**Behavior**
- Read-only (no chat or conversation)  
- Pro receives summary-level insights  
- Enterprise receives deeper insights  

## 10. Troubleshooting Drawer Issues

### Common Issues

**Drawer Not Appearing**
- Permissions missing  
- Script not deployed  
- Custom form missing script ID  

**Incorrect Approver Displayed**
- Step-level condition mismatch  
- Delegation override  
- Hard-coded approver in rule  

**Budget Block Missing**
- Not enabled (Core tier)  
- Budgets missing for classification  
- Budget Intelligence disabled  

**AI Insights Missing**
- Not enabled  
- Not available in Core  

## 11. Related Documentation

- **Approver Experience Guide**  
- **Submitter Experience Guide**  
- **Email Approval System Guide**  
- **Delegations Guide**  
- **Budget Intelligence Guide**