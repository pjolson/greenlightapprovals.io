---
title: "Audit API Reference"
description: "API reference for retrieving audit-related data from Greenlight, including approval logs, instances, exceptions, and delegation activity."
section: "API & Integration"
order: 100
---

The Audit API provides read-only access to Greenlight approval lifecycle data for Enterprise customers.  
This API enables downstream integration with analytics platforms, compliance tools, audit systems, and internal data warehouses.

All endpoints are designed for high-volume usage through SuiteQL, SuiteScript, or SuiteTalk integrations.

## 1. Overview

The Audit API exposes structured data related to:

- Approval Instances  
- Approval Logs  
- Steps and workflow structure  
- Delegations  
- Exceptions and SoD violations  
- Budget and AI metadata (Enterprise)  

The API is **read-only** and cannot trigger workflow actions.

---

## 2. Access & Authentication

### 2.1 Supported Authentication Methods

**Fields**
- Token-Based Authentication (TBA)  
- OAuth 2.0 (recommended)  
- SuiteScript server-to-server execution  
- SuiteTalk SOAP authentication  

### 2.2 Permissions Required

**Behavior**
- User must have View access to:
  - Approval Instance  
  - Approval Log  
  - Delegation  
  - Audit Export Item  
- Role may be restricted by subsidiary or department  

---

## 3. Data Entities & Endpoints

### 3.1 Approval Instances Endpoint

**Route**
- `/greenlight/audit/instances` (Suitelet-backed API)

**Fields Returned**
- Instance ID  
- Transaction ID  
- Rule ID  
- Current step  
- Status (Pending / Approved / Rejected)  
- Created / Updated timestamps  
- Snapshot fields (amount, subsidiary, dept/class/location)  

### 3.2 Approval Logs Endpoint

**Route**
- `/greenlight/audit/logs`

**Fields Returned**
- Log ID  
- Instance ID  
- Step ID  
- User  
- Action (Approve / Reject / Skip / Delegated)  
- Timestamp  
- Comments  
- SoD flags  
- Exception context  

### 3.3 Exceptions Endpoint

**Route**
- `/greenlight/audit/exceptions`

**Fields Returned**
- Exception ID  
- Instance  
- Type (Assignment, SoD, Data, Queue, etc.)  
- Severity (Info / Warning / Error / Critical)  
- Message  
- Timestamp  

### 3.4 Delegations Endpoint

**Route**
- `/greenlight/audit/delegations`

**Fields Returned**
- Delegator  
- Delegate  
- Start / End dates  
- Exclusive mode  
- Notes  
- Active status  

### 3.5 Steps Endpoint

**Route**
- `/greenlight/audit/steps`

**Fields Returned**
- Step ID  
- Rule ID  
- Step number  
- Approver type (User / Role / Group / Dynamic)  
- Conditions  
- Escalation rules  

---

## 4. Query Parameters

All endpoints support filters.

### 4.1 Common Filters

**Fields**
- `transactionId`  
- `instanceId`  
- `user`  
- `dateFrom` / `dateTo`  
- `severity`  
- `ruleId`  
- `stepId`  

### 4.2 Pagination

**Behavior**
- Endpoints support `limit` and `offset`  
- Defaults:
  - limit = 100  
  - offset = 0  

---

## 5. Example Requests

### 5.1 Retrieve Approval Logs for a Transaction

```
GET /greenlight/audit/logs?transactionId=12345
```

### 5.2 Retrieve Exceptions for Last 7 Days

```
GET /greenlight/audit/exceptions?dateFrom=2024-01-01&dateTo=2024-01-07
```

### 5.3 Retrieve Delegations for a Specific User

```
GET /greenlight/audit/delegations?delegator=456
```

---

## 6. Response Format

### 6.1 Standard JSON Envelope

**Fields**
- `success` (boolean)  
- `data` (array)  
- `count` (number)  
- `errors` (optional array)  

### 6.2 Error Responses

**Behavior**
- Includes error code and message  
- May include stack reference for internal debugging  

---

## 7. Rate Limits & Performance

### 7.1 Recommended Limits

**Behavior**
- Max 1,000 records per request  
- Large queries should use pagination  
- SuiteQL queries optimized for high throughput  

### 7.2 Long-Running Queries

**Behavior**
- May require splitting into date buckets  
- Large date windows should be avoided  

---

## 8. Security & Restrictions

### 8.1 Read-Only Enforcement

**Behavior**
- No update, delete, or workflow action endpoints provided  

### 8.2 Role-Based Data Filtering

**Behavior**
- Users see only data permitted by NetSuite’s role record filtering  
- Subsidiary restrictions applied automatically  

### 8.3 Enterprise-Only Fields

**Fields**
- Budget variance metadata  
- Multi-period AI insight metadata  
- Extended exception details  

---

## 9. Troubleshooting API Issues

### Common Issues

**“Unauthorized Access”**
- Missing role permissions  
- Suitelet not deployed for REST access  

**“Too Many Requests”**
- Pagination not applied  
- Large unbounded SuiteQL query  

**“Empty Results Returned”**
- Role restricted by subsidiary  
- Incorrect filters applied  

---

## 10. Related Documentation

- **Audit Package Guide**  
- **Security Overview**  
- **Access Control Policies**  
- **Queue Architecture Guide**