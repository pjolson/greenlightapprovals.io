---
title: "Submitter Experience Guide"
description: "What submitters see when creating and submitting transactions for approval."
section: "Users"
order: 20
---

Submitter guide content coming soon.

---
title: "Submitter Experience Guide"
description: "How submitters create, submit, and track transactions through the Greenlight approval process."
section: "Users"
order: 2
---

This guide explains the submitter workflow—how users create transactions, submit them for approval, view status, respond to rejections, and track progress through Greenlight.

## 1. Overview

Submitters interact with Greenlight whenever they:
- Create a transaction requiring approval  
- Submit or resubmit a record  
- Track approval progress  
- Review rejection comments  
- Respond to exceptions  

Submitters do **not** configure rules or steps; they simply create records that trigger approval workflows.

## 2. Creating a Transaction

Submitters create transactions the same way they do in standard NetSuite.

**Behavior**
- Greenlight automatically detects whether approval is required.  
- No additional steps are needed from the submitter.  
- Validation rules may apply depending on configuration.

## 3. Submitting a Transaction for Approval

When the user saves or submits a transaction:

### 3.1 Approval Trigger

**Behavior**
- Greenlight evaluates rules and creates an approval instance.  
- The transaction status changes to **Pending Approval** (or a Greenlight custom status, if configured).  
- The submitter receives a confirmation message (optional).  

### 3.2 Submission Tips

**Tips**
- Ensure classification values (dept/class/location) are correct.  
- Verify amounts and vendor fields before submission.  
- Make sure required fields for rule matching are filled out.

## 4. Tracking Approval Status

Submitters can track approval progress directly from the transaction.

### 4.1 Approval Drawer Visibility

**Behavior**
- Submitters can open the Approval Drawer to view:
  - Current approver  
  - Step sequence  
  - Timeline history  
  - Comments  
  - Exceptions or warnings  

### 4.2 Timeline View

**Behavior**
- Timeline shows real-time updates as approvers take action.  
- Submitters can see rejection or escalation reasons.  
- Delegated actions are clearly labeled.

## 5. Responding to Rejections

If a transaction is rejected, submitters may need to revise and resubmit.

### 5.1 Rejection Behavior

**Behavior**
- Rejecting halts the workflow.  
- Submitter receives a rejection notification.  
- Rejection comments are visible in the Drawer and timeline.  

### 5.2 Resubmitting

**Behavior**
- Submitter edits the transaction.  
- Save and resubmit to trigger re-evaluation.  
- Workflow restarts from step one unless configured otherwise.

## 6. Exceptions & Alerts

Submitters may encounter exceptions that affect workflow progression.

### 6.1 Common Exceptions

**Fields**
- Missing or invalid approver  
- Budget overages (Pro & Enterprise)  
- SoD warnings (Pro & Enterprise)  
- Approval logic failures  
- Data consistency issues  

### 6.2 Behavior

**Behavior**
- Exceptions appear in the drawer.  
- Submitters may need to adjust fields and resubmit.  
- Severe exceptions may prevent submission until corrected.

## 7. Email Notifications

Submitters receive emails related to key workflow events.

### 7.1 Notification Types

**Fields**
- Submission confirmations (optional)  
- Rejection notices  
- Escalation notices  
- Final approval notifications  

### 7.2 Behavior

**Behavior**
- Notifications use the templates configured by the administrator.  
- Email timing may depend on queue processing.  

## 8. Best Practices for Submitters

**Tips**
- Ensure key classification fields are correct.  
- Provide clear memo information on high-value transactions.  
- Review Drawer timeline before resubmitting rejected records.  
- Contact admin if no approval rule seems to match.

## 9. Troubleshooting Submitter Issues

### Common Issues

**Transaction Did Not Trigger Approval**
- Missing classification or incorrect subsidiary  
- Rule criteria not met  
- Rule inactive or expired  

**Status Stuck on Pending Approval**
- Queue processor not running  
- Approver unavailable (delegation may help)  

**Rejection Without Explanation**
- Approver may not have entered comments  
- Check timeline or approval log  

## 10. Related Documentation

- **Approver Experience Guide**  
- **Using the Approval Drawer**  
- **Email Approval System Guide**  
- **Workflow Behavior & Lifecycle**