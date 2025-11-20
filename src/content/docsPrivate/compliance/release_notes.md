---
title: "Change Log & Release Notes"
description: "Version history, release notes, and change log for Greenlight Approvals, including new features, fixes, and enhancements."
section: "Compliance"
order: 60
---

This document provides a chronological record of all major changes to Greenlight Approvals.  
It includes new features, enhancements, bug fixes, and compliance-impacting updates.

Use this Change Log as a reference for upgrade planning, auditing, and communicating changes to stakeholders.

## 1. Versioning & Release Strategy

### 1.1 Semantic Versioning

**Behavior**
- Major version: breaking changes or architectural updates  
- Minor version: new features or enhancements  
- Patch version: bug fixes or small improvements  

### 1.2 Release Bundles

**Behavior**
- Each release packaged as a new SuiteBundle version  
- May include SuiteScript updates, saved search changes, or configuration updates  

### 1.3 Upgrade Notes

**Behavior**
- Some updates require redeploying scripts  
- Admins should check Settings and Report Settings after upgrades  

---

## 2. Release History

### Version 1.0.0 — Initial Launch
**New**
- Core approval engine  
- Approval Drawer (Details, Timeline, Comments tabs)  
- Approval Rules & Steps configuration  
- Queue-based approve/reject processing  
- Email approval system with secure HMAC tokens  
- Dashboard: Open Approvals & SLA basics  
- Settings and Report Settings screens  
- Basic audit logs and export tools  

---

### Version 1.1.0 — Budget Intelligence (Pro/Enterprise)
**New**
- Budget variance block in Approval Drawer  
- Budget Engine with SuiteQL-based data loading  
- New Budget Dashboard module  
- Report Settings support for critical amounts & aging buckets  

**Enhancements**
- Drawer performance improvements  
- More detailed timeline log output  

---

### Version 1.2.0 — AI Insights System (Pro/Enterprise)
**New**
- Transaction summary insights  
- Vendor behavior insights  
- Budget narrative insights  
- Insight block in Approval Drawer  

**Fixes**
- Improved error messaging for insight failures  

---

### Version 1.3.0 — SoD Enforcement (Enterprise)
**New**
- Enterprise-only SoD enforcement mode  
- Auto-skip for conflicting steps  
- Enhanced SoD warnings in Drawer  
- SoD Dashboard module  

**Fixes**
- Step-level override reliability improvements  

---

### Version 1.4.0 — Command Center Expansion
**New**
- Exception dashboard  
- High-value transaction dashboard  
- Trend analysis dashboard (Enterprise)  
- Performance scoring dashboards  

**Enhancements**
- Faster refresh cycle using SuiteQL aggregation  

---

### Version 1.5.0 — Delegations & Approver Experience Improvements
**New**
- Delegation management  
- Delegate indicators in Drawer  
- Delegation-aware SoD logic  

**Fixes**
- More consistent step assignment ordering  

---

### Version 1.6.0 — Audit Package Expansion
**New**
- Enterprise-only extended CSV set  
- Exception metadata export  
- Delegation export  
- Additional instance metadata snapshot  

**Enhancements**
- Faster ZIP generation  
- Improved SuiteQL batching  

---

## 3. Compliance-Related Updates

### 3.1 SOX Enhancements

**Updates**
- Stronger configuration logging  
- More detailed audit logs  
- Expansion of SoD categories  

### 3.2 SOC2 Enhancements

**Updates**
- Improved error handling for Suitelets  
- Additional permission checks  
- Enforcement of HTTPS-only for email approvals  

---

## 4. Planned Changes (Roadmap Excerpt)

### Upcoming
**Planned**
- Workflow re-evaluation options  
- Enhanced multi-level escalation  
- Report Settings analytics expansion  
- New integrations and API exposure (Enterprise)  

---

## 5. Related Documentation

- **Compliance Overview**  
- **Audit Evidence Map**  
- **Security Overview**  
- **Upgrade Guide**
