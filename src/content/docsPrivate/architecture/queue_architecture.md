---
title: "Queue Architecture Guide"
description: "How approval and email actions are processed asynchronously using Greenlight’s queue-based workflow architecture."
section: "Architecture"
order: 5
---

Greenlight’s queue architecture ensures that approval actions are processed reliably, consistently, and without impacting NetSuite governance limits.  
This guide explains the two primary queue systems—the Approval Queue and Email Approval Queue—and how they interact with the workflow engine.

## 1. Overview

Greenlight uses asynchronous queue processing to:
- Prevent governance overages  
- Allow safe retry on transient failures  
- Support email approvals via public Suitelet  
- Decouple user actions from workflow state changes  
- Maintain auditability  

Two queues operate independently:

- **Approval Queue** – Processes Drawer-based actions  
- **Email Approval Queue** – Processes email link actions  

Both are processed by scheduled scripts.

## 2. Approval Queue

The Approval Queue handles actions taken inside the Approval Drawer.

### 2.1 Queue Record Structure

**Fields**
- Instance  
- Step  
- User  
- Action (Approve/Reject)  
- Timestamp  
- Status (Pending, Processing, Complete, Error)  
- Error message (if applicable)

### 2.2 Queue Item Creation

**Behavior**
- Created when a user clicks Approve or Reject in the Drawer  
- Contains only essential references (instance, step, user, action)  
- Lightweight design avoids heavy governance inside Suitelets  

### 2.3 Processing Logic

**Behavior**
- Scheduled script processes items in FIFO order  
- Validates user permissions  
- Applies SoD checks  
- Updates step state  
- Writes log entry  
- Advances workflow  
- Marks queue item Complete  

### 2.4 Error Handling

**Behavior**
- On error, item moves to Error state  
- System retries on next cycle if failure is transient  
- Errors logged in Approval Logs and Exception system  

## 3. Email Approval Queue

The Email Queue processes actions submitted via secure approval links.

### 3.1 Queue Record Structure

**Fields**
- Token  
- Instance  
- Step  
- User  
- Action  
- Timestamp  
- Validation status  
- Status  

### 3.2 Token Validation

**Behavior**
- Email links include HMAC-secured tokens  
- Suitelet validates token before creating queue item  
- Prevents modification or replay  
- Expired tokens are rejected  

### 3.3 Processing Logic

**Behavior**
- Scheduled script validates token again  
- Applies action to workflow  
- Writes log with “Email Approval” method  
- Advances workflow as normal  

### 3.4 Error Handling

**Behavior**
- Invalid tokens produce user-readable errors  
- Queue items with failed validation are discarded  
- Exceptions logged accordingly  

## 4. Queue Interaction with Workflow Engine

Both queues interact closely with the workflow and rule engines.

### 4.1 Workflow Updates

**Behavior**
- Queue scripts update Approval Instances  
- Step progression triggered after each queue action  
- Re-evaluation triggered if enabled  

### 4.2 Drawer Refresh

**Behavior**
- Drawer reloads data after queue completes processing  
- Timeline and status update automatically  

### 4.3 Escalation Engine Interaction

**Behavior**
- Escalations run separately  
- Can assign new approver if queue-driven step becomes overdue  

## 5. Retry & Fault Tolerance

Greenlight uses built-in retry logic for resilience.

### 5.1 Retry Logic

**Behavior**
- Queue items retried when errors appear temporary  
- Permanent failures marked with Error status  

### 5.2 Fault Tolerance

**Behavior**
- Queue isolation ensures one failure doesn't halt entire system  
- Email queue separate from approval queue limits blast radius  

## 6. Governance Optimization

### 6.1 Lightweight Queue Items

**Behavior**
- Queue records store minimal context  
- Heavy operations deferred to scheduled scripts  

### 6.2 Scheduled Script Efficiency

**Behavior**
- Batches queue items  
- Uses SuiteQL for efficient reads  
- Commits work regularly to avoid timeouts  

## 7. Troubleshooting Queue Issues

### Common Issues

**Approval Stuck in Pending**
- Approval Queue script not running  
- Workflow exception blocking progression  
- Invalid approver (assignment failure)  

**Email Approvals Not Processing**
- Email Queue script disabled  
- Token expired or invalid  

**Queue Items Accumulating**
- Governance-heavy transactions  
- Invalid configuration blocking items  
- Errors blocking progression  

## 8. Related Documentation

- **Workflow Behavior & Lifecycle**  
- **Script Architecture Reference**  
- **Data Model Reference**  
- **Email Approval System Guide**
