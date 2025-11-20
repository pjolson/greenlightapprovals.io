---
title: "SoD Troubleshooting"
description: "Troubleshooting guide for Segregation of Duties (SoD) warnings, enforcement behavior, delegation conflicts, and unexpected approval blocks."
section: "Troubleshooting"
order: 50
---

This guide helps diagnose and resolve issues related to Segregation of Duties (SoD), including self-approval detection, duplicate approval conflicts, delegation mismatches, and unexpected enforcement blocking.

Use this guide when approvers encounter SoD warnings or when steps fail to assign due to enforcement.

## 1. Overview of SoD Troubleshooting

SoD detects policy violations involving:
- Self-approval  
- Duplicate approvals within the same workflow  
- Delegation conflicts  
- Role-based conflict patterns  

Enterprise tier enforces SoD; Pro tier displays warnings only.

---

## 2. SoD Blocking Unexpectedly (Enterprise)

### 2.1 Self-Approval Block

**Possible Causes**
- Approver is also the record creator  
- Delegated approver is tied to delegator who created the record  
- Step override set to enforce  

**Resolution**
- Check rule- and step-level SoD settings  
- Review delegation records  
- Enable “Allow Self-Approval” on step (if policy allows)  

### 2.2 Duplicate Approval Block

**Possible Causes**
- Same user appears on multiple steps  
- Resubmission triggered repeated assignment  
- Step-level override incorrectly configured  

**Resolution**
- Adjust step assignments  
- Review workflow history in Timeline  
- Update step-level duplicate approval policy  

---

## 3. SoD Warnings Not Appearing (Pro & Enterprise)

### 3.1 SoD Disabled

**Possible Causes**
- SoD toggle off in Settings  

**Resolution**
- Enable SoD globally  

### 3.2 Incorrect Approver Identity Resolution

**Possible Causes**
- Delegation active but not recognized  
- Multiple roles assigned to user  

**Resolution**
- Verify delegation settings  
- Review Approval Logs  

---

## 4. Delegation-Related SoD Issues

### 4.1 Delegated Approver Blocked

**Possible Causes**
- Delegation conflicts with SoD policy  
- Exclusive mode incorrectly applied  
- Delegator has conflicting prior approvals  

**Resolution**
- Review delegation date ranges  
- Disable exclusive mode if unnecessary  
- Confirm SoD step overrides  

### 4.2 Delegation Not Honored

**Possible Causes**
- Delegation expired or inactive  
- Delegation created for wrong user  
- SoD override preventing assignment  

**Resolution**
- Update delegation dates  
- Check delegator identity  
- Adjust step-level SoD settings  

---

## 5. Step Not Assigning Due to SoD Enforcement

### 5.1 Step Skips Automatically

**Possible Causes**
- Enterprise SoD auto-skip enabled  
- Approver violates self-approval or duplicate logic  

**Resolution**
- Review instance logs  
- Update step-level override settings  

### 5.2 Step Assigns but Approver Cannot Act

**Possible Causes**
- Enforcement active only at approval-time  
- SoD violation detected during action  

**Resolution**
- Review Drawer warnings  
- Correct conflicting approver assignments  

---

## 6. Timeline & Log Conflicts

### 6.1 SoD Violation Logged Unexpectedly

**Possible Causes**
- Transaction re-evaluated after edit  
- Delegation changed mid-approval  
- Step-level override reset  

**Resolution**
- Review edit history  
- Check rule/step updates  
- Validate delegation at time of action  

### 6.2 Logs Missing SoD Context

**Possible Causes**
- SoD disabled at time of log creation  
- Logging UE inactive  

**Resolution**
- Reenable SoD  
- Check script deployments  

---

## 7. Troubleshooting Checklist

**Checklist**
- SoD enabled in Settings  
- Correct tier (Enterprise for enforcement)  
- Delegation active and correct  
- Step-level overrides reviewed  
- Review Drawer warnings and exceptions  
- Inspect Approval Logs for SoD entries  

---

## 8. Related Documentation

- **Segregation of Duties (SoD) Guide**  
- **Approval Steps Guide**  
- **Approval Drawer Troubleshooting**  
- **Troubleshooting Guide (Master)**  