---
title: "Security Overview"
description: "Comprehensive overview of Greenlight’s security model, including authentication, authorization, SoD enforcement, data protection, and SuiteScript security considerations."
section: "Architecture"
order: 70
---

This document provides an architectural overview of Greenlight’s security model.  
It covers authentication, authorization, SoD enforcement, data protection, SuiteScript boundaries, email approval token security, compliance alignment, and best practices for secure operation.

## 1. Overview

Greenlight’s security architecture is built on five core pillars:

- **Authentication** – Ensuring user identity via NetSuite login or secure HMAC tokens  
- **Authorization** – Role-based access control for Drawer, actions, dashboards, and configuration  
- **Data Security** – Protecting workflow and transaction data at rest and in transit  
- **SoD Enforcement** – Preventing policy violations for high-risk approvals  
- **Auditability** – Full logging of all approval actions, exceptions, and configuration changes  

Security is applied consistently across SuiteScripts, Suitelets, and UI components.

## 2. Authentication Model

### 2.1 NetSuite Role-Based Authentication

**Behavior**
- Drawer access requires NetSuite login.  
- Users must have permission to view the underlying transaction.  
- Permissions for custom records determine visibility of Instances and Logs.

### 2.2 Email Approval Authentication (HMAC Tokens)

Email approvals do **not** require login. Instead, a secure token is used.

**Fields**
- User ID  
- Instance ID  
- Step ID  
- Expiration timestamp  
- SHA-256 signature  

**Behavior**
- Tokens are validated server-side using a secret key.  
- Tampering invalidates the token.  
- Expired tokens are automatically rejected.  

## 3. Authorization Model

Authorization controls what data a user may see and what actions they may take.

### 3.1 Drawer Authorization

**Behavior**
- Drawer only loads data the user’s role can view.  
- Sensitive fields (budget, AI insights, SoD) are tier-restricted.  
- Approve/Reject buttons are hidden if the user is not the assigned approver.

### 3.2 Admin Authorization

**Permissions Required**
- Full access to Settings and Report Settings  
- Full access to Rule, Step, and Delegation records  
- Access to Script Deployments and SuiteAnalytics  

### 3.3 Dashboard Permissions

**Behavior**
- Command Center dashboards only load if the user’s role allows access  
- Enterprise modules remain hidden if license tier is lower

## 4. Segregation of Duties (SoD) Enforcement

SoD is a critical control for preventing fraud and policy violations.

### 4.1 Detection (Pro & Enterprise)

**Behavior**
- Self-approval detection  
- Duplicate approval detection  
- Delegation conflict detection  

### 4.2 Enforcement (Enterprise Only)

**Behavior**
- Blocks approver actions  
- Auto-skips invalid steps  
- Logs SoD violations for audit purposes  

### 4.3 Drawer Integration

**Behavior**
- Violations surfaced with high-visibility warnings  
- Approvers cannot override SoD in any tier

## 5. Data Protection

### 5.1 Data at Rest

**Behavior**
- All data stored as NetSuite custom record values  
- Audit Logs and Instances are immutable  
- Sensitive tokens never stored in plain text  

### 5.2 Data in Transit

**Behavior**
- All Suitelets require HTTPS  
- Email approval links enforce HTTPS-only execution  
- JSON payloads in Drawer API Suitelet sanitized and validated  

### 5.3 Data Isolation

**Behavior**
- Customer data never leaves their NetSuite account  
- No external servers or integrations used for core processing  

## 6. SuiteScript Security Considerations

### 6.1 Least Privilege Access

**Behavior**
- Scripts request only permissions needed for execution  
- Queue processors run under an internal role with restricted access  

### 6.2 Input Validation

**Behavior**
- Drawer Suitelet validates parameters and field inputs  
- Email Suitelet enforces strict token checking  
- Logging engine sanitizes comments and messages  

### 6.3 Governance Protection

**Behavior**
- High-cost operations deferred to scheduled scripts  
- SuiteQL queries used instead of search iteration  

## 7. Token Security Model

### 7.1 HMAC Token Generation

**Behavior**
- Tokens include: user, instance, step, timestamp  
- Secured with SHA-256 HMAC secret  
- Encoded to prevent replay attacks  

### 7.2 Token Validation Flow

**Behavior**
- Suitelet recomputes signature  
- If mismatch → token rejected  
- If expired → token rejected  
- If replay detected → token invalidated  

## 8. Audit Logging & Evidence

### 8.1 Immutable Logs

**Behavior**
- Every approval action logged  
- Logs include user, timestamp, step, comments, SoD status, exceptions  

### 8.2 Audit Package Exports

**Behavior**
- CSV reports include all logs, exceptions, and metadata  
- Enterprise includes extended security analytics  

### 8.3 Configuration Change Logging

**Behavior**
- Changes to Settings, Report Settings, Rules, and Steps logged by UEs  

## 9. Compliance Alignment

### 9.1 SOX / SOC2 Principles

**Behavior**
- Approval workflow integrity  
- Immutable logs  
- SoD enforcement  
- Evidence export via Audit Package  
- Strict access controls  

### 9.2 GDPR / Data Privacy

**Behavior**
- No personal data transmitted externally  
- Logs may be purged upon request via admin controls  

## 10. Troubleshooting Security Issues

### Common Issues

**Drawer Showing “Unauthorized”**
- Missing record permissions  
- Role lacks access to Suitelet endpoints  

**Email Approval Rejected**
- Token expired  
- URL modified or copy-pasted incorrectly  
- Employee email mismatch  

**SoD Blocking Unexpectedly**
- Enterprise enforcement active  
- Step-level overrides configured  

## 11. Related Documentation

- **Script Architecture Reference**  
- **Data Model Reference**  
- **Segregation of Duties (SoD) Guide**  
- **Email Approval System Guide**  
- **Access Control Policies**