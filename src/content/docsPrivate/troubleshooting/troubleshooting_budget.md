---
title: "Budget Troubleshooting"
description: "Troubleshooting guide for issues related to Budget Intelligence, variance calculations, missing budgets, and Drawer budget insight behavior."
section: "Troubleshooting"
order: 40
---

This guide covers common issues with Budget Intelligence, including missing budget data, incorrect variance calculations, slow Drawer performance, and classification mismatches.

Use this guide when the Budget Block is missing, incomplete, or showing unexpected values.

## 1. Budget Block Not Appearing

### 1.1 Budget Intelligence Disabled

**Possible Causes**
- Budget Intelligence turned off in Settings  
- Wrong tier (Core tier has no budget features)  

**Resolution**
- Enable Budget Intelligence in Settings  
- Verify account is Pro or Enterprise tier  

### 1.2 No Budgets for Selected Classification

**Possible Causes**
- Subsidiary/department/class/location combination not defined in NetSuite budgets  
- Budget period missing  

**Resolution**
- Validate NetSuite budget configuration  
- Confirm budgets exist for selected period  

### 1.3 Budget Engine Error

**Possible Causes**
- SuiteQL error  
- Budget Engine returned partial or empty data  

**Resolution**
- Review exceptions shown in the Drawer  
- Validate SuiteAnalytics performance  
- Recalculate or re-save the transaction  

---

## 2. Incorrect Variance or Budget Values

### 2.1 Wrong Budget Period

**Possible Causes**
- Period mismatch (month vs quarter vs YTD)  
- Settings configured incorrectly  

**Resolution**
- Review Default Budget Period in Settings  
- Confirm transaction aligns with configuration  

### 2.2 Actuals Not Matching Expected Values

**Possible Causes**
- Actuals include additional GL accounts  
- Unposted transactions not included  
- NetSuite posting delays  

**Resolution**
- Validate GL mapping  
- Confirm posting status  
- Review actuals via SuiteAnalytics  

### 2.3 Pending Amount Unexpected

**Possible Causes**
- Transaction amount changed mid-approval  
- Budget applied from previous version of the record  

**Resolution**
- Resave the transaction  
- Review pending amount behavior  

---

## 3. Drawer Performance Issues from Budget Engine

### 3.1 Drawer Slow to Load

**Possible Causes**
- Large budget datasets  
- SuiteQL contention or slow query  
- Excessive budget classifications  

**Resolution**
- Verify classification combinations  
- Review SuiteAnalytics performance  
- Reduce unnecessary budget fields  

### 3.2 Budget Block Rendering Delay

**Possible Causes**
- Budget Engine retrying due to errors  
- Cached data outdated  

**Resolution**
- Hard refresh the page  
- Resave the transaction  

---

## 4. Classification & Data Issues

### 4.1 Department/Class/Location Missing

**Possible Causes**
- Required classification fields blank  
- Custom segment mapping incomplete  

**Resolution**
- Update classification fields  
- Re-evaluate rule matching  

### 4.2 Budget Category Mapping Incorrect

**Possible Causes**
- Account-to-budget category mismatch  
- Wrong GL accounts contributing to actuals  

**Resolution**
- Verify account mapping in budgets  
- Review budget category settings  

---

## 5. Troubleshooting Checklist

**Checklist**
- Confirm Budget Intelligence enabled  
- Validate budgets exist for classification set  
- Check exceptions in the Drawer  
- Confirm correct budget period  
- Review actuals and GL mapping  
- Ensure classifications are complete  

---

## 6. Related Documentation

- **Budget Intelligence Guide**  
- **Budget Engine Architecture**  
- **Approval Drawer Troubleshooting**  
- **Report Settings Guide**