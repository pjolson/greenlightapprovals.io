---
title: "Installation Guide"
description: "How to install and verify the Greenlight Approvals SuiteApp in NetSuite."
section: "Implementation"
order: 1
---

**Version:** 1.1  
**Last Updated:** 2025-11-20  
**Author:** Greenlight Product & Engineering

## 1. Overview
Greenlight Approvals is a NetSuite-native approval automation platform providing:
- Multi-step routing
- Rule-based workflows
- The Greenlight Approval Drawer
- Budget intelligence (Pro & Enterprise)
- Segregation of Duties (SoD) detection & enforcement (Pro/Enterprise)
- Exception detection
- Email click-to-approve
- Immutable audit logging
- Executive dashboards and audit packages

This guide explains how to install and configure Greenlight Approvals.

## 2. Prerequisites

### 2.1 Required NetSuite Features
Enable the following:
- SuiteScript 2.1
- Custom Records
- Client SuiteScript
- Server SuiteScript
- SuiteAnalytics Workbook
- Token-Based Authentication (optional)

### 2.2 Required Permissions
Installation must be performed by:
- Administrator, OR
- Custom role with required permissions (Customization, SuiteBundler, Lists/Records, Setup, Workbook)

## 3. License Tiers & Feature Availability
| Feature Category | Core | Pro | Enterprise |
|------------------|------|------|------------|
| Multi-step Approvals | ✔ | ✔ | ✔ |
| Email Approval | ✔ | ✔ | ✔ |
| Approval Drawer | ✔ | ✔ | ✔ |
| AI Insights | ✖ | ✔ Limited | ✔ Full |
| Budget Intelligence | ✖ | ✔ | ✔ |
| SoD Detection | ✖ | ✔ Warn | ✔ Full Enforcement |
| SoD Enforcement | ✖ | ✖ | ✔ |
| Audit Package | ✖ | 7 CSVs | Unlimited |
| Command Center Dashboards | Basic | Enhanced | Full |
| Custom Integrations | ✖ | ✖ | ✔ |
| Support SLA | 24 hr | 12 hr | 4 hr |

## 4. Installing Greenlight Approvals

### 4.1 Install via Bundle (Beta Distribution)
1. Go to Customization → SuiteBundler → Search & Install Bundles
2. Enter bundle ID: [TBD]
3. Install with all components selected

## 5. Post-Installation Verification
Verify:
- Custom records
- Script deployments
- Menu navigation

## 6. Initial Configuration
Configure Settings and Report Settings.

## 7. Setting Up Approval Workflows
Create rules and steps with conditional logic and SoD (Pro/Enterprise).

## 8. Testing the Installation
Submit a test transaction, verify Approval Drawer, approve, generate audit package.

## 9. User Access Configuration
Approvers and Admins get appropriate access automatically.

## 10. Troubleshooting
Common issues: Drawer not showing, budget missing, SoD not triggering, email issues.

## 11. Support
support@greenlightapprovals.com
