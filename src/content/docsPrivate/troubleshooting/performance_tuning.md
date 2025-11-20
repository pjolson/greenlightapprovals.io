---
title: "Performance Tuning Guide"
description: "Guidance for optimizing Greenlight performance across the Approval Drawer, queue processors, dashboards, and SuiteScript operations."
section: "Troubleshooting"
order: 80
---

This guide covers strategies to improve performance and reduce latency across the Greenlight system.  
Use this guide if the Approval Drawer is slow, queues back up, or dashboards lag behind workflow changes.

## 1. Overview

Performance tuning focuses on:

- Approval Drawer load time  
- Queue processor throughput  
- Budget and AI engine efficiency  
- Saved search and SuiteQL performance  
- Dashboard refresh cycles  
- Avoiding governance overages  

Each section contains recommended optimizations for administrators and developers.

## 2. Approval Drawer Performance

### 2.1 Drawer Slow to Load

**Possible Causes**
- Large approval instance with many logs  
- Heavy budget or AI processing  
- Slow SuiteQL queries  
- Script injection conflicts  

**Resolution**
- Reduce unnecessary customizations on the form  
- Limit excessive classification or segment data  
- Optimize budget classifications  
- Validate SuiteQL indexes via SuiteAnalytics  

### 2.2 Drawer UI Lag

**Possible Causes**
- Conflicting client scripts  
- Duplicate Drawer deployments  
- Large timeline payload  

**Resolution**
- Remove duplicate script deployments  
- Consolidate or disable conflicting scripts  
- Consider archiving older logs (Enterprise only)  

---

## 3. Queue Processor Performance

### 3.1 Queue Backlog Growing

**Possible Causes**
- Scheduled script frequency too low  
- Heavy transactions causing long run-time  
- Competing scripts consuming governance  
- Large volume of concurrent approvals  

**Resolution**
- Increase scheduled script frequency  
- Stagger batches to avoid peak hours  
- Allocate additional threads (if account allows)  
- Reduce heavy UE logic  

### 3.2 Queue Items Stuck in “Pending”

**Possible Causes**
- Script halted mid-batch  
- Governance threshold exceeded  
- Workflow exception preventing progression  

**Resolution**
- Restart scheduled script  
- Review script governance logs  
- Check Drawer exceptions for blocking issues  

---

## 4. Budget Engine Performance

### 4.1 Budget Block Slowing Drawer

**Possible Causes**
- Too many budget classification combinations  
- SuiteQL contention  
- Budget datasets too large  

**Resolution**
- Limit budget categories  
- Reduce unnecessary segment usage  
- Validate SuiteAnalytics throughput  

### 4.2 Trend Analysis Slow (Enterprise)

**Possible Causes**
- Multi-period analysis computing too large a dataset  
- Budget history fragmented  

**Resolution**
- Run trend analysis during off-hours  
- Consolidate fragmented budgets  

---

## 5. AI Insights Performance

### 5.1 Insights Delayed or Missing

**Possible Causes**
- Data insufficient  
- Engine fallback triggered  
- Tier-based restrictions  

**Resolution**
- Validate transaction fields  
- Reduce unnecessary classifications  
- Check for Budget Engine or SuiteQL failures  

### 5.2 Insights Causing Lag

**Possible Causes**
- Complex multi-variable analysis (Enterprise)  
- Drawer payload too large  

**Resolution**
- Limit insights through Settings  
- Reduce segments that increase transaction complexity  

---

## 6. Dashboard Performance

### 6.1 Dashboards Slow or Stale

**Possible Causes**
- Saved search caching delays  
- SuiteQL load contention  
- High volume of historical data  

**Resolution**
- Optimize saved search filters  
- Reduce dashboard date windows  
- Archive older workflow logs (Enterprise)  

### 6.2 Dashboard Refresh Delayed

**Possible Causes**
- Scheduled script frequency too low  
- High approval volume slowing instance updates  

**Resolution**
- Increase refresh script frequency  
- Run refresh jobs during low-activity hours  

---

## 7. SuiteScript Governance Optimization

### 7.1 Reduce UE Processing Time

**Tips**
- Minimize heavy SuiteQL inside User Events  
- Offload logic to queues where possible  
- Use cached data within a single request  

### 7.2 Use SuiteQL Instead of Searches

**Benefits**
- Faster execution  
- Lower governance  
- More precise dataset control  

### 7.3 Avoid Excessive Field Access

**Behavior**
- Field lookups expensive in loops  
- Prefer `getValue()` calls outside loops  

---

## 8. Best Practices for Long-Term Performance

**Recommendations**
- Monitor queue usage weekly  
- Archive historical logs periodically (Enterprise)  
- Keep rule and step counts manageable  
- Clean up unused budget periods  
- Optimize custom segment usage  
- Regularly audit saved searches and dashboards  

---

## 9. Troubleshooting Checklist

**Checklist**
- Measure Drawer load time  
- Check queue backlogs  
- Review Budget/AI engine logs  
- Validate SuiteQL execution times  
- Inspect saved search performance  
- Review governance consumption  

---

## 10. Related Documentation

- **Troubleshooting Guide (Master)**  
- **Queue Architecture Guide**  
- **Budget Engine Architecture**  
- **AI Insights System Overview**  
- **Approval Drawer Troubleshooting**