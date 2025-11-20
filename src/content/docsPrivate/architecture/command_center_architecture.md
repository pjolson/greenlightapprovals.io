---
title: "Command Center Architecture"
description: "Technical architectural overview of the Greenlight Command Center, including data sources, dashboard logic, refresh behavior, and tier-based functionality."
section: "Architecture"
order: 90
---

The Command Center is the analytics and monitoring hub of Greenlight Approvals.  
It aggregates workflow, SLA, exception, budget, and performance data into a unified interface for managers, administrators, and finance leadership.

This document explains how the Command Center is built, how data flows into each dashboard, and how tier-based access affects module availability.

## 1. Overview

The Command Center architecture consists of:
- Saved Searches (operational sources)  
- SuiteQL queries (high-performance summaries)  
- Scheduled refresh jobs  
- Dashboard rendering layer  
- Role and tier-based permissions  

Dashboards update in near real-time based on workflow events and queue activity.

## 2. Data Sources

The Command Center relies on a hybrid data architecture.

### 2.1 Saved Searches

**Behavior**
- Provide dynamic lists of open approvals, exceptions, and aging buckets  
- Some dashboards build entirely from saved search results  
- Results may be cached temporarily by NetSuite  

### 2.2 SuiteQL Queries

**Behavior**
- Provide high-speed access to summarized, aggregated data  
- Used for SLA metrics, performance scoring, and budget insight  
- Reduce governance usage and improve responsiveness  

### 2.3 Approval Instance & Log Records

**Behavior**
- Serve as the ground-truth audit trail  
- Supply workflow, assignment, exception, and timing data  

### 2.4 Settings & Report Settings

**Behavior**
- Determine thresholds for SLA, critical amounts, and aging buckets  
- Affect color-coded dashboard indicators  

## 3. Dashboard Rendering Layer

Dashboards are rendered using a combination of NetSuite UI components and Suitelet-driven logic.

### 3.1 Suitelet-Based Rendering

**Behavior**
- A Command Center Suitelet loads all dashboard modules  
- Injects saved search results  
- Processes SuiteQL summaries  
- Renders dashboard tiles and charts  

### 3.2 Modular Dashboard Components

**Behavior**
- Each dashboard (SLA, Exceptions, Budget, Performance) is a modular component  
- Modules can be enabled/disabled per tier  
- Rendering logic assembles available components dynamically  

## 4. Refresh & Update Model

The Command Center uses near real-time refresh based on workflow activity.

### 4.1 Trigger Points

**Behavior**
- Queue processing updates aging and SLA metrics  
- Rule/step changes update workflow assignment logic  
- Logs generated during approval actions feed dashboards  

### 4.2 Refresh Schedules

**Behavior**
- Certain dashboards rely on scheduled scripts to refresh summary data  
- Real-time dashboards (open approvals) draw directly from saved searches  

### 4.3 Caching Behavior

**Behavior**
- Saved searches may cache data for several minutes  
- SuiteQL queries always retrieve live data  
- Enterprise may use enhanced caching for trend analytics  

## 5. Tier-Based Capability Model

### 5.1 Core Tier

**Behavior**
- Basic workloads  
- Basic SLA metrics  
- No budget dashboards  
- No SoD dashboards  
- No trend analytics  

### 5.2 Pro Tier

**Behavior**
- Adds budget insights  
- Adds SoD detection dashboard  
- Enhanced SLA metrics and exception visibility  

### 5.3 Enterprise Tier

**Behavior**
- Full dashboard suite  
- Historical trend analytics  
- High-risk transaction monitoring  
- Budget trend analysis  
- SoD enforcement insights  
- Performance scoring dashboard  

## 6. Dashboard Module Architecture

### 6.1 SLA Dashboard

**Behavior**
- Built from SuiteQL aggregated metrics  
- Uses SLA thresholds from Report Settings  
- Includes trend views (Enterprise)  

### 6.2 Exception Dashboard

**Behavior**
- Built from exception logs  
- Supports severity filtering  
- Enterprise includes trend analysis  

### 6.3 Budget Dashboard

**Behavior**
- Uses Budget Engine insights  
- Shows variance and trend context  
- Enterprise adds period-over-period comparisons  

### 6.4 SoD Dashboard

**Behavior**
- Depends on SoD Engine logs  
- Pro displays detection only  
- Enterprise displays enforcement history  

### 6.5 High-Value Transaction Dashboard

**Behavior**
- Uses critical amount threshold from Report Settings  
- Highlights at-risk transactions  
- Includes approver workload context  

### 6.6 Performance Dashboard

**Behavior**
- Uses Report Settings performance scoring thresholds  
- Calculates approver and department performance  
- Enterprise includes historical scoring analytics  

## 7. Failure Handling & Fault Tolerance

### 7.1 Search Failures

**Behavior**
- Dashboards continue rendering unaffected modules  
- Errors logged to Exception system  

### 7.2 SuiteQL Failures

**Behavior**
- Fallback placeholder metrics used  
- Logged for troubleshooting  

### 7.3 Script Execution Delays

**Behavior**
- Stale data may appear temporarily  
- Automatically resolves after next refresh  

## 8. Security & Permissions

### 8.1 Role-Based Access

**Behavior**
- Only roles with explicit dashboard permissions may view Command Center  
- Sensitive dashboards (Budget, SoD, Performance) may be hidden  

### 8.2 Tier-Based Restrictions

**Behavior**
- Even if user has permission, dashboards hidden if license tier is insufficient  

### 8.3 Data Filtering

**Behavior**
- Results filtered by user’s subsidiary and department access rights  
- Ensures users only see authorized data  

## 9. Related Documentation

- **Technical Architecture Overview**  
- **Command Center Overview**  
- **Budget Engine Architecture**  
- **Report Settings Guide**  
- **Exception Detection Guide**