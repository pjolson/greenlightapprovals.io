---
title: "Customization Guidelines"
description: "Guidelines for NetSuite partners and developers customizing Greenlight Approvals safely and effectively."
section: "Partners"
order: 20
---

These guidelines outline supported and unsupported customization patterns for partners extending or integrating Greenlight Approvals.  
Following these recommendations ensures stability, upgrade compatibility, and compliance with audit and security requirements.

## 1. Overview

Customization guidelines exist to prevent:

- Breaking core approval logic  
- Bypassing SoD enforcement  
- Creating unsupported Drawer modifications  
- Causing queue or workflow errors  
- Interfering with security, audit, or data integrity  

Partners may extend Greenlight, but may not alter core scripts or workflow engines.

---

## 2. Supported Customizations

### 2.1 Additional Saved Searches

**Behavior**
- Partners may create saved searches for operational reporting  
- Recommended for workload metrics, exception reviews, and BI integrations  

### 2.2 Custom Dashboards (External)

**Behavior**
- Partners may build external dashboards using SuiteQL or Audit API  
- Must not bypass or replicate Greenlight core dashboards  

### 2.3 Custom Email Templates

**Behavior**
- Email text may be modified  
- Must preserve required token parameters  
- Must not weaken security or remove HMAC protections  

### 2.4 External Integrations

**Behavior**
- Use SuiteScript, SuiteQL, or Audit API  
- Must follow read-only guidelines  
- Cannot approve or reject outside Drawer or Email  

---

## 3. Conditionally Supported Customizations

### 3.1 Custom Exception Logic

**Behavior**
- Partners may flag additional exceptions  
- Must use separate custom record types  
- Must not modify Greenlight’s exception engine  

### 3.2 Additional Delegation Conditions

**Behavior**
- Allowed only if do not interfere with core delegation logic  
- Must not override SoD enforcement  

### 3.3 UI Enhancements Outside Drawer

**Behavior**
- Adding custom buttons or fields on the form is allowed  
- Must not modify Drawer container, scripts, or DOM structure  

---

## 4. Unsupported Customizations

### 4.1 Modifying Core Scripts

**Not Allowed**
- Changing any Greenlight SuiteScript files  
- Altering queue processors  
- Editing workflow or rule evaluation code  

**Reason**
- Breaks upgrade compatibility  
- Invalidates compliance and SDN certification  

### 4.2 Direct Modifications to Approval Drawer

**Not Allowed**
- Overriding Drawer CSS or HTML  
- Injecting additional scripts into Drawer  
- Replacing the Drawer’s Suitelet endpoints  

**Reason**
- May cause UI breakage and data leakage  
- Violates UI integrity  

### 4.3 Custom Approval Actions

**Not Allowed**
- Creating new action types  
- Approving via custom scripts  
- Performing bypass actions outside the queue  

**Reason**
- Violates workflow sequencing  
- Breaks audit logging and SoD enforcement  

### 4.4 Modifying SoD Behavior

**Not Allowed**
- Changing enforcement logic  
- Overriding self-approval or duplicate detection  
- Disabling SoD for specific users through code  

**Reason**
- Violates compliance requirements  

---

## 5. Guidelines for Extensibility

### 5.1 Use Supported APIs

**Recommendations**
- SuiteScript for record lookups  
- SuiteQL for analytics  
- Audit API for external integrations  

### 5.2 Do Not Override Script Deployments

**Behavior**
- Do not change roles or schedules of queue scripts  
- Deploy custom scripts separately  

### 5.3 Use Namespaced Custom Records

**Behavior**
- Avoid naming collisions  
- Follow NetSuite naming best practices  

---

## 6. Performance Considerations

### 6.1 Avoid Heavy UE Scripts

**Recommendations**
- Minimize processing during create/edit events  
- Offload work to scheduled scripts  

### 6.2 Avoid Query Contention with Greenlight Engines

**Behavior**
- Do not run SuiteQL that competes with queue or budget engines  
- Cache results where possible  

---

## 7. Testing & Validation

### 7.1 Required Sandbox Testing

**Behavior**
- All customizations must be tested in Sandbox  
- Test rule matching, Drawer behavior, and queue processing  

### 7.2 Regression Testing

**Behavior**
- Re-test after each Greenlight update  
- Ensure customizations do not affect core workflow  

---

## 8. Deployment Guidelines

### 8.1 Use Bundles for Repeatable Deployments

**Recommendations**
- Package partner customizations in SuiteBundler  
- Separate from Greenlight’s own bundle  

### 8.2 Document All Customizations

**Behavior**
- Maintain documentation for customer handoff  
- Identify custom records, scripts, and dashboards  

---

## 9. Related Documentation

- **Implementation Partner Guide**  
- **Integration Guide**  
- **Security Overview**  
- **Workflow Behavior & Lifecycle**