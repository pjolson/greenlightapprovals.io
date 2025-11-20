---
title: "How to Approve via Email"
description: "Step-by-step guide for approvers who want to approve or reject transactions directly from their email inbox."
section: "Users"
order: 40
---

Approving via email allows approvers to take action without logging into NetSuite.  
This guide explains how email approvals work, how to use the secure links, and what to expect after submitting an approval or rejection.

## 1. Overview

Greenlight supports email-based approval for all approvers, regardless of role or NetSuite access level.

Approvers can:
- Approve a transaction  
- Reject a transaction  
- Add optional comments  
- Review key transaction information  

All email approval actions use secure HMAC-protected links.

## 2. Using Email Approval Links

Each approval email includes two buttons or links:

- **Approve**  
- **Reject**

Clicking either link opens a secure approval page.

### 2.1 What Happens When You Click a Link

**Behavior**
- A secure Suitelet opens in your browser.  
- You can review summary transaction details.  
- You can optionally add a comment.  
- You click **Approve** or **Reject** to submit your action.  

### 2.2 Access Requirements

**Behavior**
- You do **not** need to be logged into NetSuite.  
- Your action is validated using a secure HMAC token.  
- Links may expire after a configured time window.  

## 3. Reviewing the Summary Page

The secure approval page provides a simplified summary of the transaction.

### 3.1 Summary Fields

**Fields**
- Vendor / customer  
- Amount  
- Memo  
- Basic classification  
- Current step and approver  
- Exceptions or warnings (if applicable)  

### 3.2 Behavior

**Behavior**
- The page does not show full drawer context.  
- For complex or high-value approvals, reviewing in NetSuite is recommended.  

## 4. Approving from the Email Link

Approvers can complete the step directly from the email.

### 4.1 Approval Behavior

**Behavior**
- Step is marked complete.  
- The workflow proceeds to the next step.  
- Timeline updates automatically.  
- SLA scoring includes the email approval.  
- Notification emails may be triggered.  

### 4.2 Optional Comments

**Behavior**
- Approver may enter a brief comment.  
- Comment appears in the timeline and Audit Package.  

## 5. Rejecting from the Email Link

Rejecting a transaction halts the workflow until the submitter resubmits.

### 5.1 Rejection Behavior

**Behavior**
- Workflow stops immediately.  
- Rejection notes are included in logs.  
- Submitter receives a rejection notification.  

### 5.2 Adding Rejection Notes

**Behavior**
- Notes help clarify the reason for rejection.  
- Notes appear in the Approval Drawer and audit exports.  

## 6. What Happens After Email Approval

After approval or rejection is submitted:

**Behavior**
- Approval Queue processes the action.  
- Status updates in real time.  
- The Approval Drawer reflects the action with the label **Email Approval**.  
- Timeline displays:
  - The approver  
  - Method ("Email")  
  - Timestamp  
  - Comments (if entered)  

## 7. Troubleshooting Email Approval Issues

### Common Issues

**Link Not Working**
- Token expired  
- URL modified  
- Suitelet temporarily unavailable  

**Page Shows “User Not Recognized”**
- Email address does not match employee record  
- User deactivated  

**Action Not Processing**
- Queue processor not running  
- Token already used  

**Missing Approval Email**
- Check spam or filters  
- Contact admin to confirm notifications are enabled  

## 8. Best Practices for Email Approval

**Tips**
- Review high-value or complex transactions directly in NetSuite.  
- Use comments when rejecting or approving unusual requests.  
- Contact administrators if exceptions appear frequently.  

## 9. Related Documentation

- **Approver Experience Guide**  
- **Using the Approval Drawer**  
- **Email Approval System Guide**
