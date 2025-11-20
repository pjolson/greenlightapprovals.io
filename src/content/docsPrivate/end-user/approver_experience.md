---
title: "Approver Experience Guide"
description: "How approvers review, approve, reject, and comment on transactions using the Greenlight Approval Drawer and email approvals."
section: "Users"
order: 10
---

This guide explains how approvers use Greenlight to review and act on approvals through the Approval Drawer, email links, and the Command Center.  
It focuses on practical steps, minimizing configuration detail.  

## 1. Overview

Approvers can complete all approval actions through:
- The **Greenlight Approval Drawer**  
- **Email approval links**  
- The **Command Center** (if permitted by role)  

Actions approvers may take:
- Approve  
- Reject  
- Add comments  
- Review transaction context  
- View timeline history  
- View exceptions or warnings  

This guide covers everything needed for day‑to‑day approval work.

## 2. Accessing the Approval Drawer

The Approval Drawer appears automatically on supported transactions when the approver has access.

**Navigation**
- Open a transaction assigned to you  
- The Drawer appears on the right side of the screen  

**Behavior**
- Drawer loads instantly without page reload  
- Approvers may collapse or expand sections  
- All approval context is embedded in the drawer  

## 3. Reviewing Approval Details

Approvers should review the information in the **Details** tab before approving.

### 3.1 Details Tab

**Fields**
- Transaction header  
- Amounts and classifications  
- Budget block (Pro & Enterprise)  
- AI Insights (Pro limited, Enterprise full)  
- SoD warnings (if applicable)  
- Exception alerts  

### 3.2 Timeline Tab

**Fields**
- Step-by-step approval history  
- Prior approvers  
- Comments  
- Delegated actions  
- Rejections or escalations  

### 3.3 Comments Tab

**Behavior**
- Approvers may leave notes for admins or future reviewers  
- Comments appear in the timeline and Audit Package  

## 4. Approving a Transaction

Approvers can approve from:
- The **Approve** button in the Drawer  
- Email approval links  
- The Command Center (if permitted)

### 4.1 Approval Behavior

**Behavior**
- Approval completes the current step  
- Workflow advances to the next step  
- SLA metrics update  
- Timeline updates automatically  
- Approval email notifications may be sent  

### 4.2 Approval Comments

**Behavior**
- Approvers may enter optional comments  
- Comments are logged in the Approval Instance  
- Comments appear in the timeline and audit exports  

## 5. Rejecting a Transaction

Rejecting sends the transaction back to the submitter or halts the workflow.

### 5.1 Reject Behavior

**Behavior**
- Step is marked “Rejected”  
- Workflow stops unless resubmission is allowed  
- Rejection reasons appear in timeline and logs  
- Submitter receives a rejection notification  

### 5.2 Adding Rejection Notes

**Behavior**
- Approver may include a comment explaining the rejection  
- Notes appear in the timeline and Audit Package  

## 6. Email Approvals

Approvers may approve or reject directly from their inbox.

### 6.1 Using Email Links

**Behavior**
- Links open a secure Suitelet  
- Approver sees summary information  
- Approve/Reject buttons are available  
- Comments may be entered  

### 6.2 After Email Approval

**Behavior**
- Approval Drawer updates automatically  
- Timeline logs reflect “Email Approval”  
- SoD rules still apply  
- Queue processing ensures step advancement  

## 7. Acting as a Delegate

Approvers may be assigned steps on behalf of another user.

### 7.1 Delegated Approval Behavior

**Behavior**
- Drawer indicates “Acting as delegate for [User]”  
- Both the delegator and delegate appear in logs  
- Enterprise SoD rules still apply  

## 8. Exceptions & Warnings

Approvers may see warnings in the Drawer.

### 8.1 Exception Types

**Fields**
- Assignment issues  
- SoD warnings  
- Budget warnings  
- Queue or data issues  

### 8.2 Behavior

**Behavior**
- Exceptions are read‑only  
- Approvers cannot override warnings  
- Severe errors prevent actions  

## 9. Approver Best Practices

**Tips**
- Review the timeline before approving  
- Add comments for high‑value or unusual transactions  
- Use email approvals only when context is fully understood  
- Contact your admin if steps appear incorrect or missing  

## 10. Troubleshooting Approver Issues

### Common Issues

**Drawer Not Appearing**
- Missing transaction permission  
- Role missing custom record access  

**Cannot Approve**
- Not the assigned approver  
- Step conditions not met  
- SoD enforcement blocking approval  

**Email Link Not Working**
- Token expired  
- URL modified  

## 11. Related Documentation

- **Using the Approval Drawer**  
- **Submitter Experience Guide**  
- **Email Approval System Guide**  
- **Delegations Guide**