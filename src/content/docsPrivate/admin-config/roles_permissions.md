---
title: "User Roles & Permissions Guide"
description: "Permissions required for administrators, approvers, and managers using Greenlight Approvals."
section: "Administration"
order: 140
---

Greenlight Approvals uses standard NetSuite permissions combined with custom record permissions to control access.  
This guide outlines required permissions for each role type and explains how to configure access for administrators, approvers, reviewers, and managers.

## 1. Overview

Greenlight does not require custom roles to function, but most organizations choose to assign:
- An **Administrator / Configuration Role**
- One or more **Approver Roles**
- Optional **Manager / Reviewer Roles**

Permissions determine:
- Who can manage rules and settings  
- Who can approve via the Approval Drawer  
- Who can view Command Center dashboards  
- Who can run Audit Packages (Pro & Enterprise)  

## 2. Required Permissions by Role Type

### 2.1 Administrator / Configuration Role

**Required Permissions**
- **Custom Records**  
  - Full: Approval Rule  
  - Full: Approval Step  
  - Full: Approval Instance  
  - Full: Approval Log  
  - Full: Settings  
  - Full: Report Settings  
  - Full: Delegation  
  - Full: Audit Export Item  

- **Setup**  
  - Full: Customization  
  - Full: Script Deployment  
  - Full: SuiteBundler  
  - Full: SuiteAnalytics Workbook  

- **Lists & Records**  
  - Full: Employees  
  - Full: Vendors  
  - Full: Accounts  
  - Full: Departments, Classes, Locations  

**Behavior**
- Admins can manage all configuration.  
- Admins see all Command Center dashboards.  
- Admins can generate Audit Packages.

### 2.2 Approver Role

**Required Permissions**
- **Transactions**  
  - View or Edit for supported transaction types  
- **Custom Records**  
  - View: Approval Instance  
  - View: Approval Log  

- **Suitelet Access**  
  - Access to Approval Drawer Suitelet  
  - Access to Email Approval Suitelet  

**Behavior**
- Approvers can approve or reject via the Drawer or email.  
- Approvers see only approvals assigned to them.

### 2.3 Manager / Reviewer Role

**Required Permissions**
- All Approver permissions, plus:  
  - View: Approval Rule  
  - View: Approval Step  
  - View: Delegation  
  - View: Command Center dashboards  

**Behavior**
- Managers may review approval trends.  
- Cannot modify rules unless granted admin access.

### 2.4 Audit / Compliance Role (Enterprise)

**Required Permissions**
- View: Approval Instances  
- View: Approval Logs  
- Run: Audit Package  
- Access: Command Center (exceptions, SoD, high-value dashboards)

**Behavior**
- Designed for internal audit, external audit, and compliance teams.

## 3. Permission Details

### 3.1 NetSuite Permissions Needed for Drawer Access

**Fields**
- View access to transaction  
- Access to Suitelet endpoints  
- Access to custom records  

**Behavior**
- The Drawer will not appear if a user lacks permission to view the transaction.

### 3.2 Required Permissions for Email Approval

**Fields**
- Valid login permissions (optional for email approval)  
- Employee record with correct email  
- Suitelet access  

**Behavior**
- Email approval works even if the user is not logged into NetSuite.  
- Access is validated via HMAC token.

## 4. Creating a Custom Greenlight Role (Recommended)

### 4.1 Steps

**Steps**
1. Navigate to **Setup → Users/Roles → Manage Roles → New**.  
2. Copy an existing role (e.g., Employee Center or Accountant).  
3. Add required Transactions, Lists, Setup, and Custom Record permissions.  
4. Save and assign to users.

### 4.2 Recommended Custom Permissions

**Fields**
- Custom Record: Approval Rule (View/Edit for managers)  
- Custom Record: Approval Instance (View)  
- Access to Command Center searches  
- Access to Approval Drawer Suitelet  

## 5. Troubleshooting Permissions Issues

### Common Issues

**Drawer Not Appearing**
- Role missing Suitelet or custom record access  
- Transaction record permission too restrictive  

**Approver Cannot Approve**
- Approver does not have access to the transaction  
- SoD enforcement blocking user  
- Delegation inactive or expired  

**Manager Cannot See Dashboards**
- Role missing saved search or workbook permissions  
- Tier-based dashboard unavailable  

**Audit Package Not Accessible**
- Only available in Pro & Enterprise  
- Role missing “Run” permission for Audit Package Suitelet  

## 6. Related Documentation

- **Approval Steps Guide**  
- **Approval Rules Guide**  
- **Delegations Guide**  
- **Approval Drawer Guide**  
- **Audit Package Guide**