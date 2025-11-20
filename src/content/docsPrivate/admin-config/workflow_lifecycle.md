---
title: "Workflow Behavior & Lifecycle"
description: "How Greenlight evaluates rules, creates approval instances, and advances each step during the approval lifecycle."
section: "Administration"
order: 50
---

The Greenlight approval lifecycle fully replaces NetSuite’s native approval routing logic.  
This guide explains how workflows are evaluated, how approval instances are created, and how steps advance from assignment to completion.

## 1. Overview

The Greenlight workflow engine determines:
- When a rule should match  
- How specificity decides between competing rules  
- How approval instances are created  
- When approvers are assigned  
- How steps progress  
- When escalations occur  
- When approval logs are written  

The workflow lifecycle is consistent across all supported transaction types.

## 2. Rule Evaluation Phase

Rule evaluation determines which Approval Rule applies to the transaction.

### 2.1 Evaluation Trigger Points

**Behavior**
- On transaction submit  
- On edit (if status transitions to Pending Approval)  
- On resubmission after rejection  
- During re-evaluation if settings permit it  

### 2.2 Matching Rules

**Behavior**
- All active rules for the transaction type are loaded.  
- Transaction fields are compared to rule criteria.  
- Conditional logic is evaluated.  
- Ineligible rules are discarded.

### 2.3 Specificity Scoring

**Behavior**
- Matching fields add weighted specificity.  
- Custom segments contribute extra weight.  
- Amount range narrowing increases score.  
- Highest scoring rule is selected.

### 2.4 No-Match Behavior

**Behavior**
- If no rule matches, the transaction may auto-approve or remain in standard NetSuite status depending on configuration.  
- Exceptions may be logged if enabled.

## 3. Instance Creation Phase

Once a rule is selected, Greenlight creates an **Approval Instance**.

### 3.1 Instance Contents

**Fields Stored**
- Transaction ID  
- Rule ID  
- Step list  
- Assigned approvers  
- Timestamps (created, updated)  
- Snapshot fields (amounts, department, vendor, etc.)

### 3.2 Initial Step Assignment

**Behavior**
- Greenlight assigns the first valid step.  
- Step-level conditions are evaluated before assignment.  
- SoD checks run immediately for Enterprise tier.  
- Assignment emails are sent.

## 4. Approval Step Processing

Steps advance one by one until the workflow is complete.

### 4.1 Approver Actions

**Behavior**
- Approver can approve or reject through the Approval Drawer.  
- Email approval (approve/reject link) is also supported.  
- Comments are recorded per action.

### 4.2 Step Completion

**Behavior**
- On approval, the step is marked complete.  
- Timeline updates in real time.  
- SLA timers and metrics are updated.

### 4.3 Rejection Handling

**Behavior**
- Workflow halts.  
- Submitter may resubmit based on rule configuration.  
- Instance logs capture the rejection context.

## 5. Escalation Engine

Greenlight includes an escalation engine for overdue approvals.

### 5.1 Escalation Logic

**Behavior**
- Evaluates overdue steps based on SLA or escalation thresholds.  
- Assigns escalated approver when needed.  
- Sends escalation notifications.  
- Records escalation actions in the approval log.

### 5.2 Scheduled Script Dependency

**Behavior**
- Escalation Engine runs via scheduled script.  
- Must remain active for escalations to process.

## 6. Queue Processing

Two queues support asynchronous operations.

### 6.1 Approval Queue

**Behavior**
- Processes approval and rejection actions.  
- Ensures stable state transitions.  
- Handles conditional step skipping.  
- Updates timeline and logs.

### 6.2 Email Approval Queue

**Behavior**
- Processes actions triggered via email approval links.  
- Validates HMAC tokens.  
- Applies updates even if the user is not logged in.

## 7. Re-Evaluation Logic

Greenlight supports rule re-evaluation under certain scenarios.

### 7.1 When Re-Evaluation Occurs

**Behavior**
- On transaction edit  
- When amount or subsidiary changes  
- When custom segment values change  

### 7.2 Impact of Re-Evaluation

**Behavior**
- If rules change, instance may rebuild steps.  
- Steps already taken remain in log.  
- Admins can disable re-evaluation via Settings.

## 8. End-of-Workflow Behavior

### 8.1 Final Approval

**Behavior**
- When last step completes, workflow is marked **Approved**.  
- Transaction is updated to final approved status.  
- Final logs are written.

### 8.2 Auto-Approval Scenarios

**Behavior**
- If all steps skip due to conditions.  
- If rules specify auto-approve for certain criteria.  
- If no-match configuration is set to auto-approve.

### 8.3 Audit Package Integration

**Behavior**
- Completed workflows appear in the Audit Package generator.  
- All logs, steps, and metadata captured automatically.

## 9. Troubleshooting Lifecycle Issues

### Common Issues

**Rule Not Triggering**
- Incorrect criteria  
- Inactive rule  
- Wrong transaction type  

**Step Not Advancing**
- Queue script disabled  
- Step conditions unmet  
- SoD enforcement blocking step  

**Escalations Not Firing**
- Scheduled script not running  
- Thresholds misconfigured  

**Email Approvals Not Processing**
- Email queue script disabled  
- Invalid or expired HMAC tokens  

## 10. Related Documentation

- **Approval Rules Guide**  
- **Approval Steps Guide**  
- **Settings Guide**  
- **Escalation & Queue Architecture**  
- **Approval Drawer Guide**