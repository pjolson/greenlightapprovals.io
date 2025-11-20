---
title: "Uninstallation Guide"
description: "How to safely uninstall the Greenlight Approvals bundle or SuiteApp from your NetSuite account."
section: "Implementation"
order: 50
---

This guide explains how to safely uninstall Greenlight Approvals from your NetSuite environment.  
Uninstallation removes scripts and UI components but **does not delete approval history, logs, or rule configuration records** unless you choose to remove them manually.

## 1. Overview

Uninstalling Greenlight Approvals depends on whether the application was installed as:

- A **beta bundle**, or  
- An **official SuiteApp**  

Both uninstallation paths are covered below.

## 2. Before You Begin

Before uninstalling, confirm:

**Preparation Checklist**
- No approvals are currently in progress
- No critical finance operations rely on Greenlight
- You have Administrator-level access
- You have exported or documented any rules or configuration you want to preserve

**Important Notes**
- Greenlight does **not** delete your configuration or historical data on uninstall
- Uninstalling the SuiteApp will remove managed objects (scripts, forms, files)

## 3. Uninstalling the Beta Bundle

If you are using the pre-release bundle version:

### 3.1 Steps

**Steps**
1. Navigate to **Customization → SuiteBundler → Search & Install Bundles**.
2. Click the **Installed Bundles** tab.
3. Locate **Greenlight Approvals**.
4. Click **Uninstall**.
5. Confirm the uninstallation.

### 3.2 Behavior

- Custom records (Rules, Steps, Instances, Logs) remain intact.
- Scripts, forms, and files deployed by the bundle are removed.
- Menu entries disappear after uninstalling.

## 4. Uninstalling the SuiteApp (Marketplace Version)

SuiteApps cannot be “uninstalled” the same way bundles can.  
Instead, they are **disabled** or **restricted** depending on the account type.

### 4.1 Steps

**Steps**
1. Navigate to **Customization → SuiteApps → Installed SuiteApps**.
2. Locate **Greenlight Approvals**.
3. Click **Manage**.
4. Disable or deactivate the SuiteApp (options vary by account type).

### 4.2 Behavior

- Managed SuiteApp components will be disabled.
- Custom records remain available unless manually deleted.
- Menu navigation will be hidden.

> **Note:** SuiteApp removal options may vary depending on your NetSuite contract and account type.

## 5. Removing Configuration Records (Optional)

If you want to fully purge all Greenlight configuration, you must delete records manually.

### 5.1 Records You May Remove

**Records**
- Approval Rule  
- Approval Step  
- Approval Instance  
- Approval Log  
- Delegation  
- Settings  
- Report Settings  
- Audit Export Item  
- Approval Queue  
- Email Approval Queue  

**Warnings**
- Approval Instance and Log records may be needed for audit purposes.
- Deleting Settings/Report Settings will reset all configuration.

## 6. Post-Uninstall Verification

### 6.1 Check Menu Navigation

Verify that **Approvals →** items no longer appear.

### 6.2 Check Script Deployments

Confirm that scripts under **Customization → Scripting → Script Deployments** are removed or disabled.

### 6.3 Check Transaction Forms

Open a supported transaction (PO, VB, ER) and confirm:

- The Greenlight Approval Drawer no longer appears
- No script errors occur
- No contextual UI elements remain

## 7. Troubleshooting Uninstallation

### Common Issues

**Greenlight Still Appears in the Menu**
- Clear browser cache  
- Log out and back in  
- Check if user role is cached with navigation shortcuts  

**Scripts Not Fully Removed**
- Some scripts may remain if SuiteApp-managed  
- Contact NetSuite Support if SuiteApp components cannot be disabled  

**Drawer Still Partially Loads**
- Transaction form may have a custom script still attached  
- Remove script IDs from custom forms if necessary  

## 8. Related Documentation

- **Installation Guide**  
- **Upgrade Guide**  
- **Settings Guide**  
- **Troubleshooting Guide**