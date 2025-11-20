---
title: "Incident Response Plan (Enterprise)"
description: "Formal incident response procedures for detecting, responding to, and resolving security or workflow-impacting incidents related to Greenlight Approvals."
section: "Compliance"
order: 50
---

This Incident Response Plan provides a structured process for identifying, investigating, and resolving security or operational incidents related to Greenlight Approvals.  
It is intended for Enterprise customers with advanced compliance requirements.

## 1. Overview

The Incident Response Plan covers:

- Detection and triage of incidents  
- Containment and mitigation steps  
- Root cause analysis  
- Communication and escalation procedures  
- Recovery and validation  
- Documentation and audit requirements  

Incidents may be related to security, configuration, workflow state, or data integrity.

---

## 2. Incident Categories

### 2.1 Security Incidents

**Examples**
- Unauthorized approval attempts  
- Compromised email approval links  
- Suspicious access to Drawer or dashboards  
- Invalid token reuse or manipulation  

### 2.2 Workflow Incidents

**Examples**
- Stuck approval instances  
- Queue processor failures  
- Incorrect approver assignment  
- Unexpected SoD blocking  

### 2.3 Data Integrity Incidents

**Examples**
- Missing or inconsistent log data  
- Incorrect step sequencing  
- Classification mismatch during approval  

### 2.4 Configuration Incidents

**Examples**
- Unauthorized changes to rules or steps  
- Invalid Settings changes  
- Misconfigured delegation leading to improper approvals  

---

## 3. Detection

### 3.1 Automated Detection

**Sources**
- Exception logs  
- Queue error logs  
- SoD violation logs  
- Dashboard alerts (Enterprise)  

### 3.2 Manual Detection

**Sources**
- Reports from approvers or managers  
- Audit sampling findings  
- Unexpected Drawer behavior  

### 3.3 Indicators of Compromise (IOC)

**Examples**
- Multiple failed HMAC token validations  
- Approval logs showing unexpected users  
- Sudden gaps in log activity  

---

## 4. Triage & Severity Classification

Incidents are categorized into severity levels:

### 4.1 Severity 1 – Critical

**Behavior**
- Approval integrity compromised  
- Unauthorized approver access detected  
- Data corruption in workflow records  

### 4.2 Severity 2 – High

**Behavior**
- Queue outage affecting approvals  
- Repeated SoD enforcement failures  
- Broken audit log output  

### 4.3 Severity 3 – Medium

**Behavior**
- Drawer malfunction for some users  
- Incorrect step assignment  

### 4.4 Severity 4 – Low

**Behavior**
- Minor UI rendering issue  
- Transient SuiteQL delays  

---

## 5. Containment Procedures

### 5.1 Immediate Containment Steps

**Actions**
- Disable affected rule, step, or delegation  
- Suspend queue processors (if corruption suspected)  
- Restrict impacted users or roles  
- Revoke or rotate HMAC secrets  

### 5.2 Data Isolation

**Behavior**
- Identify affected Approval Instances  
- Prevent further actions until investigation completes  

### 5.3 Notification to Stakeholders

**Behavior**
- Notify finance leadership  
- Notify security/compliance team  
- Notify impacted approvers  

---

## 6. Investigation Procedures

### 6.1 Log Review

**Actions**
- Review Approval Logs  
- Review Exception and SoD logs  
- Validate sequence of events  

### 6.2 Configuration Review

**Actions**
- Inspect recent rule/step changes  
- Check Settings and Report Settings logs  
- Validate delegation logs  

### 6.3 Queue & Engine Analysis

**Actions**
- Review queue items for retries/errors  
- Identify workflow engine conflict  
- Validate Drawer Suitelet behavior  

---

## 7. Remediation & Recovery

### 7.1 Correct Workflow State

**Actions**
- Reassign approvers  
- Restore correct step order  
- Re-run queue processors if necessary  

### 7.2 Restore Data Integrity

**Actions**
- Recreate Approval Instance (if necessary)  
- Reconstruct missing logs manually (admin-reviewed)  

### 7.3 Validate Fixes

**Actions**
- Test approval submission end-to-end  
- Confirm Drawer accuracy  
- Validate Audit Package exports  

---

## 8. Communication Protocols

### 8.1 Internal Notifications

**Behavior**
- Finance, IT, and Compliance teams notified based on severity  

### 8.2 External Notifications (If Required)

**Behavior**
- Only for security incidents impacting PII or protected data  
- Follows customer organization’s policy  

### 8.3 Approver Notifications

**Behavior**
- Inform impacted users after remediation  
- Provide instructions if re-approval necessary  

---

## 9. Documentation Requirements

### 9.1 Incident Report

**Fields**
- Description  
- Severity  
- Date/time of detection  
- Impacted instances  
- Root cause  
- Actions taken  
- Final resolution  

### 9.2 Audit Evidence

**Actions**
- Attach Approval Logs  
- Attach Exception Logs  
- Include configuration change logs  
- Include queue processor logs  

---

## 10. Post-Incident Review

### 10.1 Root Cause Analysis

**Behavior**
- Identify technical or procedural gaps  
- Evaluate rule configuration quality  
- Assess queue processor health  

### 10.2 Preventive Actions

**Recommendations**
- Reinforce SoD settings  
- Adjust token expiration policy  
- Improve monitoring and alerts  
- Train admins on rule/step configuration  

---

## 11. Related Documentation

- **Security Overview**  
- **Audit Evidence Map**  
- **Security Hardening Guide**  
- **Segregation of Duties (SoD) Guide**  
- **Troubleshooting Guide (Master)**