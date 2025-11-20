---
title: "Helper Library Reference"
description: "Reference for shared SuiteScript libraries used across the Greenlight Approvals system."
section: "Architecture"
order: 4
---

Greenlight uses several internal SuiteScript libraries to keep the workflow engine modular, maintainable, and optimized.  
This reference describes each library, its purpose, and the shared functions used across User Events, Suitelets, Scheduled Scripts, and the Approval Drawer.

## 1. Overview

Greenlight libraries contain reusable logic for:
- Rule matching  
- Specificity scoring  
- Workflow step sequencing  
- Queue operations  
- SoD enforcement  
- Budget calculations  
- AI insights retrieval  
- Utility helpers (dates, logging, record lookup)  

Libraries ensure consistent behavior across components and reduce duplication.

## 2. Rule Engine Library

The Rule Engine Library handles rule matching, conditional evaluation, and specificity scoring.

### 2.1 Responsibilities

**Behavior**
- Load active rules  
- Evaluate rule criteria  
- Compute specificity  
- Evaluate custom segment matches  
- Evaluate rule-level conditional logic  

### 2.2 Key Functions

**Fields**
- `getMatchingRules(transaction)`  
- `evaluateCriteria(rule, transaction)`  
- `calculateSpecificity(rule, transaction)`  
- `evaluateConditionalFilters(rule, transaction)`  

## 3. Workflow Engine Library

The Workflow Engine Library manages approval step sequencing and workflow transitions.

### 3.1 Responsibilities

**Behavior**
- Determine first valid step  
- Apply step-level conditions  
- Advance workflow to next step  
- Skip steps based on configuration  
- Trigger re-evaluation when applicable  

### 3.2 Key Functions

**Fields**
- `getNextStep(instance)`  
- `getInitialStep(rule, transaction)`  
- `evaluateStepConditions(step, transaction)`  
- `advanceWorkflow(instance, action)`  

## 4. SoD Engine Library

This library applies Segregation of Duties checks.

### 4.1 Responsibilities

**Behavior**
- Detect self-approval  
- Detect duplicate approval  
- Detect delegation conflicts  
- Evaluate SoD settings at rule and step level  
- Generate SoD violation log entries  

### 4.2 Key Functions

**Fields**
- `checkSelfApproval(step, user)`  
- `checkDuplicateApproval(instance, user)`  
- `evaluateSodPolicy(step, instance, user)`  

## 5. Queue Engine Library

Used by Approval Queue and Email Approval Queue processors.

### 5.1 Responsibilities

**Behavior**
- Validate queue items  
- Execute approve/reject actions  
- Retry failed items  
- Maintain queue integrity  
- Update instance state  

### 5.2 Key Functions

**Fields**
- `processQueueItem(queueRecord)`  
- `applyAction(instance, step, user, action)`  
- `retryFailed(queueRecord)`  

## 6. Budget Engine Library

Used by the Budget Intelligence engine and dashboards.

### 6.1 Responsibilities

**Behavior**
- Load budgets for classification set  
- Compute actuals for period  
- Calculate variance  
- Prepare Drawer budget block data  
- Support multi-period analysis (Enterprise)  

### 6.2 Key Functions

**Fields**
- `getBudgetData(transaction)`  
- `calculateVariance(budget, actuals, pendingAmount)`  
- `getPeriodActuals(classifications)`  

## 7. AI Insights Library

Used to retrieve and format AI insights that appear in the Approval Drawer.

### 7.1 Responsibilities

**Behavior**
- Request AI-generated insights  
- Format insight blocks  
- Ensure tier-based access  
- Provide fallbacks for missing context  

### 7.2 Key Functions

**Fields**
- `getTransactionInsights(transaction)`  
- `buildInsightSummary(data)`  
- `getTierFilteredInsights(tier)`  

## 8. Utility Library

Shared by nearly all scripts.

### 8.1 Responsibilities

**Behavior**
- Date and time helpers  
- Record lookup functions  
- Safe JSON utilities  
- Logging helpers  
- HMAC token generation and validation  
- Governance checks  

### 8.2 Key Functions

**Fields**
- `log(message, details)`  
- `lookup(recordType, filters)`  
- `generateHmacToken(payload)`  
- `validateHmacToken(token)`  
- `safeParse(jsonString)`  

## 9. Logging Library (Internal)

Used to write consistent logs to the Approval Log record.

### 9.1 Responsibilities

**Behavior**
- Append log entries  
- Format messages  
- Flag exceptions and SoD violations  
- Create human-readable summaries  

### 9.2 Key Functions

**Fields**
- `logAction(instance, step, user, action, notes)`  
- `logException(instance, type, severity, message)`  
- `logDelegatedAction(instance, delegate, delegator)`  

## 10. Related Documentation

- **Script Architecture Reference**  
- **Data Model Reference**  
- **Workflow Behavior & Lifecycle**  
- **Queue Architecture Guide**  
- **Segregation of Duties (SoD) Guide**