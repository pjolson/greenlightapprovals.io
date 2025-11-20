---
title: "Technical Architecture Overview"
description: "High-level architecture of Greenlight Approvals, including system components, data flow, and SuiteScript execution model."
section: "Architecture"
order: 10
---

The Greenlight Approvals architecture is built on SuiteScript 2.x and designed for performance, stability, and auditability.  
This document provides a high-level overview of all system components and how they interact across the approval lifecycle.

## 1. Architecture Summary

Greenlight consists of the following major components:
- Approval Rules & Steps (configuration layer)  
- Workflow Engine (matching + evaluation layer)  
- Approval Drawer (user interface layer)  
- Queue Processors (asynchronous processing layer)  
- Email Approval System  
- Budget Intelligence engine  
- AI Insights engine  
- Command Center dashboards  
- Audit Package generator  

Each component interacts with shared records such as Approval Instances, Steps, Logs, and Queues.

## 2. Core System Components

### 2.1 Approval Rule Engine

**Behavior**
- Evaluates submitted transactions  
- Matches rules using specificity scoring  
- Creates approval instances  
- Determines step sequence  
- Handles re-evaluation if enabled  

### 2.2 Approval Instance Model

**Behavior**
- Stores workflow state  
- Tracks assignments and timestamps  
- Contains snapshot metadata (amounts, classifications, vendor)  
- Serves as the core audit record  

### 2.3 Approval Drawer UI

**Behavior**
- Client + Suitelet hybrid architecture  
- Loads all workflow context in real time  
- Displays timeline, comments, exceptions, budget, and AI insights  
- Provides Approve/Reject actions  

## 3. Script Architecture

Greenlight uses the following SuiteScript modules:

### 3.1 Client Scripts (CS)

**Behavior**
- Render the Approval Drawer  
- Handle Drawer interactions  
- Refresh UI dynamically  

### 3.2 User Event Scripts (UE)

**Behavior**
- Initiate approval workflows  
- Apply rule matching  
- Enforce SoD and validation  
- Write initial logs  

### 3.3 Suitelets (SL)

**Behavior**
- Drawer data endpoint  
- Approval action endpoint  
- Email approval endpoint  
- Audit package export  

### 3.4 Scheduled Scripts (SCH)

**Behavior**
- Approval Queue Processor  
- Email Approval Queue Processor  
- Escalation Engine  
- Dashboard refresh jobs  

## 4. Queue Processing

Queues ensure reliable, asynchronous approval processing.

### 4.1 Approval Queue

**Behavior**
- Processes approve/reject actions  
- Updates workflow state  
- Advances steps  
- Manages skipped steps  

### 4.2 Email Approval Queue

**Behavior**
- Validates and processes email-based actions  
- Protects against token replay  
- Ensures audit consistency  

## 5. Exception & SoD Handling

### 5.1 Exception Engine

**Behavior**
- Captures assignment errors  
- Logs rule/step evaluation issues  
- Detects data inconsistencies  
- Surfaces warnings in the Drawer  

### 5.2 SoD Enforcement Engine

**Behavior**
- Detects self-approval and duplicate approvals  
- Applies Warn/Enforce behavior based on tier  
- Logs violations  
- Prevents unauthorized approvals  

## 6. Budget Intelligence Engine

### 6.1 Data Flow

**Behavior**
- Loads budgets using SuiteQL  
- Summarizes actuals  
- Computes real-time variance  
- Displays insight in Drawer and dashboards  

### 6.2 Tier Behavior

**Behavior**
- Pro: Standard variance  
- Enterprise: Trend analysis + deeper context  

## 7. AI Insights Engine

### 7.1 Behavior

**Behavior**
- Generates transaction-level insights  
- Produces context for vendors, amounts, classifications  
- Enterprise tier includes enhanced depth  
- Insights are read-only and appear in the Drawer  

## 8. Command Center Architecture

### 8.1 Dashboard Layer

**Behavior**
- Saved searches + SuiteQL for metrics  
- Workload, SLA, exceptions, budget, performance  
- Tier-based module availability  

### 8.2 Data Flow

**Behavior**
- Dashboards refresh on queue events and instance updates  
- Enterprise includes historical trend computation  

## 9. Audit Package Architecture

### 9.1 Behavior

**Behavior**
- Uses SuiteQL to retrieve workflow records  
- Generates CSVs and README  
- Packages data into a ZIP archive  
- Supports large datasets (Enterprise batching)

## 10. Data Model Summary

**Key Records**
- Approval Rule  
- Approval Step  
- Approval Instance  
- Approval Log  
- Delegation  
- Settings  
- Report Settings  
- Approval Queue  
- Email Approval Queue  
- Audit Export Item  

## 11. Security & Governance Considerations

### 11.1 Data Security

**Behavior**
- HMAC tokens for email approvals  
- Role-based access to Drawer and records  
- Enterprise SoD enforcement  

### 11.2 Governance

**Behavior**
- Heavy processing offloaded to queues  
- SuiteQL used for efficient reporting  
- Drawer designed to minimize page reloads  

## 12. Related Documentation

- **Script Architecture Reference**  
- **Data Model Reference**  
- **Queue Architecture Guide**  
- **Approval Drawer Guide**  
- **Workflow Behavior & Lifecycle**
