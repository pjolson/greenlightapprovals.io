---
title: "Approval Steps Guide"
description: "How to configure and manage approval steps within Greenlight Approval Rules."
section: "Administration"
order: 40
---

Approval Steps define **who approves**, **when they approve**, and **under what conditions** during an approval workflow.  
This guide explains each configuration option for steps and how Greenlight evaluates them.

## 1. Overview

Each Approval Rule contains one or more approval steps.  
Steps determine:

- The assigned approver  
- Escalation behavior  
- Conditional logic  
- SoD (Segregation of Duties) interactions  
- Step-level timing  
- When the next step should execute  

Steps are always executed **in sequence**, and each step must complete before the next begins.

## 2. Creating a Step

To create a new step within a rule:

1. Navigate to **Approvals → Rules**.  
2. Open the desired rule.  
3. Go to the **Steps** subtab.  
4. Click **New Step**.  
5. Configure all step fields and conditions.  
6. Save.

Steps are immediately active once saved and the parent rule is active.

## 3. Step Approver Configuration

### 3.1 Approver Type

**Fields**
- **Employee**  
- **Role**  
- **Group**  
- **Vendor / Partner**  
- **Dynamic (Field-Based)**  
- **Supervisor Chain**  
- **Project Manager**

**Behavior**
- Greenlight resolves approvers at runtime.  
- Dynamic assignment allows selecting values from transaction fields (e.g., “Created By”, “Project Manager”).  
- Supervisor-based steps evaluate based on NetSuite hierarchy.

### 3.2 Fallback Approver

**Fields**
- **Fallback Approver** – User or role if the primary approver cannot be resolved.

**Behavior**
- Triggered when dynamic/supervisor fields are empty or invalid.

## 4. Step Conditions

Step-level conditions provide additional control beyond rule-level criteria.

### 4.1 Supported Condition Fields

**Fields**
- Any body-level transaction field  
- Custom fields  
- Custom segments  
- Entity fields (Customer, Vendor, Employee)  
- Department / Class / Location

### 4.2 Supported Operators

**Fields**
- Equals  
- Not Equals  
- Contains  
- Greater Than / Less Than  
- Between  
- Is Empty / Is Not Empty  

### 4.3 Behavior

**Behavior**
- Step conditions are evaluated at runtime.  
- If a step’s conditions **fail**, the step is **skipped**, and the next step is evaluated.  
- If all steps are skipped, the transaction may auto-approve depending on configuration.

## 5. Step Timing & Escalation

Steps support escalation to ensure timely approvals.

### 5.1 Escalation Settings

**Fields**
- **Escalate After (Days/Hours)**  
- **Escalation Target** (Employee/Role/Group)  
- **Escalation Message**  

### 5.2 Behavior

**Behavior**
- Escalation Engine runs on a schedule and checks overdue steps.  
- Escalated steps assign to the escalation target but preserve step history.  
- Escalated steps count toward SLA metrics.

## 6. Segregation of Duties (SoD)

Enterprise tier users can enforce SoD at the step level.

### 6.1 SoD Step Controls

**Fields**
- **Allow Self-Approval**  
- **Allow Duplicate Approval**  
- **On Violation** (Warn / Enforce / Skip)

### 6.2 Behavior

**Behavior**
- Pro: Warn-only, cannot enforce.  
- Enterprise: Can block step assignment or auto-skip based on policy.  
- Violations appear in the Approval Drawer and logs.

## 7. Step Notes & Comments

Approvers may leave comments at each step.

### 7.1 Behavior

**Behavior**
- Comments are saved as part of the Approval Instance.  
- Visible in the Approval Drawer timeline.  
- Included in the Audit Package export.

## 8. Step Execution Lifecycle

### 8.1 When a Step Executes

**Behavior**
- On transaction submission  
- After previous step completes  
- After rule reevaluation (if enabled)  
- During escalation  

### 8.2 Completion Behavior

**Behavior**
- When an approval occurs, the step is marked complete.  
- Rejection halts the workflow unless the rule allows resubmission.  
- Workflow proceeds to the next step unless skipped.

## 9. Troubleshooting Step Issues

### Common Issues

**Step Not Triggering**
- Step conditions not met  
- Approver cannot be resolved  
- SoD enforcement blocking assignment  
- Step appears after a skipped rule condition  

**Escalation Not Working**
- Escalation Engine not scheduled  
- Escalation thresholds misconfigured  

**Wrong Approver Assigned**
- Dynamic field value unexpected or missing  
- Supervisor chain incomplete

## 10. Related Documentation

- **Approval Rules Guide**  
- **Settings Guide**  
- **Segregation of Duties (SoD) Guide**  
- **Approval Drawer Guide**