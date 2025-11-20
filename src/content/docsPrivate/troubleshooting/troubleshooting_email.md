---
title: "Email Approval Troubleshooting"
description: "Troubleshooting guide for resolving email approval issues including token errors, invalid links, queue delays, and missing notifications."
section: "Troubleshooting"
order: 30
---

This guide helps diagnose and resolve issues related to email approval links, HMAC token validation, Suitelet behavior, and queue processing.

If users are unable to approve through email or receive errors when clicking links, follow the steps below.

## 1. Email Approval Link Issues

### 1.1 Link Does Not Open

**Possible Causes**
- URL truncated by email client  
- Email client removed query parameters  
- Copy/paste error in browser  
- HTTP blocked (HTTPS required)  

**Resolution**
- Open link in a different email client  
- Ensure full URL is clicked (not shortened)  
- Confirm HTTPS-only domain is used  

### 1.2 Link Opens but Displays Error Page

**Possible Causes**
- Token expired  
- Suitelet deployment missing or inactive  
- Link parameters modified  

**Resolution**
- Resend approval email  
- Validate Suitelet deployment  
- Ensure URL parameters are intact  

---

## 2. Token Validation Errors

### 2.1 “Invalid Token” Error

**Possible Causes**
- Token tampered with  
- Email client rewrote URL  
- Incorrect token signature  

**Resolution**
- Generate a new approval email  
- Review HMAC secret and token generator scripts  

### 2.2 “Token Expired” Error

**Possible Causes**
- Approver waited too long  
- Token TTL set too short  
- Relayed or forwarded email was stale  

**Resolution**
- Extend token expiration in Settings (admin)  
- Resend approval notification  

### 2.3 “User Not Recognized”

**Possible Causes**
- Employee email does not match NetSuite record  
- User deactivated or reassigned  
- Token references outdated employee ID  

**Resolution**
- Update employee record  
- Ensure user is active  
- Resend email approval  

---

## 3. Email Approval Page Issues

### 3.1 Page Loads Without Approve/Reject Buttons

**Possible Causes**
- Approver not the assigned user  
- SoD enforcement blocking action  
- Delegation improperly applied  

**Resolution**
- Confirm assigned approver in Drawer  
- Review SoD warnings  
- Check delegation record dates and settings  

### 3.2 Page Loads Without Transaction Data

**Possible Causes**
- Missing permissions  
- Suitelet load error  
- Invalid instance or step ID  

**Resolution**
- Ensure approver role can view the transaction  
- Inspect Suitelet logs  
- Regenerate approval email  

---

## 4. Queue Processing Issues

### 4.1 Email Approvals Not Processing

**Possible Causes**
- Email queue script disabled  
- Queue item stuck in “Pending”  
- Token validation error preventing queue creation  

**Resolution**
- Verify Scheduled Script status  
- Inspect Email Approval Queue records  
- Review error messages in queue item  

### 4.2 Queue Items Accumulating

**Possible Causes**
- High governance consumption  
- Script timed out  
- Data mismatch between instance and step  

**Resolution**
- Retry failed queue items  
- Review governance logs  
- Investigate data consistency issues  

---

## 5. Missing Approval Emails

### 5.1 User Never Receives Approval Email

**Possible Causes**
- Email address incorrect  
- Notification templates disabled  
- Email routing or spam filtering  

**Resolution**
- Update employee email  
- Verify email templates in Settings  
- Whitelist NetSuite system domain  

### 5.2 Email Delayed

**Possible Causes**
- NetSuite email queue backlog  
- Heavy traffic in bundle’s notifications  
- Email client throttling  

**Resolution**
- Resend  
- Check notification delivery logs  
- Contact NetSuite Support if systemic delays persist  

---

## 6. Best Practices for Reducing Email Approval Issues

**Tips**
- Avoid forwarding approval emails  
- Use official work email addresses only  
- Encourage approvers to act promptly  
- Adjust token expiration based on workflow patterns  
- Monitor Queue logs regularly  

---

## 7. Troubleshooting Checklist

**Checklist**
- Verify token validity  
- Confirm Suitelet deployment  
- Check Email Queue script  
- Ensure employee email is correct  
- Review instance and step IDs  
- Check Drawer for SoD or assignment warnings  

---

## 8. Related Documentation

- **Email Approval System Guide**  
- **Troubleshooting Guide (Master)**  
- **Queue Architecture Guide**  
- **Approval Drawer Troubleshooting**  