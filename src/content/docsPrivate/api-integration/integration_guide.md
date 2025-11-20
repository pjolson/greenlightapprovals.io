---
title: "Integration Guide"
description: "Guide for integrating Greenlight Approvals with external systems via SuiteScript, SuiteQL, saved searches, and API endpoints."
section: "API & Integration"
order: 30
---

This Integration Guide describes the supported methods for connecting Greenlight Approvals to external systems.  
It covers SuiteScript-based integrations, saved search exports, Audit API usage, and best practices for building extensions.

## 1. Overview

Greenlight supports integration across several layers:

- SuiteScript 2.x (server-to-server integration)  
- SuiteQL data extraction  
- Saved search exports  
- Audit API (Enterprise)  
- Planned webhook system  
- SuiteTalk and RESTlet integrations  

Greenlight is designed to be extensible without modifying core scripts.

---

## 2. Integration Methods

### 2.1 Using SuiteScript

**Behavior**
- Ideal for back-end automations  
- Supports approval, log, and instance lookups  
- Cannot take action (approve/reject is queue-only)  

**Common Use Cases**
- Sync approval data to external system  
- Enrich workflows based on log events  
- Build custom dashboards outside NetSuite  

### 2.2 Using SuiteQL

**Behavior**
- Efficient for high-volume reporting  
- Allows querying Approval Logs, Instances, Delegations, Exceptions  

**Common Queries**
- Retrieve all approvals for a period  
- Extract SoD violations  
- Build custom performance analytics  

### 2.3 Using Saved Searches

**Behavior**
- Administrator-friendly  
- Useful for integrations via CSV export, Celigo, or SFTP  

**Common Searches**
- Open approvals  
- SoD alerts  
- SLA metrics  

### 2.4 Using Audit API (Enterprise)

**Behavior**
- Exposes read-only approval lifecycle data  
- Ideal for BI tools or compliance systems  

**Best For**
- Enterprise reporting    
- GRC platform integrations  
- Data warehouse ingestion  

---

## 3. SuiteScript Integration Techniques

### 3.1 Retrieve Approval Instance for a Transaction

**Example (SS2.x)**  
```
var instance = search.lookupFields({
    type: 'customrecord_gl_instance',
    id: instanceId,
    columns: ['custrecord_gl_status','custrecord_gl_current_step']
});
```

### 3.2 Retrieve Logs for an Instance

```
var logs = search.create({
    type: 'customrecord_gl_log',
    filters: [['custrecord_gl_log_instance','is',instanceId]],
    columns: ['custrecord_gl_log_user','custrecord_gl_log_action','created']
});
```

### 3.3 Detect Exceptions

```
search.create({
    type: 'customrecord_gl_exception',
    filters: [['custrecord_gl_exception_instance','is',instanceId]],
    columns: ['custrecord_gl_exception_type','custrecord_gl_exception_message']
});
```

---

## 4. SuiteQL Integration Examples

### 4.1 Retrieve All Approved Transactions in Period

```
SELECT
  i.id,
  i.custrecord_gl_instance_status,
  i.custrecord_gl_instance_trans,
  l.custrecord_gl_log_action,
  l.created
FROM customrecord_gl_instance i
JOIN customrecord_gl_log l ON l.custrecord_gl_log_instance = i.id
WHERE l.custrecord_gl_log_action = 'APPROVE'
AND l.created BETWEEN ? AND ?
```

### 4.2 Retrieve SoD Violations

```
SELECT *
FROM customrecord_gl_sod_violations
WHERE created BETWEEN ? AND ?
```

---

## 5. External Integration Patterns

### 5.1 Scheduled Export Integration

**Behavior**
- Use Scheduled Script → SuiteQL → SFTP  
- Common for finance or ERP reporting  

### 5.2 Real-Time Sync (Planned Webhooks)

**Behavior**
- External system receives event notifications  
- Ideal for workflow orchestration  

### 5.3 API Integration

**Behavior**
- Use Audit API endpoints  
- Supports JSON responses  
- Secure, rate-limited  

---

## 6. Common Integration Scenarios

### 6.1 Send Approval Logs to BI Tool

**Steps**
- Use SuiteQL to extract logs  
- Transform to desired format  
- Upload to BI or data warehouse  

### 6.2 Sync SoD Incidents to GRC Platform

**Steps**
- Query exception dataset  
- Transform payload  
- Push to GRC or ticketing system  

### 6.3 Build External Dashboard

**Steps**
- Query Instances + Logs + SLA metrics  
- Aggregate external KPIs  
- Render frontend in your preferred tool  

---

## 7. Security Considerations

### 7.1 Role Permissions

**Behavior**
- Ensure integration role has access only to required data  

### 7.2 Token Authentication

**Behavior**
- OAuth2 recommended  
- Rotate tokens per organization policy  

### 7.3 No Write Access

**Behavior**
- Integrations cannot modify approval data  
- Approvals must always occur via Drawer or Email  

---

## 8. Limitations

**Restrictions**
- Cannot create or modify rules/steps through API  
- Cannot approve or reject via API  
- Cannot bypass SoD enforcement  

---

## 9. Related Documentation

- **Audit API Reference**  
- **Webhook Events (Planned)**  
- **Security Overview**  
- **Queue Architecture Guide**