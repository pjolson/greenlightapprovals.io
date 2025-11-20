---
title: "Webhook Events (Planned)"
description: "Planned webhook events for future Greenlight integrations, enabling real-time notifications to external systems."
section: "API & Integration"
order: 20
---

Greenlight’s Webhook Events system is a planned Enterprise feature that will allow external systems to receive real-time notifications for approval-related activity.  
This document outlines the proposed architecture, event types, payload structures, and security model.

## 1. Overview

Webhooks will allow external tools—such as ERPs, analytics platforms, workflow engines, and compliance systems—to subscribe to approval events including:

- Approval actions  
- Rejections  
- Step transitions  
- Instance creation  
- Delegations  
- Exceptions  
- SoD violations  

Webhooks are **planned**, not currently available.

## 2. Planned Use Cases

### 2.1 Analytics & Reporting

**Examples**
- Push approval activity into BI tools  
- Track SLA performance externally  
- Sync exceptions to monitoring tools  

### 2.2 Compliance & Audit Integrations

**Examples**
- Send SoD violations to GRC platforms  
- Sync logs with audit evidence repositories  

### 2.3 Workflow Orchestration

**Examples**
- Trigger downstream processes after approval  
- Integrate with procurement or vendor systems  

---

## 3. Event Types (Planned)

### 3.1 `approval.completed`

**Payload Fields**
- instanceId  
- stepId  
- user  
- timestamp  
- comments  
- method (Drawer/Email)  

### 3.2 `approval.rejected`

**Payload Fields**
- instanceId  
- stepId  
- user  
- timestamp  
- reason  

### 3.3 `workflow.started`

**Payload Fields**
- instanceId  
- ruleId  
- transactionId  
- snapshot metadata  

### 3.4 `workflow.finished`

**Payload Fields**
- instanceId  
- finalStatus  
- timestamp  

### 3.5 `delegation.applied`

**Payload Fields**
- delegator  
- delegate  
- startDate  
- endDate  

### 3.6 `exception.logged`

**Payload Fields**
- exceptionId  
- type  
- severity  
- message  
- instanceId  

---

## 4. Webhook Architecture (Planned)

### 4.1 Event Producer Engine

**Behavior**
- Emits internal events from queue processors  
- Normalizes event payloads  
- Queues events for delivery  

### 4.2 Delivery Engine

**Behavior**
- Sends HTTPS POST requests to subscriber URLs  
- Retries failed deliveries  
- Manages backoff, retry, and dead-letter behavior  

### 4.3 Subscriber Management

**Fields**
- Event type  
- Target URL  
- Secret token  
- Active / inactive  

---

## 5. Delivery Model

### 5.1 HTTP POST Delivery

**Behavior**
- JSON body  
- Includes event type + payload  
- Includes HMAC signature header  

### 5.2 Retry Logic

**Behavior**
- Multiple retry attempts  
- Exponential backoff  
- Dead-letter queue for failed deliveries  

---

## 6. Security Model

### 6.1 HMAC Signature Header

**Behavior**
- Each POST signed using SHA‑256 HMAC  
- Subscriber verifies signature to ensure authenticity  

### 6.2 HTTPS Required

**Behavior**
- Only HTTPS URLs allowed  
- Prevents interception or tampering  

### 6.3 Role-Based Authorization

**Behavior**
- Only admins may configure webhooks  
- Ability to restrict webhooks by subsidiary  

---

## 7. Example Payload (Planned)

```
{
  "event": "approval.completed",
  "timestamp": "2025-01-01T12:45:00Z",
  "instanceId": 3219,
  "stepId": 4,
  "user": 556,
  "comments": "Approved with notes",
  "method": "drawer",
  "signature": "sha256=abc123..."
}
```

---

## 8. Status & Roadmap

### 8.1 Current Status

**Behavior**
- Feature planned but not yet implemented  
- API payload formats subject to change  

### 8.2 Roadmap

**Planned**
- Subscriber UI in Settings  
- Retry dashboard in Command Center  
- Dead-letter queue visibility  
- Webhook event testing suite  

---

## 9. Related Documentation

- **Audit API Reference**  
- **Security Overview**  
- **Queue Architecture Guide**  
- **Workflow Behavior & Lifecycle**