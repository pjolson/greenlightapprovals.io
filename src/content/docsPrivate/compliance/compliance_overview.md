---
title: "Compliance Overview"
description: "Overview of Greenlight’s compliance capabilities, including audit readiness, SOX/SOC2 alignment, security controls, and evidence collection."
section: "Compliance"
order: 10
---

Greenlight Approvals is designed with strong compliance controls to support internal audit requirements, SOX controls, and SOC2 principles.  
This overview summarizes how Greenlight enforces workflow integrity, retains audit evidence, and ensures approval actions are fully traceable.

## 1. Overview

Greenlight provides compliance capabilities in the following areas:

- Workflow integrity  
- Immutable audit logs  
- Segregation of Duties enforcement  
- Evidence packages for auditors  
- Security and role-based access controls  
- Config change logging  
- Budget and variance transparency  

These controls support audit readiness for financial approval workflows.

## 2. Workflow Integrity Controls

### 2.1 Approval Instance Immutability

**Behavior**
- Approval Instances store workflow state and cannot be edited manually  
- All step transitions captured as logs  
- Any change requires a new instance via resubmission  

### 2.2 Step Sequencing Integrity

**Behavior**
- Steps executed in predefined order  
- Skipped steps recorded explicitly (e.g., SoD auto-skip)  
- Re-evaluation triggered only under allowed conditions  

---

## 3. Segregation of Duties (SoD) Controls

### 3.1 Detection (Pro & Enterprise)

**Behavior**
- Identifies self-approval  
- Detects duplicate approval attempts  
- Flags delegation conflicts  

### 3.2 Enforcement (Enterprise)

**Behavior**
- Prevents unauthorized approval  
- Auto-skips conflicting steps  
- Logs SoD violations in Approval Logs  

---

## 4. Audit Logging & Evidence Collection

### 4.1 Immutable Audit Logs

**Behavior**
- Logs record every action  
- Includes user, timestamp, comments, SoD status  
- Logged data cannot be edited  

### 4.2 Audit Package (Enterprise)

**Behavior**
- Exports full workflow dataset  
- Includes logs, steps, instances, delegations, exceptions  
- Delivered as CSV files inside a ZIP  

### 4.3 Metadata Capture

**Fields**
- User identity  
- Step names and sequence  
- Approval method (Drawer/Email)  
- Variance and budget context  
- Exception and SoD indicators  

---

## 5. Configuration Change Logging

### 5.1 Rule/Step Changes

**Behavior**
- User Events capture configuration modifications  
- Logs include old vs new values  
- Supports internal audit trails  

### 5.2 Settings & Report Settings

**Behavior**
- Logs configuration changes by admin  
- Essential for SOX/SOC2 audits  

---

## 6. Security & Access Controls

### 6.1 Role-Based Access

**Behavior**
- Drawer visibility tied to NetSuite role permissions  
- Sensitive data hidden for unauthorized users  
- Admin-only access for Settings  

### 6.2 Email Approval Token Security

**Behavior**
- HMAC-secured tokens  
- Prevent tampering or replay  
- Validated at multiple points  

---

## 7. SOX & SOC2 Alignment

Greenlight supports SOX and SOC2 readiness by providing:

### 7.1 SOX Control Support

**Fields**
- Control over financial approval workflow  
- Immutable logs for evidence  
- SoD enforcement  
- Budget context supporting financial reasonableness  

### 7.2 SOC2 Principles

**Fields**
- Security → RBAC, token validation  
- Availability → Queue-based reliability  
- Processing Integrity → Consistent workflow sequencing  
- Confidentiality → No external data transfer  

---

## 8. Auditor-Facing Benefits

### 8.1 Transparent Workflow Evidence

**Behavior**
- Logs clearly explain approval rationale  
- Timeline view provides human-readable history  

### 8.2 Complete Data Export

**Behavior**
- Allows auditors to validate workflows independently  
- Supports sampling and control testing  

### 8.3 Config Change Visibility

**Behavior**
- Auditors may review rule/step modifications  

---

## 9. Troubleshooting Compliance Issues

### 9.1 Missing Logs

**Possible Causes**
- Logging UEs disabled  
- Permissions blocking visibility  

**Resolution**
- Reenable logging scripts  
- Validate access to custom records  

### 9.2 Missing Audit Package Files

**Possible Causes**
- Dataset empty  
- CSV generator failed  

**Resolution**
- Narrow date window  
- Check Suitelet logs  

---

## 10. Related Documentation

- **Audit Evidence Map**  
- **Audit Package Guide**  
- **Security Overview**  
- **Segregation of Duties (SoD) Guide**  
- **Access Control Policies**