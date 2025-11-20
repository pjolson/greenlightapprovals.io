---
title: "Access Control Policies"
description: "Policies and recommended practices for securing access to Greenlight Approval data, configuration, dashboards, and audit capabilities."
section: "Compliance"
order: 40
---

This guide defines the access control policies that govern how users, managers, admins, and auditors interact with Greenlight’s approval data, settings, and dashboards.  
Use this document to implement strong RBAC (Role-Based Access Control) and minimize unauthorized access risks.

## 1. Overview

Access control in Greenlight is structured around:

- NetSuite role permissions  
- Custom record visibility  
- Drawer access and action rights  
- Dashboard access and data filtering  
- Configuration-level restrictions  
- Email approval token security  

These controls help enforce least privilege and align with SOX/SOC2 principles.

---

## 2. Access Control Principles

### 2.1 Least Privilege

**Behavior**
- Users receive only the access required to perform their duties  
- Sensitive workflows and dashboards restricted to appropriate roles  
- Admin activities limited to approved personnel  

### 2.2 Segregation of Duties (SoD)

**Behavior**
- Approval actions limited to non-conflicted approvers  
- Delegation policies enforced to maintain clean separation  

### 2.3 Need-to-Know Access

**Behavior**
- Budget insights hidden from users without financial responsibility  
- AI insights surfaced only when appropriate for the approver’s role  
- Dashboard modules filtered based on access rights  

---

## 3. Drawer Access Policies

### 3.1 Drawer Visibility

**Requirements**
- User must have permission to view the underlying transaction  
- User must have View access to Approval Instance and Log records  
- Sensitive blocks (Budget, AI, SoD) filtered by tier and permissions  

### 3.2 Approval Actions (Approve/Reject)

**Requirements**
- User must be assigned approver for current step  
- SoD rules must allow action  
- User must not be restricted by delegation or role limitations  

### 3.3 Read-Only Users

**Behavior**
- View Drawer contents but cannot take action  
- Often used for internal auditors or reviewers  

---

## 4. Admin & Configuration Access

### 4.1 Admin Role Requirements

**Permissions**
- Full access to Approval Rule, Step, Settings, Report Settings  
- Access to Script Deployments  
- Ability to run dashboards and review workflow integrity  

### 4.2 Restricted Admin Roles

**Behavior**
- Separate configuration from operational duties  
- Prevent unauthorized rule changes  

### 4.3 Configuration Logging

**Behavior**
- All changes to rules, steps, settings logged automatically  
- Supports SOX/SOC2 audit requirements  

---

## 5. Dashboard Access Policies

### 5.1 Command Center Visibility

**Requirements**
- Appropriate saved search and dashboard permissions  
- Role must match required access level for module  

### 5.2 Budget Dashboard Restrictions

**Behavior**
- Hidden from non-finance users  
- Enterprise-only advanced analytics restricted further  

### 5.3 SoD & Exception Dashboards

**Behavior**
- Only approvers, managers, and auditors can see conflict data  
- Sensitive information filtered by subsidiary and department  

---

## 6. Email Approval Access Controls

### 6.1 Token-Based Access

**Behavior**
- Email approvals do not require login  
- Access validated through HMAC tokens  
- Tokens tied to user, instance, and step  

### 6.2 Token Expiration Policies

**Recommendations**
- Shorter expiration for high-value workflows  
- Require re-sending emails for expired tokens  

---

## 7. Delegation Access Policies

### 7.1 Delegate Eligibility

**Requirements**
- Delegate must have appropriate transaction access  
- Cannot violate SoD policies  

### 7.2 Delegation Restrictions

**Behavior**
- Date-bounded  
- Cannot escalate privileges  
- Logged for audit review  

---

## 8. Auditor & Reviewer Access

### 8.1 Auditor Access (Enterprise Recommended)

**Behavior**
- Read-only access to instances, logs, dashboards  
- Ability to generate Audit Package (restricted role)  

### 8.2 Reviewer Access

**Behavior**
- Limited to viewing Drawer, workloads, and timeline  
- Cannot approve or reject  

---

## 9. Environment Controls

### 9.1 Sandbox vs Production Access

**Best Practices**
- Restrict production admin role to fewer users  
- Test all rule and step changes in Sandbox  

### 9.2 Periodic Access Reviews

**Behavior**
- Regularly review active roles and users  
- Remove inactive or unnecessary access  

---

## 10. Related Documentation

- **Security Overview**  
- **Compliance Overview**  
- **Segregation of Duties (SoD) Guide**  
- **Security Hardening Guide**  
- **Audit Evidence Map**