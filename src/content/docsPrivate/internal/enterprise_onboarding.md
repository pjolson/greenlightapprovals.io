---
title: "Enterprise Onboarding Checklist"
description: "Internal checklist and workflow for onboarding new Enterprise-tier Greenlight customers, including technical, compliance, and training steps."
section: "Internal"
order: 100
---

This Enterprise Onboarding Checklist defines the internal workflow for onboarding new Enterprise-tier customers.  
Enterprise deployments require additional attention to compliance, SoD, audit readiness, and multi-entity governance.

## 1. Overview

Enterprise onboarding includes:

- Technical installation  
- Compliance configuration  
- Delegation modeling  
- SoD enforcement setup  
- Dashboard & reporting configuration  
- UAT & sign-off  
- Training for admins, approvers, and auditors  

The goal is a smooth deployment with full governance and audit capability.

---

## 2. Pre‑Kickoff Requirements

### 2.1 Customer Readiness

**Checklist**
- NetSuite Admin identified  
- Finance lead identified  
- Internal audit contact (if applicable)  
- List of all approver roles  
- Spend policy documentation available  

### 2.2 Account & Access Preparation

**Checklist**
- Sandbox access provisioned  
- Required roles created (Admin, Auditor, Approver)  
- Customer tier confirmed as Enterprise  
- SSO/MFA policies reviewed  

---

## 3. Project Kickoff

### 3.1 Agenda

**Topics**
- Approval workflow scope  
- Compliance and audit requirements  
- Multi-subsidiary considerations  
- Delegation rules  
- Timeline and milestones  
- UAT expectations  

### 3.2 Deliverables

**Deliverables**
- Project plan  
- Rule & step matrix draft  
- Stakeholder alignment  

---

## 4. Technical Installation

### 4.1 Install Greenlight Bundle/SuiteApp

**Checklist**
- Install in Sandbox  
- Validate script deployments  
- Create test transactions  
- Configure baseline settings  

### 4.2 Verify System Health

**Checks**
- Drawer loads correctly  
- Queue scripts active  
- Logging scripts recording entries  
- Exceptions visible in Drawer  

---

## 5. Compliance Configuration

### 5.1 SoD Enforcement (Enterprise)

**Steps**
- Enable SoD in Settings  
- Review SoD categories  
- Configure enforcement rules  
- Validate warning vs enforcement modes  

### 5.2 Delegations

**Steps**
- Gather list of delegates  
- Configure delegation rules  
- Validate exclusive mode logic  
- Test delegation actions  

### 5.3 Audit Package

**Steps**
- Confirm access for audit team  
- Validate CSV exports  
- Review instance/log structure  

---

## 6. Workflow Design

### 6.1 Rule Design

**Activities**
- Map approval policy  
- Build rule conditions  
- Validate edge cases  
- Review specificity scoring  

### 6.2 Step Design

**Activities**
- Configure approver assignments  
- Enable fallback logic  
- Add conditions and escalation  

### 6.3 Compliance Considerations

**Checks**
- Ensure no self‑approval  
- Ensure no duplicate approvals  
- Validate SoD for each step  

---

## 7. Dashboard Configuration

### 7.1 SLA Dashboard

**Setup**
- Configure thresholds  
- Validate color logic  

### 7.2 Exception Dashboard

**Setup**
- Validate exception categories  
- Confirm saved search health  

### 7.3 Trend Dashboards (Enterprise)

**Setup**
- Verify budget trend period  
- Validate performance insights  

---

## 8. UAT Plan

### 8.1 UAT Preparation

**Checklist**
- Provide training material  
- Prepare scripted test scenarios  
- Create approver test accounts  

### 8.2 UAT Execution

**Tests**
- Full lifecycle testing  
- SoD enforcement testing  
- Delegation testing  
- Budget & AI insight validation  
- Dashboard accuracy  

### 8.3 UAT Sign-Off

**Deliverables**
- Final rule/step set  
- Exception review complete  
- Auditor review complete  

---

## 9. Production Deployment

### 9.1 Deployment Steps

**Steps**
- Install bundle in Production  
- Migrate rules/steps via SDF or manual  
- Deploy scripts under Production roles  
- Validate queue health  

### 9.2 Production Validation

**Checklist**
- Test sample approval  
- Verify dashboards modernize  
- Validate Drawer across roles  
- Confirm Audit Package working  

---

## 10. Training & Handoff

### 10.1 Admin Training

**Topics**
- Rule/step maintenance  
- Compliance settings  
- Exception diagnosis  
- Audit Package export  

### 10.2 Approver Training

**Topics**
- Drawer usage  
- Email approvals  
- Exception awareness  

### 10.3 Auditor Training

**Topics**
- Logs  
- Exceptions  
- Audit Package  
- SoD review  

---

## 11. Post‑Go‑Live Monitoring

### 11.1 First Week Monitoring

**Checklist**
- Queue health  
- Exception volume  
- Drawer performance  
- Dashboard updates  

### 11.2 Long-Term Best Practices

**Recommendations**
- Quarterly rule reviews  
- Monthly SoD report review  
- Annual audit team review  

---

## 12. Related Documentation

- **Pricing & Tiers**  
- **Implementation Partner Guide**  
- **Security Overview**  
- **Audit Evidence Map**  
