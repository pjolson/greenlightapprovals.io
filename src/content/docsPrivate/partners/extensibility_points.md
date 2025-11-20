---
title: "Extensibility Points"
description: "Supported extension points for partners and developers building on top of Greenlight Approvals."
section: "Partners"
order: 30
---

This guide outlines all supported extensibility points in Greenlight Approvals.  
These extension hooks allow partners and developers to add value around the approval lifecycle without modifying core logic.

## 1. Overview

Greenlight exposes specific extension points to allow safe customization, including:

- External reporting  
- Exception extensions  
- Delegation extensions  
- Drawer-safe UI add-ons (outside the Drawer)  
- Integration hooks (API, SuiteQL, saved searches)  
- Planned webhook and workflow builder nodes  

These extensibility points provide flexibility while preserving system integrity and SDN compliance.

---

## 2. Pre-Approval & Workflow Extensions

### 2.1 Rule Evaluation Extensions (Indirect)

**Behavior**
- Use SuiteScript or SuiteQL to pre-calculate fields that rules rely on  
- Populate custom segments or fields before rule matching  
- Must NOT override Greenlight’s rule engine  

### 2.2 Pre-Submit Transaction Enrichment

**Behavior**
- Add transaction-level metadata before Greenlight evaluation  
- Example: tagging vendors with risk level  
- Helps rules evaluate more accurately  

---

## 3. Exception Extensions

### 3.1 Custom Exception Categories

**Behavior**
- Developers may create additional exception record types  
- Shown in dashboards or external reports  
- Does NOT modify core exception engine  

### 3.2 Exception Annotations

**Behavior**
- Add supplementary exception notes to approval logs  
- Useful for audit teams  

### 3.3 External Exception Reporting

**Behavior**
- Push exceptions to BI, GRC, or ticketing systems  

---

## 4. Delegation Extensions

### 4.1 Extended Delegation Rules

**Behavior**
- Developers may add secondary logic (e.g., conditional delegate selection)  
- Must NOT bypass Greenlight delegation engine  

### 4.2 Delegation Monitoring

**Behavior**
- Track delegator/delegate actions  
- Useful for compliance teams  

---

## 5. UI Extension Points

### 5.1 External UI Components (Allowed)

**Behavior**
- Add custom buttons, pop-ups, or fields to the transaction form  
- Must NOT modify the Approval Drawer DOM or CSS  
- Must NOT override Drawer rendering lifecycle  

### 5.2 Sidebar or Portlet Widgets

**Behavior**
- Add dashboards or summaries outside Drawer  
- Safe for partner-branded enhancements  

### 5.3 Custom Menu Items

**Behavior**
- Add shortcuts for partner tools  
- Should not replace or overshadow core Greenlight navigation  

---

## 6. Integration Extension Points

### 6.1 SuiteScript Extensions

**Capabilities**
- Query Instances, Logs, Exceptions, Delegations  
- Generate external summaries or reports  
- Automate related processes without modifying core approval logic  

### 6.2 SuiteQL Extensions

**Capabilities**
- High-performance reporting and analytics  
- Join Greenlight records with NetSuite data  

### 6.3 Audit API Extensions (Enterprise)

**Capabilities**
- Extract deep audit dataset  
- Sync with external systems  

### 6.4 Saved Search Extensions

**Capabilities**
- Create enhanced operational reports  
- Build BI export packages  

---

## 7. Webhook & Workflow Builder Extensions (Future)

### 7.1 Webhooks (Planned)

**Capabilities**
- Subscribe to approval, rejection, SoD, exception events  
- Integrate with external compliance or automation tools  

### 7.2 Custom Workflow Builder Nodes (Planned)

**Capabilities**
- Developers may create custom node types  
- Integrate external calls or advanced logic  

---

## 8. Prohibited Extensions

### 8.1 Modification of Core Scripts

**Not Allowed**
- Editing Drawer script, queue processors, or rule engine  
- Replacing Suitelets or UI rendering logic  

### 8.2 Bypassing Approval Actions

**Not Allowed**
- Approve/Reject directly via script  
- Altering SoD or queue behavior  

### 8.3 DOM Manipulation Inside Drawer

**Not Allowed**
- Injecting scripts inside Drawer DOM  
- Modifying block layout or visibility  

---

## 9. Best Practices

**Recommendations**
- Use namespaced custom records  
- Ensure Sandbox validation  
- Avoid duplicating approval logic externally  
- Test for SoD and exception conflicts  
- Avoid adding governance-heavy logic to UE scripts  

---

## 10. Related Documentation

- **Customization Guidelines**  
- **Implementation Partner Guide**  
- **Integration Guide**  
- **Webhook Events (Planned)**  
- **Workflow Behavior & Lifecycle**