---
title: "Drawer Architecture Specification"
description: "Technical specification for the Greenlight Approval Drawer, including UI architecture, data flow, SuiteScript interaction model, and extensibility."
section: "Architecture"
order: 100
---

The Greenlight Approval Drawer is a hybrid SuiteScript UI component that provides real‑time approval context directly inside NetSuite transactions.  
This document describes the Drawer’s architecture, data flow, SuiteScript boundaries, rendering model, and extension points.

## 1. Overview

The Drawer is built on a client–Suitelet architecture and provides:

- Real‑time approval context  
- Approve / reject actions  
- Timeline and audit logs  
- Budget insights (Pro & Enterprise)  
- AI insights (Pro limited, Enterprise full)  
- Exception and SoD warnings  
- Delegation indicators  

The goal of the Drawer architecture is to deliver a fast, reactive UI without requiring full page reloads or modifying the underlying NetSuite form.

## 2. Architectural Components

The Drawer consists of four core components:

### 2.1 Drawer Client Script (CS)

**Behavior**
- Injects the Drawer UI into the transaction form  
- Calls Drawer API Suitelet to load data  
- Renders tabs (Details, Timeline, Comments)  
- Handles Approve / Reject button events  
- Displays warnings, exceptions, and SoD indicators  

### 2.2 Drawer API Suitelet

**Behavior**
- Serves JSON payload consumed by the client script  
- Loads approval instance, logs, steps, exceptions, and delegated context  
- Fetches budget and AI data  
- Applies role‑based and tier‑based filtering  
- Ensures data security and correctness  

### 2.3 Approval Action Suitelet

**Behavior**
- Handles approve / reject POST requests  
- Creates queue items  
- Returns action status to the UI  
- Performs minimal synchronous validation  

### 2.4 CSS / Rendering Layer

**Behavior**
- Provides responsive drawer layout  
- Supports Redwood Design language  
- Standardizes fonts, spacing, and regions  

## 3. Drawer Rendering Lifecycle

The Drawer follows a predictable rendering pipeline.

### 3.1 Load Phase

**Behavior**
- Client script injects Drawer container  
- API Suitelet request initiated  
- Drawer shows loading state  

### 3.2 Data Phase

**Behavior**
- JSON response includes:
  - Instance metadata  
  - Current step  
  - Step list  
  - Logs  
  - Comments  
  - Exceptions and SoD results  
  - Budget block data  
  - AI insights block  
  - Delegation context  

### 3.3 Render Phase

**Behavior**
- UI draws Details → Timeline → Comments tabs  
- Exceptions to appear at top of Details  
- Budget + AI blocks inserted in correct regions  
- Approve/Reject buttons attached  

### 3.4 Reactive Updates

**Behavior**
- After action:
  - Client script calls refresh endpoint  
  - Drawer re-renders with new state  
  - Timeline updated  
  - Step progression shown immediately  

## 4. Data Flow Diagram (Text)

**User Action**
→ Client Script  
→ Approval Action Suitelet  
→ Approval Queue  
→ Workflow Engine  
→ Approval Instance Update  
→ Drawer API Suitelet  
→ Client Script Re-render  

## 5. Drawer Data Model

### 5.1 Drawer Payload Structure

**Fields**
- `instance` (ID, status, timestamps)  
- `currentStep`  
- `steps` (array)  
- `logs`  
- `comments`  
- `exceptions`  
- `sodStatus`  
- `delegation`  
- `budget` (Pro/Enterprise)  
- `insights` (Pro/Enterprise)  

### 5.2 Filtering

**Behavior**
- Payload filtered by:
  - User permissions  
  - Role restrictions  
  - License tier  
  - SoD rules  

## 6. Approval Actions Architecture

### 6.1 Approve / Reject Buttons

**Behavior**
- Trigger POST request to Action Suitelet  
- Create queue item with: instance, step, user, action  
- Queue handles heavy logic asynchronously  

### 6.2 Drawer State After Action

**Behavior**
- Drawer fetches fresh payload  
- Button disabled once action processed  
- Timeline shows latest event  

## 7. Budget Block Architecture (Pro & Enterprise)

### 7.1 Behavior

**Behavior**
- Drawer displays variance, actuals, pending amount  
- Uses Budget Engine to compute data  
- Enterprise includes trend commentary  

### 7.2 Failure Handling

**Behavior**
- Missing budget → block hidden  
- Errors → fallback “Budget unavailable” message  

## 8. AI Insights Block Architecture (Pro & Enterprise)

### 8.1 Behavior

**Behavior**
- Insights inserted at top of Details tab  
- Includes transaction summaries, vendor insights, budget commentary  
- Enterprise includes deeper contextual analysis  

### 8.2 Restrictions

**Behavior**
- Read-only  
- No chat or generative interactions  
- Tier-based filtering  

## 9. Exception & SoD Rendering

### 9.1 Exceptions

**Behavior**
- Displayed in red or yellow boxes based on severity  
- Provide actionable descriptions  

### 9.2 SoD Violations

**Behavior**
- Rendered as high-visibility warnings  
- Approver actions may be blocked in Enterprise tier  

## 10. Extensibility Architecture

### 10.1 Supported Extensions

**Behavior**
- Additional insight blocks  
- Custom classification displays  
- Additional timeline annotations  
- New exception categories  

### 10.2 Unsupported Extensions

**Behavior**
- Direct modification of Drawer core logic  
- Injecting new action types (Approve/Reject only)  
- Overriding SoD or security restrictions  

## 11. Performance & Optimization

### 11.1 Drawer Load Performance

**Behavior**
- Uses SuiteQL for fast reads  
- Minimizes payload size  
- Caches non-sensitive metadata briefly  

### 11.2 Governance Avoidance

**Behavior**
- Heavy logic deferred to queues  
- Drawer API performs only lightweight lookups  

## 12. Failure Handling & Debugging

### Common Issues

**Drawer Not Loading**
- Script not deployed  
- User lacks permissions  

**Budget/Insight Blocks Missing**
- Disabled by tier  
- Errors in Budget or AI engines  

**Timeline Not Updating**
- Queue processor disabled  

## 13. Related Documentation

- **Approval Drawer Guide**  
- **Budget Engine Architecture**  
- **AI Insights System Overview**  
- **Workflow Behavior & Lifecycle**  
- **Script Architecture Reference**
