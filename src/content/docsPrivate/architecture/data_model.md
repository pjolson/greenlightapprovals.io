---
title: "Data Model Reference"
description: "Detailed reference of all Greenlight custom record types, fields, and relationships."
section: "Architecture"
order: 2
---

The Greenlight data model is built around a set of custom records that track approval rules, steps, workflow instances, logs, queues, and configuration.  
This reference provides a complete overview of each record and its fields, along with how records relate to one another.

## 1. Overview

Greenlight uses the following record groups:
- **Configuration Records** (Settings, Report Settings)  
- **Workflow Definition Records** (Approval Rule, Approval Step)  
- **Workflow Runtime Records** (Approval Instance, Approval Log)  
- **Delegation Records**  
- **Queue Records**  
- **Audit Export Records**

These records form the backbone of Greenlight’s workflow engine and audit trail.

## 2. Configuration Records

### 2.1 Settings

**Fields**
- Enable Budget Intelligence  
- Enable AI Insights  
- Enable SoD  
- SoD Mode  
- Line-item field lists  
- Segment configuration (1–10)  
- Drawer visibility settings  
- Email template settings  

**Behavior**
- Controls global system behavior.  
- Impact applies immediately after saving.

### 2.2 Report Settings

**Fields**
- SLA thresholds  
- Late / very late hours  
- Critical amount  
- Aging bucket values  
- Performance scoring thresholds  

**Behavior**
- Used by dashboards, exceptions, and SLA calculations.

## 3. Workflow Definition Records

### 3.1 Approval Rule

**Fields**
- Name  
- Active  
- Transaction type  
- Subsidiary / Department / Class / Location  
- Amount range  
- Custom segments  
- Effective dates  

**Behavior**
- Defines when a workflow applies.  
- Drives instance creation.

### 3.2 Approval Step

**Fields**
- Step number  
- Approver (employee, role, group, dynamic)  
- Step conditions  
- Escalation settings  
- SoD overrides  
- Fallback approver  

**Behavior**
- Defines the sequence of approvers for the workflow.

## 4. Workflow Runtime Records

### 4.1 Approval Instance

**Fields**
- Transaction ID  
- Rule ID  
- Current step  
- Status  
- Approver assignments  
- Snapshot fields (amounts, classifications, vendor)  
- Start / end timestamps  

**Behavior**
- Tracks approval lifecycle.  
- Single instance per transaction submission.

### 4.2 Approval Log

**Fields**
- Instance ID  
- Step ID  
- User  
- Action (Approve/Reject/Skip)  
- Timestamp  
- Comments  
- Exceptions  
- Delegation info  
- SoD violations  

**Behavior**
- Provides full audit trail.

## 5. Delegation Records

### 5.1 Delegation

**Fields**
- Delegator  
- Delegate  
- Start date  
- End date  
- Exclusive mode  
- Notes  

**Behavior**
- Used for delegated approval actions.  

## 6. Queue Records

### 6.1 Approval Queue

**Fields**
- Instance  
- Step  
- User  
- Action (Approve/Reject)  
- Status  
- Timestamp  

**Behavior**
- Processes Drawer-based approvals.

### 6.2 Email Approval Queue

**Fields**
- Token  
- User  
- Action  
- Instance  
- Step  
- Status  

**Behavior**
- Processes email-based approvals using HMAC validation.

## 7. Audit Export Records

### 7.1 Audit Export Item

**Fields**
- CSV type  
- Output context  
- Included fields  
- Status  

**Behavior**
- Controls which datasets appear in the Audit Package.

## 8. Record Relationships

### 8.1 Rule → Step

**Behavior**
- One rule has many steps.  
- Steps inherit rule criteria unless overridden.

### 8.2 Instance → Log

**Behavior**
- One instance has many logs.  
- Logs store a complete timeline.

### 8.3 Instance → Queue Items

**Behavior**
- Each queue item links to an instance and step.  
- Approval Queue and Email Queue independently process actions.

### 8.4 Delegation → Approvals

**Behavior**
- Delegations override approver identity when active.  
- Logged in Approval Log for audit trail.

## 9. Data Model Diagram (Text)

**Nodes**
- Rule  
- Step  
- Instance  
- Log  
- Queue Item  
- Delegation  
- Settings  
- Report Settings  
- Audit Export Item  

**Edges**
- Rule → Step  
- Rule → Instance (via match)  
- Instance → Log  
- Instance → Queue Item  
- Step → Instance (sequence)  
- Delegation → Instance/Log (context)  

## 10. Related Documentation

- **Technical Architecture Overview**  
- **Script Architecture Reference**  
- **Queue Architecture Guide**  
- **Workflow Behavior & Lifecycle**  
- **Approval Steps Guide**
---

