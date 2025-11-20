---
title: "Approval Drawer Troubleshooting"
description: "Troubleshooting guide for issues related to the Greenlight Approval Drawer, including loading issues, missing data, errors, and unexpected behavior."
section: "Troubleshooting"
order: 20
---

This guide covers common issues and resolutions related to the Greenlight Approval Drawer.  
If the Drawer does not appear, loads incompletely, or displays incorrect information, use the steps below to identify and resolve the issue.

## 1. Drawer Not Appearing

### 1.1 Drawer Missing Entirely

**Possible Causes**
- The user does not have permission to view the transaction  
- Drawer Client Script not deployed  
- Script not attached to the transaction form  
- Rule did not match → no Approval Instance created  

**Resolution**
- Confirm the user has correct transaction access  
- Verify script deployment is active  
- Confirm the correct form is being used  
- Review rule matching criteria in the Approval Rule  

### 1.2 Drawer Hidden Due to Role Restrictions

**Possible Causes**
- Role cannot access custom records  
- Role cannot view Approval Instance or Approval Log records  
- Drawer API Suitelet returning unauthorized  

**Resolution**
- Add View access to necessary custom records  
- Validate role permissions for the underlying record  
- Check role-specific access restrictions  

---

## 2. Drawer Loads but Missing Data

### 2.1 Missing Timeline Entries

**Possible Causes**
- No approval logs written yet  
- Queue script delayed  
- Logs written for incorrect instance (rare)  

**Resolution**
- Confirm queue script is running  
- Check Approval Logs on the record  
- Review instance linkage  

### 2.2 Missing Budget Block

**Possible Causes**
- Budget Intelligence disabled  
- No budgets exist for the classification  
- Budget Engine returned an error  

**Resolution**
- Enable Budget Intelligence  
- Validate budgets exist for the record’s subsidiary/class/dept/location  
- Check exceptions in Drawer for Budget Engine errors  

### 2.3 Missing AI Insights

**Possible Causes**
- AI Insights disabled in Settings  
- Tier does not include AI insights (Core)  
- Data insufficient for insight generation  

**Resolution**
- Enable AI Insights  
- Confirm account tier supports AI features  
- Review Drawer exceptions  

---

## 3. Actions Not Working (Approve / Reject Buttons)

### 3.1 Buttons Not Visible

**Possible Causes**
- User is not the assigned approver  
- SoD enforcing a block  
- Delegation incorrectly applied  
- Role restrictions hiding action buttons  

**Resolution**
- Confirm user is correct approver for the step  
- Review SoD warnings  
- Validate delegation settings  

### 3.2 Approve/Reject Buttons Do Nothing

**Possible Causes**
- Client Script error  
- Suitelet endpoint not responding  
- Queue creation failing silently  

**Resolution**
- Open browser console for errors  
- Check Suitelet logs  
- Validate queue record creation  

---

## 4. Drawer Showing Errors or Warnings

### 4.1 Generic “Unable to Load Drawer” Error

**Possible Causes**
- Drawer API Suitelet timed out  
- Unexpected exception in data pipeline  
- Missing permissions for certain fields  

**Resolution**
- Review Script Execution Logs  
- Check transaction permissions  
- Confirm Drawer API Suitelet configuration  

### 4.2 SoD Warnings Unexpectedly Appearing

**Possible Causes**
- Self-approval scenario  
- Duplicate approver in multiple steps  
- Delegation conflict  

**Resolution**
- Review SoD configuration  
- Validate step overrides  
- Confirm delegation settings  

### 4.3 Data Integrity Warnings

**Possible Causes**
- Transaction modified mid-approval  
- Classification changes requiring re-evaluation  
- Instance outdated or mismatched  

**Resolution**
- Save transaction again to trigger evaluation  
- Review exception detail  
- Reset step sequence if necessary  

---

## 5. Drawer Performance Issues

### 5.1 Drawer Slow to Load

**Possible Causes**
- Budget or AI engines taking long to evaluate  
- Large instance with many logs  
- SuiteQL performance under load  

**Resolution**
- Verify Budget Intelligence configuration  
- Reduce Drawer complexity if possible  
- Review SuiteAnalytics performance  

### 5.2 Drawer Flickers or Refreshes Unexpectedly

**Possible Causes**
- Client Script double-injecting  
- Duplicate deployments  
- Conflicting customizations on the form  

**Resolution**
- Remove duplicate scripts  
- Confirm only one Drawer deployment is active  
- Validate custom form configurations  

---

## 6. UI Display Issues

### 6.1 Drawer Overlaps Page Content

**Possible Causes**
- Custom form layout overrides  
- Third-party scripts interfering  
- CSS conflict  

**Resolution**
- Switch to standard form temporarily  
- Identify conflicting scripts or CSS  
- Reapply Drawer script cleanly  

### 6.2 Drawer Not Expanding/Collapsing Correctly

**Possible Causes**
- Client Script error  
- Missing DOM elements  
- Browser-specific issue  

**Resolution**
- Test in another browser  
- Review console for script errors  

---

## 7. Troubleshooting Checklist

**Checklist**
- Confirm rule matched and instance exists  
- Confirm user permissions correct  
- Check Drawer Suitelet logs  
- Verify queue script running  
- Look for SoD violations  
- Check Budget/AI configuration  
- Review exceptions in Timeline  

---

## 8. Related Documentation

- **Troubleshooting Guide (Master)**  
- **Email Approval Troubleshooting**  
- **Budget Troubleshooting**  
- **SoD Troubleshooting**  
- **Approval Steps Guide**  
- **Approval Drawer Guide**