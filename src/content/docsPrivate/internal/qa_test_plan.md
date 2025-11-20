---
title: "Internal QA Test Plan"
description: "Comprehensive internal QA test plan for validating Greenlight functionality, performance, security, and compliance before release."
section: "Internal"
order: 80
---

This Internal QA Test Plan defines the required testing for every Greenlight release.  
It ensures stability, correctness, security, and SDN readiness.

## 1. Overview

The QA process validates:

- Rule evaluation  
- Step sequencing  
- Drawer UI  
- Queue processors  
- Budget & AI engines  
- Delegation behavior  
- SoD enforcement  
- Exception handling  
- Dashboards  
- Logs & audit integrity  

All components must pass before release is approved.

---

## 2. Testing Environment

### 2.1 Required Environments

**Environments**
- Developer sandbox  
- Internal QA sandbox  
- Partner/UAT sandbox  

### 2.2 Pre-Test Setup

**Checklist**
- Install latest bundle build  
- Deploy scripts & Suitelets  
- Configure Settings & Report Settings  
- Prepare sample transactions  
- Activate queue scripts  

---

## 3. Functional Testing

### 3.1 Rule Engine Testing

**Tests**
- Simple rule match  
- Multi-filter rule matching  
- Overlapping rules  
- Custom segment conditions  
- Amount range evaluation  
- Multi-currency rules  

### 3.2 Step Engine Testing

**Tests**
- Step ordering  
- Step skipping logic  
- Conditional steps  
- Escalation logic  
- Dynamic approver resolution  
- Fallback approver behavior  

### 3.3 Workflow Lifecycle

**Tests**
- Submit → Approve → Complete  
- Reject → Resubmit → Approve  
- Amend transaction → Re-evaluation  
- Cancellation handling  

---

## 4. Drawer Testing

### 4.1 Rendering

**Checks**
- Drawer appears for all permitted roles  
- Drawer hidden for unauthorized roles  
- Smooth rendering (no flicker/double-injection)  

### 4.2 UI Validation

**Checks**
- Details tab fully displays context  
- Timeline entries correct  
- Comments tab working  
- Budget block present (Pro/Enterprise)  
- AI insights present (Pro/Enterprise)  
- Exception banners appear  

### 4.3 Action Testing

**Tests**
- Approve  
- Reject  
- Load after approval  
- Timeline updates immediately  

---

## 5. Queue Processor Testing

### 5.1 Action Queue

**Tests**
- Approve/Reject → Queue item created  
- Queue script picks up item  
- Instance updated correctly  
- Logs written properly  

### 5.2 Email Approval Queue

**Tests**
- Email link creates queue item  
- Token validation success  
- Invalid token rejection  
- Expired token rejection  

### 5.3 Error Conditions

**Examples**
- Assignment failure  
- Stale instance  
- Data corruption scenario  
- Queue retry behavior  

---

## 6. Budget Engine Testing

### 6.1 Budget Lookup

**Tests**
- Matching classification combinations  
- Missing budgets  
- Multi-period trends (Enterprise)  

### 6.2 Variance Calculations

**Tests**
- Correct variance value  
- Pending amount logic  
- Large and edge-case numbers  

### 6.3 Drawer Integration

**Checks**
- Budget block loads  
- Error fallback works  
- Performance acceptable  

---

## 7. AI Insights Testing

### 7.1 Insight Generation

**Tests**
- Transaction insights  
- Vendor insights  
- Budget insights  

### 7.2 Error & Fallback Logic

**Tests**
- Missing data  
- Engine failure simulation  
- Tier-based filtering  

---

## 8. Delegation Testing

### 8.1 Active Delegation

**Tests**
- Acting-as delegate in Drawer  
- Delegation logs  
- SoD validation with delegation  

### 8.2 Expired/Invalid Delegation

**Tests**
- Delegation not applied  
- Drawer warning works  

---

## 9. SoD Testing

### 9.1 Detection Mode (Pro & Enterprise)

**Tests**
- Self-approval detection  
- Duplicate approvals  
- Delegation conflicts  

### 9.2 Enforcement Mode (Enterprise)

**Tests**
- Blocking unauthorized approval  
- Auto-skip behavior  
- Log integrity  

---

## 10. Exception Testing

### 10.1 Core Exceptions

**Tests**
- Assignment failure  
- Step configuration errors  
- Data mismatch  

### 10.2 Extended Exceptions (Enterprise)

**Tests**
- Queue-level exceptions  
- Budget exceptions  
- AI insight exceptions  

---

## 11. Dashboard Testing

### 11.1 SLA Dashboard

**Tests**
- SLA colors  
- SLA thresholds applied  

### 11.2 Budget Dashboard

**Tests**
- Variance visibility  
- Trend data (Enterprise)  

### 11.3 Exception Dashboard

**Tests**
- Severity filtering  
- Totals match saved searches  

### 11.4 Performance Dashboard (Enterprise)

**Tests**
- Approver scoring  
- Department scoring  

---

## 12. Audit Integrity Testing

### 12.1 Log Completeness

**Checks**
- Each step action logged  
- Comments retained  
- SoD, delegation, exception contexts captured  

### 12.2 Audit Package Export

**Tests**
- ZIP successfully generated  
- All CSVs populated  
- Timestamp correctness  

---

## 13. Security Testing

### 13.1 Token & Identity Tests

**Tests**
- HMAC token validation  
- Invalid user detection  
- Replay attempts blocked  

### 13.2 Role-Based Access

**Checks**
- Drawer restricted properly  
- Dashboard access correct  
- Settings locked down  

---

## 14. Performance Testing

### 14.1 Drawer Load Speed

**Targets**
- <1.5 seconds typical  
- <3 seconds worst-case  

### 14.2 Queue Throughput

**Targets**
- Queue clears within 1–3 minutes  
- No backlogs during heavy testing  

### 14.3 Dashboard Load Time

**Targets**
- <2 seconds typical  

---

## 15. Release Approval Criteria

### 15.1 Must Pass

**Requirements**
- All critical tests  
- All major functional tests  
- All security & SoD tests  
- No queue failures  
- No broken dashboards  

### 15.2 Optional / Minor

**Includes**
- Low-impact UI imperfections  
- Minor dashboard delays  

---

## 16. Related Documentation

- **Internal Release Process**  
- **Sandbox Testing Guide**  
- **Implementation Partner Guide**  
- **Troubleshooting Guide (Master)**  