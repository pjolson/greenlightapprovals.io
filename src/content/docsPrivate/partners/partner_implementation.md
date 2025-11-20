---
title: "Implementation Partner Guide"
description: "End-to-end guide for NetSuite partners implementing Greenlight Approvals for customers, including deployment, configuration, testing, and best practices."
section: "Partners"
order: 10
---

This guide is designed for NetSuite partners, consultants, and implementation teams deploying Greenlight Approvals for customers.  
It provides a structured approach to installation, configuration, testing, workflow design, and go-live readiness.

## 1. Overview

Implementation partners are responsible for:

- Installing and configuring Greenlight  
- Designing rule and step structures  
- Ensuring workflow alignment with customer policy  
- Training approvers, submitters, and administrators  
- Conducting UAT and production deployment  
- Providing post-go-live support  

This guide outlines best practices and required steps for a successful engagement.

## 2. Pre‑Implementation Requirements

### 2.1 Customer Prerequisites

**Requirements**
- NetSuite roles defined (Approvers, Finance, Admin)  
- Organizational approval policy documented  
- Subsidiary, department, class, location structure finalized  
- Budgeting process in place (for Pro and Enterprise tiers)  

### 2.2 Greenlight Account Requirements

**Fields**
- License tier confirmed  
- Bundle access or SuiteApp availability  
- Sandbox access provisioned for implementation  

### 2.3 Project Kickoff Checklist

**Checklist**
- Confirm scope  
- Identify workflows to automate  
- Determine approver hierarchy  
- Gather sample transactions and edge cases  

---

## 3. Deployment Steps

Partners should always deploy first in Sandbox.

### 3.1 Installation

**Steps**
- Install Greenlight bundle / SuiteApp  
- Confirm custom records created  
- Deploy key scripts (Drawer, UE, Suitelets, Queue scripts)  
- Run Post‑Install Checklist  

### 3.2 Initial Setup

**Actions**
- Configure Settings (SoD, AI Insights, Budget Intelligence)  
- Configure Report Settings (SLA, thresholds, scoring)  
- Add role permissions  
- Assign access to approvers and managers  

---

## 4. Designing Approval Workflows

### 4.1 Mapping Customer Approval Policies

**Steps**
- Review approval matrix  
- Translate approval logic into Rules  
- Break down steps for each Rule  
- Identify edge cases (vendor types, unusual spend categories)  

### 4.2 Building Rules

**Best Practices**
- Start with simplest rules  
- Avoid overlapping rule criteria  
- Use amount ranges consistently  
- Test rule evaluation with sample data  

### 4.3 Building Steps

**Best Practices**
- Use clear step naming conventions  
- Ensure approver availability and delegation logic  
- Check for SoD conflicts early  
- Use fallback approvers when required  

---

## 5. Testing Strategy (Sandbox)

### 5.1 Unit Testing

**Actions**
- Test rule matching  
- Test step sequencing  
- Test conditional logic  
- Validate Drawer load performance  

### 5.2 Workflow Simulation

**Actions**
- Run end‑to‑end submission → approval → rejection → re‑submit  
- Verify queue processing  
- Validate step transitions  

### 5.3 Exception & SoD Testing

**Actions**
- Intentionally trigger SoD violations  
- Test missing budgets  
- Test incorrect assignments  
- Verify warnings appear in Drawer  

---

## 6. Data Validation & UAT

### 6.1 UAT Preparation

**Steps**
- Provide user training materials  
- Prepare sample transactions  
- Set up approver test accounts  

### 6.2 UAT Execution

**Checklist**
- Validate rule and step logic  
- Validate timeline entries  
- Validate budget variance  
- Validate AI insights (if tier supports)  
- Validate email approvals  

### 6.3 UAT Sign‑Off

**Deliverables**
- UAT summary  
- Final rule set  
- Integration requirements confirmed  

---

## 7. Production Deployment

### 7.1 Deployment Steps

**Actions**
- Install in Production  
- Migrate Rule and Step configuration  
- Deploy scripts with Production roles  
- Validate queue scripts running  

### 7.2 Production Verification

**Checklist**
- Test a low‑value approval  
- Validate Drawer visibility  
- Confirm email approvals work  
- Verify dashboards display data  

---

## 8. Training & Handoff

### 8.1 Admin Training

**Topics**
- Managing rules and steps  
- Using Settings and Report Settings  
- Troubleshooting basic issues  
- Reviewing exceptions and SoD warnings  

### 8.2 Approver & Submitter Training

**Content**
- How to use the Drawer  
- How to approve via email  
- How to use My Worklist  

### 8.3 Partner Handoff Package

**Deliverables**
- Final rule set  
- Training materials  
- Support contacts  
- Post‑go‑live monitoring plan  

---

## 9. Post‑Go‑Live Support

### 9.1 Hypercare Period

**Recommendations**
- Monitor queue performance  
- Review exceptions daily  
- Verify no stuck workflows  

### 9.2 Long‑Term Support

**Actions**
- Update rules as customer changes  
- Help optimize dashboard components  
- Assist with periodic audits  

---

## 10. Implementation Best Practices

**Recommendations**
- Keep Rules simple and avoid overlap  
- Document every approval path  
- Use Sandbox extensively  
- Confirm approver availability  
- Review SoD impact early  
- Validate budget engine behavior for all classifications  

---

## 11. Related Documentation

- **Installation Guide**  
- **Approval Rules Guide**  
- **Approval Steps Guide**  
- **Workflow Behavior & Lifecycle**  
- **Troubleshooting Guide (Master)**  