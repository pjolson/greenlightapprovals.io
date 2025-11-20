---
title: "Custom Workflow Builder (Future)"
description: "Planned functionality for creating custom approval workflows, extending Greenlight with scriptable logic and modular workflow components."
section: "API & Integration"
order: 40
---

The Custom Workflow Builder is a **planned future Enterprise feature** that will allow developers and administrators to construct advanced approval workflows using a modular, scriptable building system.  
This feature is not currently available, but the design direction and conceptual architecture are documented here for roadmap visibility.

## 1. Overview

The Workflow Builder will provide:

- A visual or semi-visual workflow configuration interface  
- Scriptable nodes for conditional logic  
- Extensible approval steps and branching logic  
- Integration nodes for external systems  
- Reusable workflow templates  

The goal is to enhance Greenlight’s flexibility while maintaining the reliability and auditability of its structured rule-and-step engine.

---

## 2. Planned Use Cases

### 2.1 Advanced Conditional Workflows

**Examples**
- Multi-branch routing based on complex conditions  
- Department- or vendor-specific approval paths  
- Classification-driven branching  

### 2.2 Workflow Automation

**Examples**
- Auto-approval for low-value spend  
- Auto-routing to exception review queues  
- Conditional budget checks  

### 2.3 External Integrations

**Examples**
- Trigger downstream actions after approval  
- Connect to webhook-driven automation systems  
- Update external procurement platforms  

---

## 3. Workflow Components (Planned)

### 3.1 Start Node

**Behavior**
- Triggered by transaction submission  
- Loads rule/step context  
- Begins workflow sequence  

### 3.2 Decision Nodes

**Behavior**
- Execute conditional logic using SuiteScript expressions  
- Branch workflow based on transaction fields, vendor history, budget impact, or SoD conditions  

### 3.3 Approval Nodes

**Behavior**
- Assign approvers dynamically or statically  
- Support SoD validation  
- Integrate with queue processors  

### 3.4 Integration Nodes (Enterprise)

**Behavior**
- Send outbound webhook events  
- Call RESTlets or external APIs  
- Log integration results  

### 3.5 End Nodes

**Behavior**
- Close workflow  
- Trigger final notifications  
- Mark instance as approved or rejected  

---

## 4. Extensibility & Scriptability

### 4.1 Scripted Conditions

**Behavior**
- Use SuiteScript 2.x style expressions or predefined functions  
- Support multi-field logical conditions  
- Provide templated logic for non-technical admins  

### 4.2 Custom Node Types

**Behavior**
- Developers may define new node types  
- Node logic executed under secure execution role  
- Must comply with SoD and audit logging rules  

### 4.3 Plugin Architecture (Planned)

**Behavior**
- Plugins packaged via SuiteBundles  
- Exposed through a controlled API  
- Support versioning and sandbox testing  

---

## 5. UI & Builder Experience (Planned)

### 5.1 Visual Canvas

**Behavior**
- Drag-and-drop workflow layout  
- Node-based representation  
- Real-time validation of SoD rules  

### 5.2 Hybrid Editor

**Behavior**
- Use both visual and JSON-based editing  
- Allow developers to fine-tune nodes in code  

### 5.3 Built-In Testing Tools

**Behavior**
- Test workflow using sample transactions  
- View decision paths  
- Validate budget and exception logic before deployment  

---

## 6. Deployment & Versioning

### 6.1 Versioned Workflows

**Behavior**
- Every workflow saved as versioned artifact  
- Version control supports rollback  

### 6.2 Deployment Workflow

**Behavior**
- Draft → Test → Publish → Archive  
- Enforced through admin role  

### 6.3 Sandbox → Production Promotion

**Behavior**
- Workflows can be exported and imported  
- Version hashes verified to prevent tampering  

---

## 7. Security & Compliance Considerations

### 7.1 Audit Logging

**Behavior**
- All node executions logged  
- Branch choices recorded  
- External call results documented  

### 7.2 SoD Integration

**Behavior**
- SoD checks occur at approval nodes  
- Violations block progression  

### 7.3 Permissions

**Behavior**
- Only admins can create or publish workflows  
- Developers can create drafts only  

---

## 8. Limitations (Planned)

**Expected**
- Not intended to replace full SuiteFlow  
- Complex branching may affect governance  
- External integrations must comply with NetSuite security  

---

## 9. Roadmap Status

### 9.1 Current Status

**Behavior**
- Conceptual design completed  
- Implementation not yet underway  

### 9.2 Planned Milestones

**Planned**
- Internal prototype  
- Node-based visual editor  
- Basic approval → decision → approval branching  
- Webhook integration nodes  

---

## 10. Related Documentation

- **Webhook Events (Planned)**  
- **Integration Guide**  
- **Audit API Reference**  
- **Workflow Behavior & Lifecycle**