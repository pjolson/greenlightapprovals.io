---
title: "Rule Matching Troubleshooting"
description: "Troubleshooting guide for issues related to rule evaluation, specificity scoring, conditional logic, and incorrect rule selection."
section: "Troubleshooting"
order: 70
---

This guide addresses problems where Greenlight does not select the expected approval rule, evaluates the wrong rule, or applies no rule at all.  
Use this when approval flows fail to trigger or trigger incorrectly.

## 1. Rule Not Triggering

### 1.1 No Rule Selected

**Possible Causes**
- All rule filters too restrictive  
- Transaction fields missing (subsidiary, class, department)  
- Effective dates outside active range  
- Rule inactive  

**Resolution**
- Reduce matching criteria and retest  
- Verify transaction classification fields  
- Confirm rule active status and dates  

### 1.2 Wrong Transaction Type

**Possible Causes**
- Rule configured for PO but record is a Vendor Bill  
- Mixed transaction types in testing  
- Custom form masking true record type  

**Resolution**
- Validate Transaction Type field in rule  
- Ensure correct record form used  

---

## 2. Wrong Rule Triggering

### 2.1 Specificity Scoring Selecting Another Rule

**Possible Causes**
- Competing rule has more specific field matches  
- Custom segment hits increasing score  
- Tighter amount range on competing rule  

**Resolution**
- Review specificity contributors in Settings  
- Narrow filters on desired rule  
- Widen filters on competing rule  

### 2.2 Similar Rules Overlapping

**Possible Causes**
- Two rules identical except for minor difference  
- Rules competing for the same classification set  
- Legacy rules left active  

**Resolution**
- Deactivate or merge overlapping rules  
- Review multi-rule test matrix in Settings  

---

## 3. Step Not Assigning Due to Rule-Level Mismatch

### 3.1 Step Present but Not Triggering

**Possible Causes**
- Step-level conditional logic not met  
- Step-level SoD enforcement blocking assignment  
- Dynamic approver field empty  

**Resolution**
- Review step-level filters  
- Validate field mappings  
- Check SoD override settings  

### 3.2 Step Skipping Unexpectedly

**Possible Causes**
- Conditional operator triggered skip  
- Amount or classifications changed after submission  
- Re-evaluation disabled  

**Resolution**
- Confirm conditional logic  
- Review rule re-evaluation settings  

---

## 4. Advanced Rule Matching Issues

### 4.1 Custom Segment Mismatches

**Possible Causes**
- Segment values not populated  
- Rule expects segment value not present  

**Resolution**
- Populate required custom segments  
- Adjust rule filters accordingly  

### 4.2 Amount Range Conflicts

**Possible Causes**
- Overlapping min/max thresholds  
- Negative or incorrectly scaled amounts  

**Resolution**
- Normalize amount ranges  
- Ensure no conflicting overlapping thresholds  

### 4.3 Multi-Currency Rules

**Possible Causes**
- Currency mismatch between rule and transaction  
- Missing exchange rate context  

**Resolution**
- Set rule currency to match transaction currency  
- Adjust thresholds if necessary  

---

## 5. Identifying Specificity Scoring Problems

### 5.1 Unexpected Rule Selected

**Possible Causes**
- Competing rule has more detailed classification filters  
- Custom segments contributing unexpectedly  
- Amount range scoring heavier than expected  

**Resolution**
- Review specificity scoring settings  
- Compare rule scores using internal debug logging (admin)  

### 5.2 Rule Selects Randomly (Rare)

**Possible Causes**
- Two rules perfectly tied  
- Tie-breaker conditions equal  

**Resolution**
- Add additional filters to break tie  
- Adjust amount ranges or step counts  

---

## 6. Debugging Tools & Techniques

### 6.1 Drawer Exceptions

**Behavior**
- Show rule selection warnings  
- Display mismatches and missing fields  

### 6.2 Approval Logs

**Behavior**
- Include rule ID selected  
- Provide clues about skipped steps  

### 6.3 Internal Debug Mode (Admin)

**Behavior**
- Used to reveal scoring breakdown (if configured internally)  
- Helps identify misaligned rule filters  

---

## 7. Troubleshooting Checklist

**Checklist**
- Confirm rule active  
- Validate transaction classifications  
- Reduce rule complexity and retest  
- Review specificity scoring  
- Check custom segments  
- Confirm currency alignment  
- Review step conditions  

---

## 8. Related Documentation

- **Approval Rules Guide**  
- **Approval Steps Guide**  
- **Workflow Behavior & Lifecycle**  
- **Troubleshooting Guide (Master)**  
