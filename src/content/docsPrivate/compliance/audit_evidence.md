---
title: "Audit Evidence Map"
description: "Mapping of Greenlight approval data to audit evidence requirements, including SOX/SOC2 control support and exported artifacts."
section: "Compliance"
order: 20
---

This Audit Evidence Map describes how Greenlight provides the documentation and records required for SOX, SOC2, and internal audit validation.  
It identifies which Greenlight data sources satisfy common audit evidence requests.

## 1. Overview

Auditors typically request evidence in the following categories:

- Approval activity  
- Segregation of Duties compliance  
- Workflow sequencing  
- Budget reasonableness  
- Config change history  
- Exception and error handling  
- Delegation activity  

Greenlight provides all required evidence via the Approval Drawer, Approval Logs, Delegation records, and Audit Package export.

---

## 2. Core Evidence Sources

### 2.1 Approval Logs (Primary Evidence)

**Behavior**
- Records every action with timestamp  
- Includes approver identity, comments, method (Drawer/Email)  
- Captures SoD violations, exceptions, escalations  

**Auditor Use**
- Validate approvals occurred  
- Confirm approval sequence  
- Trace approver identity  
- Review reasoning and comments  

### 2.2 Approval Instance

**Behavior**
- Represents the workflow at the transaction level  
- Stores step order, status, and start/end timestamps  
- Includes snapshot metadata  

**Auditor Use**
- Validate end‑to‑end workflow  
- Confirm all steps executed  

---

## 3. SoD & Control Evidence

### 3.1 SoD Violation Logs

**Behavior**
- Logs incidents of attempted self‑approval  
- Logs duplicate approval attempts  
- Supports delegation conflict detection  

**Auditor Use**
- Evaluate SoD control effectiveness  
- Verify enforcement behavior (Enterprise)  

### 3.2 Delegation Records

**Behavior**
- Identify users acting on behalf of others  
- Enforce time‑bounded control policies  

**Auditor Use**
- Validate delegation compliance  
- Confirm authority chain  

---

## 4. Budget & Financial Control Evidence

### 4.1 Budget Variance Data

**Behavior**
- Shows variance at time of approval  
- Captures contextual budget insights (Pro/Enterprise)  

**Auditor Use**
- Validate reasonableness of spend  
- Confirm management reviewed variance  

### 4.2 Budget Engine Output

**Behavior**
- Includes budget, actuals, pending amount  

**Auditor Use**
- Trace variance calculations  
- Validate compliance with budget policy  

---

## 5. Configuration Change Evidence

### 5.1 Rule/Step Change Logs

**Behavior**
- Logs modifications to rules and steps  
- Captures before/after values  
- Records who made the change  

**Auditor Use**
- Validate configuration integrity  
- Review rule logic updates over time  

### 5.2 Settings & Report Settings Change Logs

**Behavior**
- Records updates to SoD, SLA, email, budget settings  

**Auditor Use**
- Validate control maintenance  
- Confirm governance and threshold changes  

---

## 6. Exception & Error Evidence

### 6.1 Exception Logs

**Behavior**
- Captures assignment failures, SoD issues, data errors  
- Displayed in Drawer and exported via Audit Package  

**Auditor Use**
- Review system reliability  
- Inspect rejected or skipped steps  

### 6.2 Queue Processing Logs

**Behavior**
- Tracks all queue actions (approve/reject)  

**Auditor Use**
- Validate processing integrity  
- Confirm timely execution of workflow events  

---

## 7. Exported Evidence via Audit Package

### 7.1 Included CSV Files

**Fields**
- `instances.csv` – Workflow state  
- `steps.csv` – Step metadata  
- `logs.csv` – Approval activity  
- `delegations.csv` – Delegation details  
- `exceptions.csv` – Exception data  
- `settings.csv` – Configuration snapshot  

### 7.2 Auditor Use Cases

**Use Cases**
- End‑to‑end approval reconstruction  
- Sample testing of approval workflows  
- Verification of step order and timing  
- SoD testing and validation  
- Configuration drift analysis  

---

## 8. Evidence Access Points

### 8.1 Approval Drawer

**Behavior**
- Provides readable timeline of events  
- Useful for walkthroughs and sampling  

### 8.2 Command Center (Enterprise)

**Behavior**
- Shows historical trends and high‑risk transactions  

### 8.3 Audit Package Suitelet (Pro/Enterprise)

**Behavior**
- Exports full dataset for auditor review  

---

## 9. Related Documentation

- **Audit Package Guide**  
- **Compliance Overview**  
- **Security Overview**  
- **Segregation of Duties (SoD) Guide**  
- **Workflow Behavior & Lifecycle**
