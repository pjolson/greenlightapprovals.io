---
title: "Approval Rules Guide"
description: "How to create, configure, and manage approval rules in Greenlight Approvals."
section: "Administration"
order: 30
---

Approval Rules determine which transactions require approval and which approvers are assigned.  
This guide explains every rule configuration option and outlines how rules interact with steps, specificity, and transaction criteria.

## 1. Overview

Approval Rules define the conditions under which an approval workflow is triggered for supported transactions.  
A rule becomes active when a submitted transaction matches its criteria.

Rules contain:
- High-level transaction filters  
- Subsidiary, department, class filters  
- Amount and currency thresholds  
- Custom segment filters  
- One or more approval steps  

## 2. Creating a New Rule

To create a rule:

1. Navigate to **Approvals → Rules → New**.  
2. Enter basic header information (Name, Description).  
3. Configure transaction criteria.  
4. Add one or more approval steps.  
5. Save the rule.

Rules become active immediately after saving.

## 3. Rule Header Fields

### 3.1 Basic Information

**Fields**
- **Name** – Required name for internal and reporting use.  
- **Description** – Optional descriptive text.  
- **Active** – Enables or disables rule evaluation.  
- **Effective From / To** – Optional date control for seasonal or temporary rules.

**Behavior**
- Rules not marked **Active** are ignored during matching.  
- When two rules overlap, Greenlight uses specificity scoring to pick the best match.

## 4. Transaction Criteria

These fields determine which transactions a rule applies to.

### 4.1 Standard Filters

**Fields**
- **Subsidiary**  
- **Department**  
- **Class**  
- **Location**  
- **Transaction Type**  
- **Currency**  

**Behavior**
- If a field is left blank, it acts as a wildcard (“match any”).  
- If a field contains multiple values, all are considered valid matches.

### 4.2 Amount Thresholds

**Fields**
- **Minimum Amount**  
- **Maximum Amount**

**Behavior**
- Rules match transactions whose total amount falls within the defined range.  
- If both min/max are blank, any amount is allowed.

### 4.3 Custom Segment Filters

Greenlight supports up to 10 custom segments.

**Fields**
- Segment 1–10 (configured in Settings)

**Behavior**
- If a segment is populated on the transaction and matches the rule’s value, specificity increases.  
- Segments left blank behave as wildcards.

## 5. Specificity Scoring

Specificity determines which rule is selected when multiple rules match.

### 5.1 How Specificity Works

**Behavior**
- Each matching field adds weight to the rule’s specificity score.  
- Rules with more exact matches outrank broader rules.  
- Amount ranges add additional scoring weight.  
- Custom segments contribute meaningfully to specificity.

### 5.2 Tie Resolution

If two rules receive identical specificity scores:
- Greenlight selects the rule with the **narrowest amount range**, or  
- If still tied, the rule with the **most steps**.

## 6. Conditional Logic

Rules may include additional conditions using AND/OR style operators.

### 6.1 Supported Operators

**Fields**
- Equals  
- Not Equals  
- Contains  
- Does Not Contain  
- Greater Than / Less Than  
- Between  
- Is Empty / Is Not Empty  

### 6.2 Behavior

**Behavior**
- Conditional logic is evaluated during rule matching.  
- Conditions apply before specificity scoring.  
- Operators allow fine-grained control (e.g., only match POs over $10k for a specific vendor).

## 7. Steps Overview

Each rule must contain one or more approval steps.

### 7.1 Relationship Between Rules and Steps

**Behavior**
- Steps execute in sequence.  
- Each step evaluates its own conditions before assigning an approver.  
- Steps inherit rule-level conditions unless overridden.

### 7.2 Where Steps Are Defined

Steps are created on the **Steps** subtab within the rule.

## 8. Effective Dating

Rules can be time-bound using date fields.

### 8.1 Effective Period Controls

**Fields**
- **Effective From**  
- **Effective To**

**Behavior**
- Rule is only evaluated within the date window.  
- Useful for year-end processes, seasonal workflows, or temporary policy changes.

## 9. Rule Evaluation Lifecycle

### 9.1 When Rules Are Evaluated

**Behavior**
- On transaction create/edit  
- On submit  
- On resubmission after rejection  
- When relevant transaction fields change (amount, subsidiary, etc.)

### 9.2 When Rule Matching Is Skipped

**Behavior**
- If transaction is already approved  
- If rule is inactive  
- If no rule meets criteria  

## 10. Troubleshooting Rule Matching

### Common Issues

**Rule Not Triggering**
- Does not match subsidiary/department/class  
- Amount outside thresholds  
- Incorrect custom segment configuration  
- Effective dates not aligned  
- Rule marked inactive  

**Wrong Rule Triggering**
- Specificity scoring favored another rule  
- Conditions may be too broad  
- Another rule has tighter amount ranges  

**Step Not Assigning**
- Step-level condition not met  
- Approver field empty or inaccessible  
- SoD enforcement blocking assignment (Enterprise)

## 11. Related Documentation

- [Approval Steps Guide](/client/docs/admin-config/approval_steps)  
- [Settings Guide](/client/docs/implementation/settings_guide)  
- [Exception Detection Guide](/client/docs/admin-config/exception_detection)  
- [Approval Drawer Guide](/client/docs/end-user/approval_drawer)
