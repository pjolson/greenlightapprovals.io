---
title: "Exception Detection Guide"
description: "How Greenlight identifies, logs, and displays exceptions throughout approval workflows."
section: "Administration"
order: 10
---

Exception Detection identifies unusual or problematic situations that occur during approval workflows.  
Exceptions help administrators understand approval delays, configuration issues, SoD violations, and data inconsistencies.

Greenlight automatically logs exceptions and displays them in the Approval Drawer, Command Center, and Audit Package.

## 1. Overview

Greenlight logs exceptions during workflow execution when:
- Step assignment fails  
- SoD violations occur  
- Approvers are missing or invalid  
- Rule or step conditions cannot be evaluated  
- Queue processing encounters errors  
- Transaction data is inconsistent  

Exceptions are stored in the Approval Log and surfaced contextually in the UI.

## 2. Types of Exceptions

Greenlight detects several categories of exceptions.

### 2.1 Assignment Exceptions

**Behavior**
- Occur when an approver cannot be resolved.  
- Example: Dynamic field references an empty employee field.  
- Typically logged with severity: **Warning** or **Error**.

### 2.2 SoD Exceptions

**Behavior**
- Triggered during creator self-approval or duplicate approval checks.  
- Appears in the Drawer with clear violation messaging.  
- Severity depends on SoD mode (Warn or Enforce).

### 2.3 Condition Evaluation Exceptions

**Behavior**
- Occur when conditional logic references invalid or missing fields.  
- Logged for debugging and appears in Audit Package.  
- Steps may skip depending on severity.

### 2.4 Queue Processing Exceptions

**Behavior**
- Triggered when a Queue Processor cannot complete an action.  
- Example: Governance timeout or missing instance.  
- Logged as **Error** and retried on next cycle.

### 2.5 Data Integrity Exceptions

**Behavior**
- Occur when transaction data changes unexpectedly mid-approval.  
- Typical causes:
  - Large transaction edits  
  - Segment reclassification  
  - Subsidiary change  
- May trigger rule re-evaluation if enabled.

## 3. Exception Severity Levels

### 3.1 Severity Types

**Fields**
- **Info** – Observational event; no impact.  
- **Warning** – Something unexpected occurred but workflow continued.  
- **Error** – Prevented an action; workflow halted or skipped.  
- **Critical** – Workflow cannot continue without intervention.

### 3.2 Severity Behavior

**Behavior**
- Severity is written to the Approval Log.  
- Critical exceptions generate Command Center alerts.  
- Pro and Enterprise tiers display severity indicators in the Drawer.

## 4. Exception Logging

All exceptions create immutable log entries.

### 4.1 Logged Fields

**Fields**
- Exception Type  
- Severity  
- Message  
- Transaction ID  
- Step ID  
- Rule ID  
- Approver (if applicable)  
- Timestamp  
- Additional context  

### 4.2 Audit Package Behavior

**Behavior**
- Exceptions included in Audit Package CSVs.  
- Enterprise packages include extended metadata.  
- Exceptions appear alongside approvals and delegation logs.

## 5. Exceptions in the Approval Drawer

The Drawer displays exceptions contextually.

### 5.1 Drawer Display

**Behavior**
- Exceptions appear at the top of the **Details** tab.  
- Warning and error icons indicate severity.  
- Messages explain what occurred and next steps.

### 5.2 Drawer Interaction Limitations

**Behavior**
- Exceptions are read-only.  
- Approvers cannot override SoD or assignment errors.  
- Admins must resolve underlying configuration issues.

## 6. Command Center Integration

Exceptions feed into multiple dashboards.

### 6.1 Exception Dashboards

**Fields**
- Open Exceptions  
- Exceptions by Approver  
- Exceptions by Rule  
- Critical Exceptions  
- Exceptions by Transaction Type  

### 6.2 Behavior

**Behavior**
- Critical exceptions trigger alerts.  
- Admins can filter by severity, rule, and transaction type.

## 7. Troubleshooting Exception Issues

### Common Issues

**Repeated Assignment Failures**
- Dynamic approver field empty  
- Incorrect role/group configuration  

**SoD Exceptions Unexpectedly Blocking Steps**
- Enterprise SoD enforcing stricter policy  
- Step-level overrides applied  

**Queue Errors Persisting**
- Scheduled scripts not running  
- Queue items corrupted or incomplete  

**Large Volume of Data Integrity Exceptions**
- Transaction edits occurring mid-approval  
- Re-evaluation settings too strict  

## 8. Related Documentation

- **Segregation of Duties (SoD) Guide**  
- **Approval Steps Guide**  
- **Approval Drawer Guide**  
- **Queue Architecture Guide**