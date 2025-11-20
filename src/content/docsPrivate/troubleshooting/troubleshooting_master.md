---
title: "Troubleshooting Guide (Master)"
description: "Centralized troubleshooting guide covering common issues across rules, steps, Drawer, queues, email approvals, SoD, budgets, and performance."
section: "Troubleshooting"
order: 10
---

This master troubleshooting guide consolidates the most common issues encountered when using Greenlight Approvals.  
Each section includes symptoms, likely causes, and recommended steps to resolve the problem.

Use this guide as your first stop before exploring module-specific troubleshooting pages.

## 1. Approval Drawer Issues

### 1.1 Drawer Not Appearing

**Possible Causes**
- User lacks permission to view transaction  
- Script deployment missing or disabled  
- Drawer client script not linked to form  
- Instance not created due to rule mismatch  

**Resolution**
- Verify role permissions (Transactions + Custom Records)  
- Confirm script deployments are active  
- Ensure form uses the correct script ID  
- Check rule matching criteria and Settings  

### 1.2 Drawer Loads but Shows “No Approval Required”

**Possible Causes**
- No rule matched  
- Rule inactive or expired  
- Amount or classification outside configured range  

**Resolution**
- Validate rule filters  
- Confirm rule active dates  
- Check rule specificity logic in Settings  

### 1.3 Drawer Slow to Load

**Possible Causes**
- Budget Engine querying large datasets  
- SuiteQL contention  
- Excessive logged events on large transactions  

**Resolution**
- Narrow budget classifications  
- Confirm Budget Intelligence configuration  
- Review SuiteAnalytics performance  

---

## 2. Approval Rules & Steps Issues

### 2.1 Rule Not Triggering

**Possible Causes**
- Rule filters too restrictive  
- Effective dates invalid  
- Rule misordered relative to more specific rule  

**Resolution**
- Reduce filters and test  
- Verify effective date ranges  
- Review rule specificity scoring  

### 2.2 Step Not Assigning Approver

**Possible Causes**
- Dynamic approver field empty  
- Role or group invalid  
- SoD enforcement blocking assignment  

**Resolution**
- Correct dynamic field reference  
- Validate role/group membership  
- Review SoD configuration  

---

## 3. Queue Processing Issues

### 3.1 Approval Stuck in Pending

**Possible Causes**
- Queue script not running  
- Queue item erroring on processing  
- Workflow exception blocking progression  

**Resolution**
- Verify scheduled script execution logs  
- Check queue status for errors  
- Review instance exceptions in Drawer  

### 3.2 Queue Items Accumulating

**Possible Causes**
- Governance-heavy transactions  
- Script interruption  
- Data inconsistency during processing  

**Resolution**
- Inspect governance logs  
- Retry or clean up failed queue items  
- Review log and exception detail  

---

## 4. Email Approval Issues

### 4.1 Email Links Not Working

**Possible Causes**
- Token expired  
- URL altered or broken  
- Suitelet script inactive  

**Resolution**
- Re-send email notification  
- Inspect HMAC token payload  
- Verify Suitelet deployment  

### 4.2 “User Not Recognized” Error

**Possible Causes**
- Email address mismatch on employee record  
- User deactivated  
- Token referencing old employee ID  

**Resolution**
- Update employee email  
- Validate account active status  

---

## 5. Segregation of Duties (SoD) Issues

### 5.1 SoD Blocking Unexpected Approver

**Possible Causes**
- Duplicate approval attempt  
- Self-approval scenario  
- Step override misconfigured  

**Resolution**
- Review SoD logs in Drawer  
- Correct step-level overrides  
- Confirm SoD mode (Warn vs Enforce)  

### 5.2 SoD Warnings Not Displaying

**Possible Causes**
- SoD disabled  
- Incorrect classification of approver identity  

**Resolution**
- Enable SoD in Settings  
- Check delegation or user identity resolution  

---

## 6. Budget Intelligence Issues

### 6.1 Budget Block Missing

**Possible Causes**
- Budget Intelligence disabled  
- No budgets for classification  
- Missing period budgets  

**Resolution**
- Enable Budget Intelligence  
- Validate budgets exist for subsidiary/class/dept/location  
- Review period configuration  

### 6.2 Variance Looks Incorrect

**Possible Causes**
- Incorrect budget period  
- Unposted actuals missing  
- Pending amount not expected  

**Resolution**
- Confirm period selection  
- Recheck classification assignments  
- Recalculate expected pending amounts  

---

## 7. Performance Issues

### 7.1 Drawer or Command Center Slow

**Possible Causes**
- Saved search caching delays  
- Large volume of instances/logs  
- Budget or AI insights generation overhead  

**Resolution**
- Optimize saved searches  
- Consider limiting search result scope  
- Confirm tier-based insight configuration  

### 7.2 Queue Delays

**Possible Causes**
- Competing scheduled scripts  
- High governance consumption  
- Large batch workloads  

**Resolution**
- Increase queue script frequency  
- Reduce heavy UE operations  
- Monitor governance logs  

---

## 8. Installation & Configuration Issues

### 8.1 Installation Did Not Create Menus or Custom Records

**Possible Causes**
- Role permissions restricted  
- Bundle installation incomplete  

**Resolution**
- Reinstall bundle with admin role  
- Validate all custom records exist  

### 8.2 Settings Not Applying

**Possible Causes**
- Cache delay  
- Incorrect record updates  
- UE script inactive  

**Resolution**
- Wait 2–3 minutes and reload  
- Validate Settings fields updated  
- Confirm Settings UE deployment  

---

## 9. Support Information

If issues persist after completing these steps:

**Contact your Greenlight administrator or support representative.**  
Provide any error messages, screenshots, logs, and the transaction ID to speed up resolution.

---

## 10. Related Documentation

- **Approval Drawer Troubleshooting**  
- **Email Approval Troubleshooting**  
- **SoD Troubleshooting**  
- **Budget Troubleshooting**  
- **Queue Troubleshooting**  
- **Workflow Behavior & Lifecycle**