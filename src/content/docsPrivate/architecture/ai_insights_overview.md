---
title: "AI Insights System Overview"
description: "Technical overview of how Greenlight generates and displays AI-powered insights for transactions, vendors, budgets, and approval context."
section: "Architecture"
order: 8
---

Greenlight includes an AI Insights system that provides contextual information inside the Approval Drawer.  
AI Insights help approvers make informed decisions by summarizing transaction details, highlighting anomalies, and identifying patterns based on historical context.  
Insights are **read-only** and do not perform any automated actions.

## 1. Overview

The AI Insights system provides:
- Transaction summaries  
- Vendor behavior insights  
- Budget narrative and variance explanations  
- Risk or anomaly detection  
- Recommended review focus areas  

AI Insights are available in:
- **Pro** – Standard summaries  
- **Enterprise** – Full contextual insights with deeper analysis  

No conversational AI or chat capabilities are included in the Drawer.

## 2. Insight Types

### 2.1 Transaction Summary Insights

**Fields**
- Purpose of spend  
- Notable classification patterns  
- Comparison to historical transactions  
- Reasonableness indicators  

**Behavior**
- Appears at the top of the Drawer  
- Updated when transaction fields change  

### 2.2 Vendor Insights

**Fields**
- Historical spend with vendor  
- Typical transaction size  
- Risk indicators  
- Notable anomalies  

**Behavior**
- Helps approvers evaluate legitimacy and consistency  

### 2.3 Budget Insights

**Fields**
- Interpretation of variance  
- Spending trend commentary  
- Period-over-period performance (Enterprise)  

**Behavior**
- Works alongside Budget Intelligence Engine  
- Provides narrative explanation rather than numeric analysis  

### 2.4 Workflow Insights

**Fields**
- Why rule matched  
- Why step was assigned  
- SoD considerations  
- Escalation likelihood  

**Behavior**
- Assists users in understanding workflow logic  

## 3. Data Sources and Processing

AI Insights operate entirely within NetSuite using internal data.

### 3.1 Transaction Data

**Behavior**
- Evaluates body fields, vendor, department, class, location  
- Computes context from user-entered data  

### 3.2 Historical Data (Internal Only)

**Behavior**
- Uses aggregated transaction patterns  
- Performs lightweight comparison based on:
  - Amount
  - Vendor history
  - Classification trends  
- No external data is pulled  

### 3.3 Budget and Variance Data

**Behavior**
- Consumes results from the Budget Engine  
- Enterprise adds trend or seasonal interpretation  

## 4. Insight Generation Architecture

AI Insights use a multi-phase generation model.

### 4.1 Phase 1 — Context Extraction

**Behavior**
- Extracts transaction fields  
- Normalizes amounts and classification  
- Loads vendor summary data  

### 4.2 Phase 2 — Model Evaluation

**Behavior**
- Applies insight rules  
- Computes anomalies  
- Generates insight strings  
- Adjusts based on tier  

### 4.3 Phase 3 — Output Formatting

**Behavior**
- Insights packaged into Drawer-ready format  
- Includes titles, short descriptions, and color indicators  

## 5. Tier Behavior

### 5.1 Pro Tier

**Behavior**
- Basic transaction summaries  
- High-level vendor insights  
- Limited budget commentary  

### 5.2 Enterprise Tier

**Behavior**
- Deep contextual analysis  
- Multi-period vendor/budget trends  
- Expanded insight categories  
- Enhanced anomaly detection  

## 6. Security & Privacy Considerations

### 6.1 No External Data Transfer

**Behavior**
- All insight logic runs inside NetSuite  
- No external AI models are called  
- No customer data leaves the account  

### 6.2 Permission-Aware Insights

**Behavior**
- Drawer hides insights from unauthorized roles  
- Insights follow the same access rules as budget and SoD data  

### 6.3 Read-Only Behavior

**Behavior**
- Insights do not modify workflow or automate approvals  
- No auto-approval or decision-making  

## 7. Failure Handling

### 7.1 Missing Data

**Behavior**
- If data is insufficient, insights degrade gracefully  
- Drawer displays “Insights unavailable”  

### 7.2 Engine Errors

**Behavior**
- Exceptions logged internally  
- Drawer displays fallback text  

### 7.3 Tier Restrictions

**Behavior**
- Enterprise-only insights automatically hidden for Pro  
- No broken blocks or UI gaps  

## 8. Related Documentation

- **Budget Engine Architecture**  
- **Approval Drawer Guide**  
- **Workflow Behavior & Lifecycle**  
- **Security Overview**