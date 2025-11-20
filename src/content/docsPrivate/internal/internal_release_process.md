---
title: "Internal Release Process"
description: "Internal process for releasing new Greenlight versions, including QA, packaging, deployment, and communication steps."
section: "Internal"
order: 70
---

This Internal Release Process defines how Greenlight versions move from development → testing → release.  
It ensures stability, auditability, and consistent delivery across all customers and environments.

## 1. Overview

Greenlight follows a structured release lifecycle:

- Development  
- Internal QA  
- Partner/Sandbox validation  
- Packaging (Bundle / SuiteApp)  
- Deployment  
- Post-release monitoring  
- Documentation & communication  

This process minimizes risk and ensures high reliability.

---

## 2. Pre-Release Requirements

### 2.1 Code & Feature Completion

**Requirements**
- All code changes merged into main branch  
- Feature flags added where needed  
- Unit-level SS2.x validation complete  

### 2.2 Documentation Updates

**Required before release**
- Update relevant docs (Rules, Steps, Drawer, Queue, etc.)  
- Update Change Log & Release Notes  
- Update any tier-based capability notes  

### 2.3 Dependency Audit

**Checklist**
- Validate all saved searches deployed  
- Validate custom records up to date  
- Validate Settings and Report Settings fields unchanged  

---

## 3. Internal QA Process

### 3.1 Functional Testing

**Tests**
- Rule matching  
- Step sequencing  
- Drawer rendering  
- Queue processing  
- Email approvals  
- Exception handling  
- Budget and AI engines  

### 3.2 Regression Testing

**Areas**
- Queue processors  
- Logging engine  
- Drawer API Suitelet  
- Settings/Report Settings behavior  

### 3.3 Security Testing

**Tests**
- Permissions and RBAC  
- SoD detection  
- Token validation for email approvals  
- Script role-level permissions  

---

## 4. Sandbox Release Procedure

### 4.1 Pre-Deployment

**Steps**
- Install test bundle into internal sandbox  
- Validate script deployments  
- Import testing transactions  

### 4.2 Sandbox Validation

**Checklist**
- Verify Drawer load time  
- Validate dashboards  
- Validate email approvals  
- Validate Queue scripts running  
- Validate admin screens  

### 4.3 Sign-Off

**Approvals required**
- QA lead  
- Product owner  
- Engineering lead  

---

## 5. Packaging & Deployment

### 5.1 Bundle Packaging (Non-SuiteApp)

**Steps**
- Increment bundle version  
- Upload SuiteScripts and objects  
- Validate bundle dependencies  
- Update bundle documentation  

### 5.2 SuiteApp Packaging (Future)

**Steps**
- Perform SDF validation  
- Generate SuiteApp artifact  
- Submit to SDN for automated tests  
- Resolve sandbox test failures  

### 5.3 Pre-Production Deployment

**Actions**
- Deploy bundle to staging sandbox  
- Validate rule/step configuration migration  
- Validate data model changes  

---

## 6. Production Release

### 6.1 Release Timing

**Guidelines**
- Prefer low-traffic windows  
- Avoid end-of-month or financial close periods  

### 6.2 Deployment Steps

**Steps**
- Deploy bundle to production  
- Confirm scripts activated under correct roles  
- Clear caches (if necessary)  
- Validate queue processor health  

### 6.3 Immediate Validation

**Checklist**
- Test Drawer load  
- Test one approval cycle  
- Check dashboard data  
- Confirm no new exceptions  

---

## 7. Post-Release Monitoring

### 7.1 First 48 Hours

**Monitoring**
- Queue backlog  
- Exception frequency  
- New SoD events  
- Script logs for unexpected errors  

### 7.2 Customer Feedback Sweep

**Actions**
- Check support tickets  
- Confirm partner reports  
- Validate no workflow disruptions  

---

## 8. Rollback Procedure

### 8.1 When to Roll Back

**Triggers**
- Severe queue failures  
- Drawer failing to load  
- Rule/step evaluation broken  
- Data corruption detected  

### 8.2 Rollback Steps

**Steps**
- Re-deploy prior bundle version  
- Clear queue items if required  
- Re-run validation tests  
- Notify affected customers  

---

## 9. Communication Requirements

### 9.1 Internal Notification

**Recipients**
- Product  
- Engineering  
- Support  
- Partners (if significant change)  

### 9.2 Customer-Facing Messaging

**Includes**
- Summary of new features  
- Fixes included  
- Tier-based updates  
- Any required admin actions  

---

## 10. Release Artifacts

### 10.1 Required Artifacts

**Artifacts**
- Release Notes  
- Test Results  
- Bundle/SuiteApp ID and version  
- Approval from leads  
- Deployment timestamp  

### 10.2 Optional Artifacts

**Artifacts**
- Screenshots of UI changes  
- Architecture diffs  

---

## 11. Related Documentation

- **Change Log & Release Notes**  
- **Sandbox Testing Guide**  
- **Implementation Partner Guide**  
- **Security Overview**
