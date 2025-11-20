---
title: "Email Approval System Guide"
description: "How Greenlight handles approve/reject actions through secure email links, including configuration, security, and troubleshooting."
section: "Administration"
order: 80
---

The Email Approval System enables approvers to approve or reject transactions directly from their inbox using secure, one-click links.  
This guide explains configuration, security, behavior, and troubleshooting for all email-based approvals.

## 1. Overview

Greenlight supports full email-based approval actions for all approvers.  
Approvers may:

- Approve a transaction  
- Reject a transaction  
- Add optional comments  
- Review transaction highlights  

Email approvals are processed through a secure Suitelet endpoint and validated with HMAC tokens.

## 2. Requirements

Email approvals require:

**Requirements**
- Valid email address on the approver’s employee record  
- Greenlight email templates configured  
- Email Approval Suitelet deployed  
- Email Approval Queue scheduled script running  
- HTTPS enabled NetSuite domain  

**Tier Notes**
- Available in all tiers (Core, Pro, Enterprise)

## 3. Email Template Configuration

Templates are configured in **Approvals → Settings**.

### 3.1 Template Options

**Fields**
- **Assignment Template**  
- **Approval Template**  
- **Rejection Template**  
- **Escalation Template**  

### 3.2 Behavior

**Behavior**
- Templates insert approve/reject URLs automatically.  
- Line-item and header visibility depend on Settings configuration.  
- Pro and Enterprise include richer detail blocks.

## 4. Email Approval Links

Greenlight generates two secure links for each step:

- **Approve Link**  
- **Reject Link**

### 4.1 URL Structure

**Behavior**
- URLs include a secure, tamper-resistant HMAC token.  
- Links route to a public Suitelet that validates authenticity.  
- Tokens expire automatically after a configurable window.

### 4.2 HMAC Token Validation

**Behavior**
- Verifies: instance ID, step ID, user ID, timestamp.  
- Rejects attempts to modify URL parameters.  
- Returns clear error messages if invalid.

## 5. Email Approval Suitelet

The Suitelet displays approval context and processes the action.

### 5.1 Suitelet Behavior

**Behavior**
- Renders basic transaction information  
- Displays Approve/Reject buttons  
- Allows comment entry  
- Logs IP address (internal only)  
- Adds the approval/rejection to the queue  

### 5.2 Unsupported Actions

**Behavior**
- Cannot change step assignment  
- Cannot alter transaction fields  
- Cannot override SoD violations in Enterprise tier

## 6. Queue Processing

Email approvals are processed asynchronously.

### 6.1 Email Approval Queue (Record)

**Fields**
- Instance  
- Step  
- User  
- Token  
- Action (Approve/Reject)  
- Status  

### 6.2 Queue Processor Script

**Behavior**
- Validates the action  
- Updates the approval instance  
- Advances workflow (approve/reject)  
- Sends notifications  
- Writes logs  
- Handles re-evaluation if enabled  

## 7. Drawer Integration

The Approval Drawer reflects email approvals immediately.

### 7.1 Drawer Updates

**Behavior**
- Timeline updates with the approver name and method ("Email Approval")  
- Comments appear with email approval entries  
- SoD warnings apply normally  
- SLA scoring includes email approvals  

## 8. Troubleshooting Email Approvals

### Common Issues

**Links Not Working**
- Token expired  
- URL parameters modified  
- Suitelet not deployed  

**User Not Recognized**
- Employee not linked to email  
- User inactivated  

**Queue Not Processing**
- Email approval queue script disabled  
- Governance limit reached (rare)  

**Drawer Not Updating**
- Transaction not refreshed  
- Queue still processing  

## 9. Related Documentation

- **Settings Guide**  
- **Approval Steps Guide**  
- **Approval Drawer Guide**  
- **Queue Architecture Guide**
