---
title: "Command Center Dashboards Reference"
description: "Detailed reference for each dashboard module available in the Greenlight Command Center."
section: "Administration"
order: 13
---

The Command Center includes multiple dashboards that visualize approval activity, performance, exceptions, and operational risk.  
This reference provides a detailed breakdown of each dashboard, its metrics, and its tier‑specific behavior.

## 1. Overview

Each dashboard module serves a distinct purpose and helps administrators monitor:
- Approval throughput  
- SLA compliance  
- Exception volume  
- SoD violations  
- Budget variances  
- High‑value transaction activity  
- Approver performance  

Dashboards available depend on the customer’s license tier.

## 2. Dashboard List by Tier

### 2.1 Core

**Dashboards**
- Open Approvals  
- SLA Performance (Basic)  
- Workload Distribution  

### 2.2 Pro

**Dashboards**
- All Core dashboards  
- Budget Intelligence dashboard  
- SoD Detection dashboard  
- Enhanced SLA metrics  

### 2.3 Enterprise

**Dashboards**
- All Pro dashboards  
- High‑Value Transactions  
- Exception Trends  
- Performance Scoring  
- Advanced SoD Enforcement views  
- Historical Trend Analysis  

## 3. Dashboard Definitions

Each dashboard below includes the metrics, fields, and behavior relevant to that module.

### 3.1 Open Approvals

**Fields**
- Pending approvals  
- Approvals by step  
- Aging buckets  
- SLA proximity indicators  

**Behavior**
- Shows active workload across users and teams.  
- Refreshes after queue processing and instance updates.

### 3.2 SLA Performance

**Fields**
- SLA compliance rate  
- Late approvals  
- Very late approvals  
- SLA by team or approver  

**Behavior**
- Uses SLA thresholds defined in Report Settings.  
- Enterprise includes historical trend graphs.

### 3.3 Exception Dashboard

**Fields**
- Open exceptions  
- Critical exceptions  
- Exceptions by category  
- Exceptions by transaction type  

**Behavior**
- Exceptions update when logs are written.  
- Enterprise includes 30‑day trend visualization.

### 3.4 SoD Dashboard

**Fields**
- Self‑approval attempts  
- Duplicate approval attempts  
- Delegation conflicts  
- Enforcement blocks (Enterprise)  

**Behavior**
- Pro shows detection‑only data.  
- Enterprise includes full enforcement history.

### 3.5 Budget Intelligence Dashboard

**Fields**
- Budget vs actuals  
- Variance percentage  
- Over‑budget transactions  
- Budget variance alerts  

**Behavior**
- Data sourced from NetSuite budgets via SuiteQL.  
- Enterprise includes multi‑period comparisons.

### 3.6 High‑Value Transactions

**Fields**
- Transactions over critical threshold  
- Step assignment  
- SLA timing  
- Risk score  

**Behavior**
- Threshold sourced from Critical Amount in Report Settings.  
- Enterprise includes detailed drill‑downs.

### 3.7 Performance Dashboard

**Fields**
- Approver performance scores  
- Department performance scoring  
- Average approval cycle time  
- Performance trends  

**Behavior**
- Scoring thresholds defined in Report Settings.  
- Enterprise includes historical performance analysis.

### 3.8 Exception Trends (Enterprise)

**Fields**
- Daily/weekly/monthly exception volume  
- Exception type breakdown  
- Risk clustering  

**Behavior**
- Uses immutable exception logs.  
- Helps identify systemic issues.

### 3.9 Historical Trend Analysis (Enterprise)

**Fields**
- 12‑month approval trends  
- SLA trends  
- High‑risk transaction patterns  

**Behavior**
- Aggregates historical data automatically.  
- Useful for audit readiness and forecasting.

## 4. Filters & Interactivity

### 4.1 Filter Options

**Fields**
- Date range  
- Subsidiary  
- Department  
- Role  
- Approver  
- Transaction type  

### 4.2 Behavior

**Behavior**
- Filters apply across dashboards where applicable.  
- Enterprise includes drill‑down links from summary tiles.

## 5. Data Refresh Logic

### 5.1 Update Triggers

**Behavior**
- Dashboard data updates when:
  - Approval Instances change  
  - Queue processing occurs  
  - Exceptions are logged  
  - Rule/step configuration changes  

### 5.2 Saved Search Dependencies

**Behavior**
- Some dashboards rely on saved searches.  
- NetSuite caching may delay updates by several minutes.

## 6. Troubleshooting Dashboards

### Common Issues

**Dashboard Shows No Data**
- User lacks permission to underlying searches  
- Saved search error  
- Tier restrictions  

**Data Not Updating**
- Queue processor not running  
- Cache delay  

**Budget Dashboard Empty**
- No budgets configured  
- Budget Intelligence disabled  

**SoD Dashboard Disabled**
- SoD not enabled or Core tier  

## 7. Related Documentation

- **Command Center Overview**  
- **Report Settings Guide**  
- **Budget Intelligence Guide**  
- **Exception Detection Guide**
