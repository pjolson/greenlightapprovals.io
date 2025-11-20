---
title: "Support Playbooks"
description: "Internal support playbooks for diagnosing, resolving, and escalating common Greenlight customer issues."
section: "Internal"
order: 90
---

This internal Support Playbooks document provides structured, step-by-step guidance for handling the most common support scenarios.  
Each playbook includes: required checks, root causes, resolution steps, escalation paths, and customer communication notes.

## 1. Overview

Support teams frequently address issues involving:

- Drawer visibility  
- Queue processor failures  
- Email approval token errors  
- Rule or step mismatches  
- Budget Intelligence failures  
- SoD enforcement or detection issues  
- Exception spikes  
- Dashboard mismatches  

This document standardizes how support resolves each category.

---

## 2. Playbook: Drawer Not Appearing

### 2.1 Required Checks

**Checklist**
- Does the user have permission to view the record type?  
- Does the role include access to Approval Instance & Log records?  
- Are all Drawer scripts deployed?  
- Is the client script injecting correctly?  

### 2.2 Likely Root Causes

**Common Issues**
- Permissions  
- Script deployment missing  
- Transaction form heavily customized  
- Drawer injection blocked by other client scripts  

### 2.3 Resolution Steps

1. Confirm Drawer Suitelet is deployed & active  
2. Check client script deployment  
3. Review record form for conflicting inline scripts  
4. Add missing permissions (view instance/log)  
5. Hard refresh browser  

### 2.4 Escalation Criteria

**Escalate if:**
- Drawer injection works in Sandbox but not Production  
- No client-script logs appear  
- Drawer fails to load for all users  

---

## 3. Playbook: Queue Backlog or Queue Failure

### 3.1 Required Checks

**Checklist**
- Are scheduled queue scripts running?  
- Are queue items stuck in “Pending”?  
- Any script governance errors?  
- Recent bundle upgrades?  

### 3.2 Likely Root Causes

**Common Issues**
- Script schedule disabled  
- Queue script hitting governance limits  
- Broken step assignment  
- Data mismatch between instance and step  

### 3.3 Resolution Steps

1. Reactivate scheduled script  
2. Retry failed queue items  
3. Review logs for governance errors  
4. Validate step/instance IDs  
5. Purge corrupt queue items (if needed)  

### 3.4 Escalation Criteria

**Escalate if:**
- Backlog grows for more than 15 minutes  
- Queue repeatedly retries same items  
- Errors indicate data corruption  

---

## 4. Playbook: Email Approval Errors

### 4.1 Required Checks

**Checklist**
- Token valid?  
- Token expiration?  
- Correct Suitelet deployment?  
- URL modified by email client?  

### 4.2 Likely Root Causes

**Common Issues**
- Expired or tampered token  
- Missing Suitelet deployment  
- Email client truncating links  

### 4.3 Resolution Steps

1. Ask user to open link in full browser  
2. Resend approval email  
3. Confirm Suitelet deployment active  
4. Inspect HMAC logs  

### 4.4 Escalation Criteria

**Escalate if:**
- HMAC signature repeatedly invalid  
- Token generation fails consistently  
- Suitelet returning 500 errors  

---

## 5. Playbook: Rule Not Triggering or Wrong Rule Triggered

### 5.1 Required Checks

**Checklist**
- Transaction classifications complete?  
- Rule active?  
- Amount thresholds correct?  
- Competing rules exist?  

### 5.2 Likely Root Causes

**Common Issues**
- Missing record fields  
- Overlapping rule criteria  
- Specificity scoring selecting another rule  

### 5.3 Resolution Steps

1. Validate classification fields  
2. Review rule scoring contributors  
3. Disable or adjust competing rules  
4. Test using sample transactions  

### 5.4 Escalation Criteria

**Escalate if:**
- Specificity scoring seems incorrect  
- Rule engine logs inconsistent  

---

## 6. Playbook: Step Assignment Errors

### 6.1 Required Checks

**Checklist**
- Approver active and has permissions?  
- Step-level conditions match transaction?  
- SoD warning displayed?  
- Delegation active?  

### 6.2 Likely Root Causes

