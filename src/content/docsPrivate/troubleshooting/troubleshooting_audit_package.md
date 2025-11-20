---
title: "Audit Package Troubleshooting"
description: "Troubleshooting guide for resolving Audit Package generation issues, missing CSVs, data mismatches, and performance problems."
section: "Troubleshooting"
order: 60
---

This guide covers issues encountered when generating or downloading the Greenlight Audit Package.  
Use this guide when CSVs are missing, exports fail, or audit data appears incomplete.

## 1. Audit Package Not Generating

### 1.1 No ZIP File Returned

**Possible Causes**
- Suitelet execution error  
- Missing file cabinet permissions  
- Script deployment inactive  
- Governance timeout during generation  

**Resolution**
- Check Script Execution Logs  
- Verify user role has file cabinet access  
- Confirm Suitelet is deployed and active  
- Reduce date range to minimize dataset size  

### 1.2 “Internal Error” on Generation

**Possible Causes**
- SuiteQL query failure  
- Unexpected data inconsistency  
- Memory or governance limit exceeded  

**Resolution**
- Review error message in script logs  
- Narrow date range  
- Confirm Approval Instance and Logs contain valid data  

---

## 2. Missing or Empty CSV Files

### 2.1 Missing Logs CSV

**Possible Causes**
- No logs written for selected date range  
- Logging UE disabled  
- Logs written to incorrect instance (rare)  

**Resolution**
- Verify logging scripts are active  
- Confirm Approval Logs exist for the timeframe  

### 2.2 Missing steps.csv or instances.csv

**Possible Causes**
- Rule matched incorrectly  
- Instance created before logging was enabled  
- Query failed to return certain record types  

**Resolution**
- Review rule matching  
- Recreate export for a shorter or different date range  

### 2.3 Empty Delegations CSV

**Possible Causes**
- No active delegations in date window  
- Delegation logging disabled  

**Resolution**
- Confirm delegation logs exist  
- Review delegation configuration  

---

## 3. Incorrect or Unexpected Data in CSV Files

### 3.1 Duplicate Log Entries

**Possible Causes**
- Transaction re-evaluated multiple times  
- Step reassignment due to delegation  
- Multiple queue events on same step  

**Resolution**
- Review Timeline in Drawer  
- Confirm expected approval path  

### 3.2 Missing Step Data

**Possible Causes**
- Step conditions skipped step  
- Step auto-skipped (Enterprise SoD enforcement)  
- Step-level override removed approver  

**Resolution**
- Review instance logs for skipped steps  
- Validate SoD settings  

### 3.3 Incorrect Timestamps

**Possible Causes**
- System time offset  
- Queue delays  
- Approvals performed via email  

**Resolution**
- Review queue processing logs  
- Compare Drawer timestamps with CSV data  

---

## 4. Audit Package Performance Issues

### 4.1 Export Slow or Timing Out

**Possible Causes**
- Very large dataset  
- Heavy SuiteQL queries  
- Conflicting scheduled scripts  

**Resolution**
- Limit date range  
- Export subsets (e.g., by month)  
- Run during off-peak hours  

### 4.2 ZIP Download Fails

**Possible Causes**
- File too large  
- File cabinet quota exceeded  
- NetSuite temporary storage error  

**Resolution**
- Reduce dataset size  
- Clean unused files in file cabinet  
- Contact NetSuite Support if persistent  

---

## 5. Data Integrity or Inconsistency Issues

### 5.1 Instance Data Does Not Match Drawer

**Possible Causes**
- Instance updated after export  
- User re-evaluated rule after edit  
- Queue actions processed after export run  

**Resolution**
- Re-generate Audit Package  
- Confirm no edits occurred during export window  

### 5.2 Logs Missing or Incomplete

**Possible Causes**
- Logging UE inactive  
- Data corruption or deletion (rare)  
- Record-level permissions restricting user  

**Resolution**
- Verify logging deployments  
- Check permissions for Audit Export role  

---

## 6. Troubleshooting Checklist

**Checklist**
- Check Suitelet logs  
- Narrow date window  
- Confirm logging scripts active  
- Verify queue processors running  
- Review Delegation & SoD settings  
- Validate record permissions  
- Confirm file cabinet space  

---

## 7. Related Documentation

- **Audit Package Guide**  
- **Troubleshooting Guide (Master)**  
- **Queue Architecture Guide**  
- **Exception Detection Guide**  
- **Workflow Behavior & Lifecycle**