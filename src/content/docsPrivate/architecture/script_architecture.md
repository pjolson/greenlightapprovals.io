---
title: "Script Architecture Reference"
description: "Detailed reference of all SuiteScript components used by Greenlight, including client scripts, user events, Suitelets, and scheduled scripts."
section: "Architecture"
order: 3
---

This reference explains how Greenlight uses SuiteScript to power rule evaluation, approval lifecycle processing, the Approval Drawer UI, queue handling, and export functionality.  
It outlines each script type, its responsibilities, and how scripts interact across the workflow engine.

## 1. Overview

Greenlight uses a modular SuiteScript architecture consisting of:

- Client Scripts (Drawer UI)  
- User Event Scripts (rule matching + initialization)  
- Suitelets (Drawer API, Email Approval API, Audit exports)  
- Scheduled Scripts (approval queue, email queue, escalations)  
- Library Scripts (shared logic)  

Scripts communicate primarily through custom records such as Approval Instances and Queue Items.

## 2. Client Scripts (CS)

Client scripts power the interactive Approval Drawer.

### 2.1 Drawer Client Script

**Behavior**
- Renders the Approval Drawer UI  
- Loads Drawer data via Suitelet endpoint  
- Handles Approve/Reject button actions  
- Triggers UI refresh after actions  
- Displays exceptions, AI insights, and budget information  

### 2.2 Drawer Helper Script

**Behavior**
- Provides reusable UI utilities  
- Manages Drawer tab switching  
- Handles error messaging and permissions hints  

## 3. User Event Scripts (UE)

User Events perform rule evaluation and instance creation.

### 3.1 Rule Evaluation UE

**Behavior**
- Runs during create/edit/submit  
- Loads all active rules  
- Applies matching logic and specificity scoring  
- Creates an Approval Instance  
- Assigns the initial step  
- Applies SoD checks  
- Writes initial approval logs  

### 3.2 Rule/Step Audit Logging UE

**Behavior**
- Tracks changes to rules and steps  
- Logs modifications with timestamp and user  
- Supports audit and compliance reporting  

### 3.3 Settings Audit UE

**Behavior**
- Logs configuration changes to Settings  
- Captures old and new values  
- Ensures compliance with audit standards  

### 3.4 Report Settings Audit UE

**Behavior**
- Logs changes to SLA and reporting thresholds  
- Supports historical dashboard reconciliation  

## 4. Suitelets (SL)

Suitelets expose endpoints for Drawer data, approvals, email actions, and audit exports.

### 4.1 Approval Drawer API Suitelet

**Behavior**
- Returns Drawer JSON payload  
- Includes steps, logs, exceptions, budget data, and AI insights  
- Ensures permission-based visibility  

### 4.2 Approval Action Suitelet

**Behavior**
- Handles approve/reject requests  
- Creates queue records  
- Returns status to the client script  
- Performs lightweight validation  

### 4.3 Email Approval Suitelet

**Behavior**
- Validates HMAC-secured email approval links  
- Renders summary UI for approvers  
- Submits queue actions  

### 4.4 Audit Package Suitelet

**Behavior**
- Collects SuiteQL results  
- Generates CSVs and README report  
- Bundles data into a ZIP file for download  

## 5. Scheduled Scripts (SCH)

Scheduled scripts handle asynchronous workflow operations.

### 5.1 Approval Queue Processor

**Behavior**
- Processes approve/reject queue items  
- Updates Approval Instance state  
- Advances steps or triggers re-evaluation  
- Writes logs and updates Drawer data  

### 5.2 Email Approval Queue Processor

**Behavior**
- Processes email-based queue items  
- Validates tokens  
- Handles token expiration or tampering  
- Ensures audit consistency  

### 5.3 Escalation Engine

**Behavior**
- Checks overdue steps  
- Applies escalation rules  
- Reassigns escalated steps  
- Sends escalation notifications  

### 5.4 Dashboard Refresh Scripts

**Behavior**
- Refresh key metrics for the Command Center  
- Recompute performance scoring  
- Update aging bucket counts  

## 6. Library Scripts

Greenlight uses shared libraries for common logic.

### 6.1 Rule Engine Library

**Behavior**
- Specificity scoring  
- Conditional logic evaluation  
- Amount range comparison  
- Segment-based filtering  

### 6.2 Workflow Engine Library

**Behavior**
- Step sequencing  
- Re-evaluation logic  
- Skipping logic  
- SoD enforcement  

### 6.3 Utility Library

**Behavior**
- Date handling  
- Logging helpers  
- NetSuite record utilities  
- HMAC generation and validation  

## 7. Script Interaction Model

### 7.1 Data Flow

**Behavior**
- User Event creates and initializes Approval Instance  
- Client Script displays Drawer  
- Suitelet loads Drawer data  
- User actions create Queue Items  
- Scheduled Scripts process Queue Items  
- Drawer updates via Suitelet calls  

### 7.2 Error Handling

**Behavior**
- Exceptions captured in Approval Logs  
- Critical failures surfaced in Drawer  
- Queue scripts retry transient errors  

## 8. Governance Optimization

### 8.1 Performance Strategy

**Behavior**
- Heavy logic delegated to scheduled scripts  
- SuiteQL used for efficient reporting  
- Drawer loading optimized to minimize governance usage  

### 8.2 Retry and Fault Tolerance

**Behavior**
- Queue items retried automatically  
- Escalation and email queues isolated  
- Instance updates performed in lightweight operations  

## 9. Security Considerations

### 9.1 HMAC Validation

**Behavior**
- Email approval links use tamper-proof tokens  
- Tokens include step, instance, and user metadata  

### 9.2 Role-Based Access

**Behavior**
- Drawer respects NetSuite role permissions  
- Sensitive data hidden from unauthorized users  

## 10. Related Documentation

- **Technical Architecture Overview**  
- **Data Model Reference**  
- **Queue Architecture Guide**  
- **Workflow Behavior & Lifecycle**  
- **Approval Drawer Guide**