**Common Issues**
- Inactive or unassigned approver  
- SoD detection blocking assignment  
- Dynamic approver field empty  

### 6.3 Resolution Steps

1. Adjust approver  
2. Review step-level override  
3. Validate SoD settings  
4. Inspect delegation dates  

### 6.4 Escalation Criteria

**Escalate if:**
- Steps skip unpredictably  
- Assignment fails for multiple rules  
- Error messages unclear  

---

## 7. Playbook: Budget Block Missing or Incorrect

### 7.1 Required Checks

**Checklist**
- Budget Intelligence enabled?  
- Budget exists for classification combo?  
- Default period configured?  

### 7.2 Likely Root Causes

**Common Issues**
- Missing budgets  
- Classification mismatch  
- SuiteQL failure  

### 7.3 Resolution Steps

1. Confirm budget exists for subsidiary/department/class/location  
2. Recalculate transaction  
3. Validate Report Settings configuration  

### 7.4 Escalation Criteria

**Escalate if:**
- Budget Engine repeatedly fails  
- All transactions missing budgets  

---

## 8. Playbook: SoD Issues

### 8.1 Required Checks

**Checklist**
- SoD enabled?  
- Enterprise tier?  
- Delegation valid?  

### 8.2 Likely Root Causes

**Common Issues**
- Expected warnings not showing  
- Enforcement blocking unexpectedly  

### 8.3 Resolution Steps

1. Validate SoD settings  
2. Review Drawer warnings  
3. Reproduce with test users  
4. Inspect SoD logs  

### 8.4 Escalation Criteria

**Escalate if:**
- Enforcement misfires  
- Multiple false-positive violations  

---

## 9. Playbook: Exceptions Spike

### 9.1 Required Checks

**Checklist**
- What type of exception spiked?  
- Is queue failing?  
- Recent rule/step changes?  

### 9.2 Likely Root Causes

**Common Issues**
- Misconfiguration  
- Missing data fields  
- Script upgrade issues  

### 9.3 Resolution Steps

1. Review Exceptions dashboard  
2. Identify pattern (rule/step/user)  
3. Reverse recent changes  
4. Re-run queue items  

### 9.4 Escalation Criteria

**Escalate if:**
- Exception spike persists > 1 day  
- Severe exceptions (Critical) increase  

---

## 10. Playbook: Dashboard Not Updating

### 10.1 Required Checks

**Checklist**
- Saved searches functioning?  
- Report Settings correct?  
- Queue scripts running?  

### 10.2 Likely Root Causes

**Common Issues**
- Stale saved search cache  
- Report Settings misconfigured  
- SLA logic failing  

### 10.3 Resolution Steps

1. Refresh saved searches  
2. Revalidate Report Settings thresholds  
3. Confirm queue scripts executed recently  

### 10.4 Escalation Criteria

**Escalate if:**
- Dashboard data >24 hours stale  
- SLA metrics incorrect system-wide  

---

## 11. Escalation Levels

### 11.1 Level 1 — Support

Handles:
- Permissions  
- Basic rule/step issues  
- Customer confusion  
- UI troubleshooting  

### 11.2 Level 2 — Product Specialist

Handles:
- Rule engine behavior  
- Deep exception analysis  
- Drawer rendering issues  
- Budget Engine inconsistencies  

### 11.3 Level 3 — Engineering

Handles:
- Queue processor errors  
- Engine misbehavior  
- Data corruption  
- Security or SoD enforcement issues  

---

## 12. Customer Communication Templates

### 12.1 Acknowledge Ticket

“Thanks for reaching out! We’re reviewing the issue now. I’ll follow up shortly with next steps.”

### 12.2 Request for Reproduction

“To help diagnose the issue, could you provide a transaction ID and the role used when reproducing the problem?”

### 12.3 Resolution Provided

“We’ve identified the cause of the issue and resolved it. Please refresh and try again.”

---

## 13. Related Documentation

- **Troubleshooting Guide (Master)**  
- **Drawer Troubleshooting**  
- **Email Approval Troubleshooting**  
- **Budget Troubleshooting**  
- **SoD Troubleshooting**
