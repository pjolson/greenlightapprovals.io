---
title: "Security Hardening Guide"
description: "Recommended security controls, configuration settings, and operational practices to ensure Greenlight is implemented securely within NetSuite."
section: "Compliance"
order: 30
---

This guide provides recommended security controls and best practices for hardening a Greenlight Approvals implementation.  
These controls help ensure that sensitive approval workflows, financial data, and audit logs are protected against unauthorized access or tampering.

## 1. Overview

Security hardening focuses on:

- Strengthening role and permission boundaries  
- Ensuring secure SuiteScript deployments  
- Restricting access to sensitive approval data  
- Enforcing best practices for email approvals  
- Hardening SoD, budget, and audit functionality  
- Reducing attack surface within NetSuite  

Administrators should apply these recommendations during initial setup and periodically review them.

## 2. Role & Permission Hardening

### 2.1 Use the Principle of Least Privilege

**Recommendations**
- Grant only required access to Approval Drawer and Instance records  
- Avoid roles with excessive “Full” permissions  
- Restrict admin access to Settings, Rules, and Steps  

### 2.2 Create a Dedicated Greenlight Admin Role

**Behavior**
- Limits access to configuration changes  
- Provides consistent administration across environments  
- Prevents accidental changes by general admins  

### 2.3 Restrict Dashboard Access

**Recommendations**
- Only managers and auditors should access Command Center dashboards  
- Hide budget, SoD, and performance dashboards for unauthorized users  

---

## 3. Secure SuiteScript Deployment

### 3.1 Restrict Script Execution Roles

**Recommendations**
- Ensure scheduled scripts run under a tightly controlled internal role  
- Action Suitelets should not run under roles with transaction-edit permissions  

### 3.2 Disable Unused Deployments

**Behavior**
- Reduces attack surface  
- Prevents accidental execution in test environments  

### 3.3 Regularly Review Script Deployments

**Recommendations**
- Confirm all deployments map to current versions  
- Ensure no unused or legacy deployments remain active  

---

## 4. Email Approval Security

### 4.1 Enforce Strict Token Expiration

**Recommendations**
- Shorten token TTL for high-risk accounts  
- Renew tokens automatically via re-sent notifications  

### 4.2 Require HTTPS-Only Access

**Behavior**
- Prevents interception or modification of approval links  

### 4.3 Disable Email Approvals If Not Required

**Recommendations**
- Reduce potential attack vectors  
- Use Drawer-only approvals for sensitive workflows  

---

## 5. Segregation of Duties Hardening

### 5.1 Always Enable SoD (Pro/Enterprise)

**Behavior**
- Provides detection of policy violations  
- Ensures compliance with audit controls  

### 5.2 Use Enterprise Enforcement for Sensitive Workflows

**Recommendations**
- Enable Enforce mode for high-value financial approvals  
- Configure auto-skip for conflicting approvers  

### 5.3 Lock Down Delegation Privileges

**Behavior**
- Prevent unauthorized delegation assignments  
- Enforce strict date windows  

---

## 6. Audit Log & Evidence Hardening

### 6.1 Protect Approval Log Records

**Recommendations**
- Restrict View/Edit/Delete permissions  
- Prevent unauthorized log manipulation  

### 6.2 Keep Audit Package Role-Restricted

**Behavior**
- Only Audit/Compliance roles should generate exports  

### 6.3 Archive Logs Periodically (Enterprise)

**Recommendations**
- Maintain performance  
- Retain secure audit evidence offline if required  

---

## 7. Budget Insight Hardening

### 7.1 Restrict Access to Budget Data

**Recommendations**
- Only finance and authorized approvers should view budget variance  
- Hide budget block for general approvers  

### 7.2 Validate Budget Source Security

**Behavior**
- Ensure budgets are locked down in NetSuite  
- Prevent unauthorized edits to budget records  

---

## 8. Drawer & UI Hardening

### 8.1 Restrict Drawer Visibility

**Recommendations**
- Hide Drawer entirely for users without approval responsibilities  

### 8.2 Enforce Secure Rendering

**Behavior**
- Approver actions always validated server-side  
- Drawer should not expose sensitive internal IDs  

---

## 9. Environment Hardening

### 9.1 Separate Sandbox from Production

**Recommendations**
- Test new rules and steps in Sandbox first  
- Never deploy experimental scripts to Production  

### 9.2 Periodic Access Reviews

**Behavior**
- Revalidate access for approvers, admins, and auditors  
- Remove inactive users  

### 9.3 Disable Legacy or Obsolete Rules

**Recommendations**
- Prevent unintended workflow paths  
- Reduce rule-matching complexity  

---

## 10. Operational Security Practices

### 10.1 Monitor Queue Health

**Behavior**
- Early detection of stuck queue items  
- Ensures uninterrupted workflow execution  

### 10.2 Review Exception Logs

**Recommendations**
- Identify recurring SoD or assignment issues  
- Investigate high-volume exceptions  

### 10.3 Rotate Secrets & Keys

**Behavior**
- Rotate HMAC secrets periodically  
- Prevent token replay or leakage  

---

## 11. Troubleshooting Security Issues

### Common Issues

**Unauthorized Drawer Access**
- Check role permissions  
- Verify Suitelet access restrictions  

**Suspicious Email Approval Activity**
- Rotate tokens  
- Monitor HMAC failures  

**SoD Enforcement Blocking Unexpectedly**
- Review delegation and step overrides  

---

## 12. Related Documentation

- **Security Overview**  
- **Compliance Overview**  
- **Audit Evidence Map**  
- **Segregation of Duties (SoD) Guide**  
- **Access Control Policies**