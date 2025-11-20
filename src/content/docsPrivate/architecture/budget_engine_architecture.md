---
title: "Budget Engine Architecture"
description: "Technical deep dive into how Greenlight loads, calculates, and displays real-time budget insights."
section: "Architecture"
order: 60
---

The Budget Engine powers Greenlight’s real-time budget insights, variance calculations, and budget analytics used in the Approval Drawer and Command Center.  
This document explains the internal architecture, data sources, performance model, and tier-based functionality.

## 1. Overview

The Budget Engine is responsible for:
- Loading NetSuite budgets via SuiteQL  
- Grouping budgets by subsidiary, department, class, and location  
- Calculating actuals for the selected budget period  
- Applying pending transaction amounts  
- Computing variances and variance percentage  
- Returning structured data to the Drawer and dashboards  

Budget Intelligence is available in:
- **Pro** – Standard variance and basic insight  
- **Enterprise** – Trend analysis, multi-period comparisons, extended insight  

## 2. Data Sources

### 2.1 NetSuite Budgets (Primary Source)

**Fields**
- Subsidiary  
- Department  
- Class  
- Location  
- Account  
- Period  
- Amount  

**Behavior**
- Loaded using SuiteQL for performance and reliability.  
- All available budgets for period and classifications are aggregated.  

### 2.2 Actuals (GL Summary)

**Fields**
- Transaction amounts  
- Posted actuals for the period  
- Classification-based filtering  

**Behavior**
- Calculated using SuiteQL summary queries.  
- Includes journal entries, vendor bills, POs (posted), and relevant expenses.  

### 2.3 Pending Amount (Current Transaction)

**Behavior**
- The amount from the in-flight transaction  
- Combined with actuals before variance computation  

## 3. Data Flow Architecture

The Budget Engine executes a multi-stage pipeline.

### 3.1 Stage 1 – Classification Extraction

**Behavior**
- Extracts transaction subsidiary, department, class, location  
- Ignores fields not relevant to budget configuration  
- Validates required fields  

### 3.2 Stage 2 – Budget Lookup

**Behavior**
- Queries the budget table using SuiteQL  
- Matches based on classifications and period  
- Returns a budget bucket (total budget amount)  

### 3.3 Stage 3 – Actuals Lookup

**Behavior**
- Loads actuals for the same classification set  
- Handles multiple GL accounts  
- Uses summarized SuiteQL queries for speed  

### 3.4 Stage 4 – Variance Calculation

**Behavior**
- Variance = **Budget – Actuals – Pending**  
- Variance % = **Variance / Budget**  

### 3.5 Stage 5 – Insight Construction

**Behavior**
- Normalizes numbers  
- Applies color logic (green/yellow/red)  
- Adds contextual messages (Enterprise)  
- Packages the data for the Drawer and dashboards  

## 4. Performance & Optimization

The Budget Engine is optimized for speed and governance efficiency.

### 4.1 Use of SuiteQL

**Behavior**
- Queries budgets and actuals in single SQL requests  
- Avoids record-by-record iteration  
- Reduces governance consumption significantly  

### 4.2 Caching Layer (Internal)

**Behavior**
- Frequently accessed budgets cached in memory during script run  
- Drawer Suitelet may include short-lived view caching  

### 4.3 Deferred Processing

**Behavior**
- Heavy analytics (Enterprise trends) offloaded to scheduled scripts  
- Drawer only loads essential insight  

## 5. Tier-Based Behavior

### 5.1 Pro Tier

**Behavior**
- Standard variance calculation  
- Single-period analysis  
- Basic insight text  

### 5.2 Enterprise Tier

**Behavior**
- Multi-period trend analysis  
- Vendor-specific budget impact estimates  
- Extended insight text  
- Integration with AI insight generator  

## 6. Error & Exception Handling

### 6.1 Missing Budgets

**Behavior**
- Drawer hides Budget block  
- Logs exception with type “Missing Budget Data”  

### 6.2 Classification Mismatch

**Behavior**
- Department/Class/Location mismatch prevents lookup  
- Returns “No budget available for this classification”  

### 6.3 SuiteQL Errors

**Behavior**
- Logged as exceptions  
- User sees “Budget data unavailable” message  

### 6.4 Extreme Variance Conditions

**Behavior**
- Large negative variance triggers high-visibility warnings  
- Visible in Drawer and dashboards  

## 7. Interaction with Other Components

### 7.1 Approval Drawer

**Behavior**
- Drawer calls Budget Engine as part of data payload  
- User sees variance summary and insight text  

### 7.2 Command Center

**Behavior**
- Budget Dashboard uses stored budget data + SuiteQL queries  
- Enterprise includes comparison over time  

### 7.3 Audit Package

**Behavior**
- Variance data included in Audit Package (Enterprise)  

## 8. Troubleshooting Budget Engine Issues

### Common Issues

**Budget Block Missing**
- Budget Intelligence disabled  
- No budgets set for selected period  
- Incorrect classifications  

**Large Variance Unexpected**
- Actuals include more GL accounts than expected  
- Pending amount unusually large  
- Multi-period trends affecting Enterprise results  

**Drawer Load Slow**
- Very large budget or actuals dataset  
- SuiteQL performance degraded  

## 9. Related Documentation

- **Budget Intelligence Guide**  
- **Technical Architecture Overview**  
- **Command Center Dashboards Reference**  
- **Approval Drawer Guide**
