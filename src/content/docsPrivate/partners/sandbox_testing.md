---
title: "Sandbox Testing Guide"
description: "Comprehensive testing guide for validating Greenlight Approvals in a NetSuite Sandbox environment before Production deployment."
section: "Partners"
order: 50
---

This guide provides a full testing framework for partners and administrators validating Greenlight Approvals inside a NetSuite Sandbox.  
It ensures workflows, assignments, budgets, and exception handling all work correctly before promoting configurations to Production.

## 1. Overview

Sandbox testing focuses on validating:

- Rule and step configuration  
- Workflow sequencing  
- Budget and AI insight accuracy  
- Action behavior (approve/reject)  
- Queue processing  
- Delegation  
- SoD detection  
- Exceptions and error handling  
- Drawer performance across roles  

This guide defines the complete testing plan for a smooth go‑live.

---

## 2. Preparing the Sandbox

### 2.1 Pre-Test Setup

**Checklist**
- Install Greenlight bundle/SuiteApp  
- Configure Settings and Report Settings  
- Add appropriate permissions to test roles  
- Import or create sample AP/P2P transactions  
- Set up multiple approver test accounts  

### 2.2 Data Migration Considerations

**Behavior**
- Sandbox may not contain full production budget or classification data  
- Import small representative datasets as needed  
- Ensure vendor, department, class, and location values match Production  

---

## 3. Rule & Step Testing

### 3.1 Rule Matching Validation

**Steps**
- Create test transactions across all classification combinations  
- Confirm correct rule fires  
- Confirm fallback rule triggers on unmatched cases  

### 3.2 Step Sequence Testing

**Checks**
- Step numbers correct  
- Approvers assigned correctly  
- Step-level conditions evaluated properly  
- Rejections return workflow to submitter  
- Resubmission triggers new instance  

### 3.3 Negative Testing

**Examples**
- Missing classification  
- Incorrect currency  
- Out-of-range amount  
- Disabled rule  

---

## 4. Drawer Testing

### 4.1 Drawer Visibility

**Checks**
- Drawer appears for submitter  
- Drawer appears for assigned approver  
- Drawer hidden for unauthorized roles  

### 4.2 Drawer Content Validation

**Checks**
- Details tab shows expected fields  
- Timeline entries accurate  
- Comments tab functioning  
- Budget block present (Pro/Enterprise)  
- AI insights present (Pro/Enterprise)  
- Exceptions at top of Drawer  

### 4.3 Drawer Action Testing

**Steps**
- Approve transaction  
- Reject transaction  
- Confirm queue item created  
- Validate Drawer refreshes  

---

## 5. Queue Processor Validation

### 5.1 Approval Queue

**Checks**
- Queue script running on schedule  
- Queue items processed correctly  
- Logs updated on approval  

### 5.2 Email Approval Queue

**Checks**
- Email link generates queue item  
- Queue correctly processes item  
- SoD logic applied properly  

### 5.3 Queue Error Testing

**Examples**
- Assign to inactive user  
- Missing approver  
- Data error or SoD enforcement  

---

## 6. Exception & SoD Testing

### 6.1 Exception Testing

**Examples**
- Assignment failure  
- Data mismatch  
- Invalid workflow configuration  
- Budget Engine error  
- AI insight failure  

### 6.2 SoD Testing

**Tests**
- Self-approval attempt  
- Duplicate approval attempt  
- Delegation conflict  
- Enforcement mode blocking action  

---

## 7. Budget & AI Insight Testing

### 7.1 Budget Testing

**Steps**
- Validate variance calculation  
- Validate pending amount logic  
- Validate budget period configuration  
- Confirm hidden block when no budget exists  

### 7.2 AI Insights Testing

**Steps**
- Confirm summary insight loads  
- Confirm vendor insight loads  
- Validate fallback behavior when insufficient data  

---

## 8. Email Approval Testing

### 8.1 Functional Testing

**Steps**
- Approve via email  
- Reject via email  
- Add comments  
- Confirm Drawer reflects action  

### 8.2 Token Validation Testing

**Tests**
- Expired token  
- Tampered link  
- Incorrect user  

### 8.3 Negative Testing

**Examples**
- Invalid step  
- Missing instance  
- Unauthorized user  

---

## 9. Delegation Testing

### 9.1 Active Delegation

**Checks**
- Drawer displays “Acting as delegate”  
- Logs store delegator/delegate identity  
- Approver can take action  

### 9.2 Expired Delegation

**Check**
- Delegation not applied  
- Warning appears if configured  

---

## 10. Command Center Testing

### 10.1 Dashboard Validation

**Checks**
- SLA dashboard metrics updated  
- Budget dashboard displays variance  
- Exception dashboard populated  
- Performance scoring accurate (Enterprise)  

### 10.2 Role-Based Access

**Tests**
- Manager can view team data  
- Auditor can review logs and metrics  
- Unauthorized roles blocked  

---

## 11. End-to-End UAT Scenarios

### 11.1 Standard Flow

**Scenario**
- Submit → Approve Step 1 → Approve Step 2 → Completed  

### 11.2 Rejection Flow

**Scenario**
- Submit → Approve Step 1 → Reject Step 2 → Resubmit  

### 11.3 Exception Flow

**Scenario**
- Submit → Exception triggered → Admin resolves → Retry approval  

### 11.4 SoD Block Flow

**Scenario**
- Submit → Approver violates SoD → Enforcement blocks action  

---

## 12. Pre-Go‑Live Checklist

**Checklist**
- All rules validated  
- All steps validated  
- Budget/AI functioning  
- Drawer tested across all roles  
- Email approvals validated  
- Queue processors healthy  
- Delegation rules tested  
- Dashboards validated  
- Scripts deployed correctly  
- No critical exceptions remaining  

---

## 13. Related Documentation

- **Implementation Partner Guide**  
- **Approval Rules Guide**  
- **Workflow Behavior & Lifecycle**  
- **Troubleshooting Guide (Master)**  
- **SoD Troubleshooting**