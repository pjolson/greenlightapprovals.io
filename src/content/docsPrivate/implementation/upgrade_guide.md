---
title: "Upgrade Guide (Bundle → SuiteApp)"
description: "How to upgrade Greenlight Approvals from the beta bundle distribution to the official SuiteApp release."
section: "Implementation"
order: 40
---

This guide explains how to upgrade from the **bundle-based beta installation** of Greenlight Approvals to the **official SuiteApp release** once it becomes available in the NetSuite Marketplace.

The process is designed to be safe, non-destructive, and compatible with existing approval data.

## 1. Overview

When Greenlight is published as a SuiteApp, existing customers using the beta bundle will be able to upgrade without:

- losing rules or steps  
- losing approval history or logs  
- modifying custom forms  
- disrupting approval workflows  
- reinstalling configuration data  

All configuration records remain intact throughout the upgrade.

## 2. Upgrade Requirements

Before upgrading, ensure:

**Requirements**
- Current beta bundle is installed and functioning
- All Greenlight scripts are deployed and active
- You have Administrator or equivalent permissions
- No pending bundle update operations are in progress

**Recommended Preparation**
- Perform a quick smoke test to confirm system stability
- Export or snapshot rules for internal reference
- Notify approvers if performing upgrade during business hours

## 3. Upgrade Paths

There are two supported upgrade paths depending on customer preference and timing.

### 3.1 Standard Path: SuiteApp Installation Over Existing Bundle

This is the recommended and simplest method.

**Steps**
1. Access **Customization → SuiteApps → Search & Install**.
2. Locate **Greenlight Approvals** in the Marketplace.
3. Click **Install**.
4. NetSuite detects existing bundle artifacts.
5. SuiteApp files override bundle files where compatible.
6. Scripts, records, and forms remain intact.
7. Verify menus and deployments.

**Behavior**
- Existing Setup, Report Settings, rules, and logs remain unchanged.
- New SuiteApp-managed files supersede bundle files where applicable.

### 3.2 Clean Replacement Path (Optional)

Use only if NetSuite Support recommends it or if artifacts were modified manually.

**Steps**
1. Uninstall the beta bundle (does not remove custom records).  
2. Install the SuiteApp normally from the Marketplace.  
3. Validate scripts and menus.

**Behavior**
- All user data persists.  
- Scripts and UI files are replaced with SuiteApp versions.

> **Note:** The clean replacement path is rarely necessary.

## 4. Post-Upgrade Verification

After installation, verify that the SuiteApp is functioning correctly.

### 4.1 Menu Verification

**Checklist**
- Approvals → Settings  
- Approvals → Delegations  
- Approvals → Rules  
- Approvals → Audit Package  
- Approvals → Command Center  

### 4.2 Script Deployment Verification

Ensure all scripts appear under **Script Deployments**.

### 4.3 Approval Drawer Verification

Open a supported transaction and confirm:
- Drawer loads correctly  
- Budget block appears (Pro & Enterprise)  
- AI Insights appear as expected  
- Timeline, comments, and decision context function normally  

### 4.4 Workflow Verification

Submit a test transaction and verify:
- Rule matches  
- Approval instance creates  
- Approval flow operates normally  
- Emails send correctly  
- Escalation engine continues running  

## 5. Troubleshooting Upgrade Issues

### SuiteApp Not Detected
- Clear browser cache  
- Log out and back in  
- Verify role permissions  
- Ensure bundle uninstall (if clean path) fully completed  

### Drawer Missing After Upgrade
- Recheck client script deployment  
- Confirm custom forms still include required script IDs  

### Duplicate Scripts or Deployments
- Compare IDs between bundle and SuiteApp  
- Remove leftover bundle scripts if needed  

### Missing Budget or AI Blocks
- Confirm license tier  
- Verify Settings configuration persisted  

## 6. FAQs

### Does upgrading affect existing approval history?
No. All approval instances, logs, and audit data remain intact.

### Will custom rules or steps be overwritten?
No. All user-created configuration records are preserved.

### Do we need to reconfigure the Approval Drawer?
No. Drawer configuration is stored in the Settings record.

### Can we downgrade back to the bundle?
Not recommended; SuiteApp upgrades provide security and update benefits.

## 7. Related Documentation

- **Installation Guide**  
- **Post-Install Checklist**  
- **Settings Guide**  
- **Audit Package Guide**  
- **Approval Drawer Guide**
