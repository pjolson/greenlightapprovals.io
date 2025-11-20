---
title: "Command Center Overview"
description: "Overview of the Greenlight Command Center, including dashboards, metrics, and administrative insights."
section: "Administration"
order: 12
---

The Command Center provides real-time visibility into approval activity, workloads, performance, exceptions, and operational risk.  
It is designed for finance leaders, AP managers, and administrators who need actionable insight into approval operations.

## 1. Overview

The Command Center centralizes:
- Open approvals and workload distribution  
- SLA performance metrics  
- Exception and SoD visibility  
- Budget variance indicators (Pro & Enterprise)  
- High-value and high-risk transaction tracking  
- Historical approval trends  

Dashboards displayed depend on license tier and user role.

## 2. Accessing the Command Center

The Command Center is accessible from:

**Navigation:**  
**Approvals → Command Center**

**Behavior**
- Users must have access to relevant transactions.  
- Admins see all dashboards; approvers see personalized views.  
- Module availability varies by tier (Core, Pro, Enterprise).

## 3. Dashboard Modules

The Command Center contains multiple dashboards grouped by operational theme.

### 3.1 Open Approvals Dashboard

**Fields**
- Pending approvals  
- Approvals by step  
- Workload by user  
- Approvals nearing SLA limits  

**Behavior**
- Updates automatically with queue and instance changes.  
- Enterprise includes drill‑down per department or location.

### 3.2 SLA Performance Dashboard

**Fields**
- SLA compliance rate  
- Late approvals  
- Very late approvals  
- SLA performance by approver  

**Behavior**
- SLA thresholds come from Report Settings.  
- Managers can identify bottlenecks and process delays.

### 3.3 Exception Dashboard

**Fields**
- Open exceptions  
- Critical exceptions  
- Exceptions by type (Assignment, SoD, Queue)  
- Exceptions by rule or transaction type  

**Behavior**
- Exceptions update when logs are written.  
- Enterprise includes trend visualization.

### 3.4 SoD Dashboard (Pro & Enterprise)

**Fields**
- Self‑approval attempts  
- Duplicate approval attempts  
- Enforced violations (Enterprise)  
- SoD by user or role  

**Behavior**
- Pro shows detection-only results.  
- Enterprise includes enforcement and risk scoring.

### 3.5 Budget Intelligence Dashboard (Pro & Enterprise)

**Fields**
- Budget vs actuals  
- Variance by department  
- High‑variance alerts  
- Over‑budget transactions  

**Behavior**
- Variance thresholds come from Report Settings.  
- Enterprise includes additional trend and context indicators.

### 3.6 High‑Value Transaction Dashboard

**Fields**
- Transactions over critical threshold  
- Approver assignment  
- SLA timing  
- Risk score  

**Behavior**
- Critical threshold comes from Report Settings.  
- Helps finance leaders monitor high‑risk purchases.

### 3.7 Performance Dashboard

**Fields**
- Approver performance scoring  
- Team/department scoring  
- Approval cycle time  
- Trend comparisons  

**Behavior**
- Uses performance scoring thresholds defined in Report Settings.  
- Enterprise shows historical trends.

## 4. Dashboard Refresh Behavior

### 4.1 Data Refresh Timing

**Behavior**
- Dashboards refresh on:
  - Instance updates  
  - Queue processing  
  - Exception logging  
  - Rule/step changes  
- Saved search caching may delay updates by a few minutes.

### 4.2 Filters & Drill‑Down

**Behavior**
- Users may filter by:
  - Date range  
  - Department  
  - Subsidiary  
  - Approver  
  - Transaction type  
- Enterprise includes interactive drill‑downs.

## 5. Tier Differences

### 5.1 Core

**Behavior**
- Basic workloads  
- Basic SLA stats  
- No budget dashboards  
- No advanced SoD dashboards  
- No trend analytics

### 5.2 Pro

**Behavior**
- Adds budget dashboards  
- Adds SoD detection dashboard  
- Includes enhanced SLA and workload metrics

### 5.3 Enterprise

**Behavior**
- Full dashboard suite  
- Advanced trend analytics  
- High‑risk transaction monitoring  
- Complete SoD enforcement visibility  
- Performance scoring and advanced reporting

## 6. Troubleshooting Command Center Issues

### Common Issues

**Dashboards Not Loading**
- User permissions missing  
- Saved search execution error  

**Data Not Refreshing**
- Search caching delay  
- Queue processing not running  

**Budget Data Missing**
- Budget Intelligence disabled  
- No NetSuite budgets for selected period  

**SoD Data Not Appearing**
- SoD disabled or not in applicable tier  

## 7. Related Documentation

- **Report Settings Guide**  
- **Budget Intelligence Guide**  
- **Exception Detection Guide**  
- **Segregation of Duties (SoD) Guide**  
- **Approval Drawer Guide**