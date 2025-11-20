---
title: "Budget Intelligence Guide"
description: "How Greenlight analyzes budgets, calculates variances, and displays budget insights in approvals."
section: "Administration"
order: 70
---

Budget Intelligence enhances approval accuracy by comparing transaction amounts against NetSuite budgets in real time.  
This guide explains how budget data is evaluated, how variances are calculated, and how insights appear in the Greenlight Approval Drawer and Command Center.

## 1. Overview

Budget Intelligence provides:
- Real‑time budget vs actuals comparison  
- Variance indicators  
- Spend trend context  
- Budget warnings in the Approval Drawer  
- Budget analytics in the Command Center  

Budget Intelligence is available in:
- **Pro** – Standard budget insight  
- **Enterprise** – Full insight with deeper variance context  

## 2. Enabling Budget Intelligence

Budget intelligence settings are found in **Approvals → Settings**.

### 2.1 Activation

**Fields**
- **Enable Budget Intelligence** – Turns on all budget logic.  
- **Default Budget Period** – Month, Quarter, or YTD.  

**Behavior**
- Budgets load automatically based on the selected period.  
- If budgets are not configured in NetSuite, the budget block will not appear.

> **Tier Notes:**  
> Core does not include budget features.  
> Pro includes standard variance calculations.  
> Enterprise includes extended variance analysis and contextual insights.

## 3. Budget Data Sources

Greenlight reads live NetSuite budget data using SuiteQL.

### 3.1 Required NetSuite Budgets

**Fields**
- Subsidiary  
- Department  
- Class  
- Location  
- Account (GL)  

### 3.2 Actuals Source

**Fields**
- Posted transactions within the period  
- Summarized by GL account and classification  

**Behavior**
- Budget vs actuals is calculated at the transaction level.  
- Exceptions appear when a budget period has no active budget.

## 4. Budget Variance Calculation

Greenlight computes real‑time variances at approval time.

### 4.1 Variance Formula

**Behavior**
- Variance = **Budget Amount − Actuals − Pending Transaction Amount**  
- Variance Percentage = **Variance / Budget**  

### 4.2 Variance Types

**Fields**
- **Positive Variance** – Remaining budget available.  
- **Near Limit** – Less than 10% remaining.  
- **Over Budget** – Negative variance.  

### 4.3 Enterprise Enhancements

**Fields**
- Multi‑period trend comparison  
- Historical spend projections  
- Vendor‑specific budget impact estimation  

## 5. Approval Drawer Behavior

The Budget Block appears in the Greenlight Approval Drawer when Budget Intelligence is enabled.

### 5.1 Drawer Fields

**Fields**
- Period Budget  
- Actuals  
- Pending Amount  
- Variance  
- Variance Percentage  

### 5.2 Drawer Behavior

**Behavior**
- Variance is color‑coded (green, yellow, red).  
- Enterprise shows expanded insight lines (e.g., “This vendor typically exceeds budget in Q4”).  
- Budget insights appear at the top of the **Details** tab.

> **Note:** AI Insights and Budget Intelligence are separate modules.  
> Budget data does not require AI.

## 6. Command Center Integration

Budget intelligence powers several dashboards.

### 6.1 Budget Dashboards

**Fields**
- Budget vs Actuals overview  
- High‑variance alerts  
- Departmental spend tracking  
- Trend analysis  

### 6.2 Tier Behavior

**Behavior**
- Pro shows standard budget dashboards.  
- Enterprise includes advanced trend and variance visualizations.

## 7. Troubleshooting Budget Issues

### Common Issues

**Budget Block Not Appearing**
- Budget Intelligence disabled  
- No budget data for the selected period  
- Classification (Dept/Class/Location) mismatch  

**Incorrect Variance**
- Pending amount not included if transaction not yet saved  
- Incorrect budget period selection  
- Budget not configured for subsidiary  

**Slow Drawer Load**
- Very large budget datasets  
- Non‑indexed fields in NetSuite budgets  

## 8. Related Documentation

- **Settings Guide**  
- **Approval Drawer Guide**  
- **Command Center Overview**  
- **Report Settings Guide**  