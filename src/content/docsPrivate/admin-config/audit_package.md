---
title: "Audit Package Guide"
description: "How to generate, interpret, and export the Greenlight Audit Package for compliance and audit readiness."
section: "Administration"
order: 11
---

The Audit Package provides a complete, exportable record of approval activity for internal auditors, external auditors, and compliance teams.  
This guide explains how the Audit Package works, which reports are included, and how tier-based limits apply.

## 1. Overview

The Audit Package is a downloadable collection of CSV files containing:

- Approval instance history  
- Step-by-step actions  
- Approval logs and comments  
- SoD violations  
- Delegation events  
- Exception logs  
- Rule and step metadata  
- A README summary of the approval lifecycle  

The package is available in:

- **Pro** – Includes 7 core CSV reports  
- **Enterprise** – Includes unlimited CSV reports with extended metadata  

## 2. Accessing the Audit Package

Navigate to:

**Approvals → Audit Package**

### 2.1 Behavior

**Behavior**
- Only Admins or roles with appropriate permissions may generate packages.  
- Core tier does not include Audit Package access.  
- Pro and Enterprise users may generate packages at any time.  

## 3. Export Contents

The Audit Package includes a set of structured CSV reports.

### 3.1 Core CSVs (Available in All Paid Tiers)

**Fields**
- **Approval Instances** – High-level workflow records.  
- **Approval Steps** – All step records for each instance.  
- **Approval Logs** – Actions, timestamps, comments.  
- **Delegations** – Active and historical delegation events.  
- **Exceptions** – Logged warnings and errors.  
- **Instance Metadata** – Snapshot fields captured during approval.  
- **README** – Human-readable summary.

### 3.2 Enterprise Additional CSVs

Enterprise tier includes unlimited exports with deeper context:

**Fields**
- SoD Violations  
- Detailed Exception Metadata  
- Field-by-field Transaction Snapshots  
- Queue Processing Logs  
- Budget Impact Analysis  
- Performance Metrics  
- Custom Segment Breakdown  

### 3.3 File Structure

**Behavior**
- All files are packaged into a ZIP archive.  
- Each CSV is named consistently using snake_case.  
- README is included at the root.  

## 4. Audit Package Generation Flow

The system follows a clear sequence when generating a package.

### 4.1 Generation Steps

**Behavior**
1. User clicks **Generate Audit Package**.  
2. Greenlight aggregates all instance data based on date range.  
3. SuiteQL queries load related logs, steps, and metadata.  
4. CSV files are generated and written to the file cabinet.  
5. Files are zipped and presented for download.  

### 4.2 Date Range Filtering

**Behavior**
- Admins may limit exports to a specific period.  
- Enterprise may export large datasets with optimized batching.  

## 5. README Report

A human-readable report summarizing workflow details is included.

### 5.1 README Fields

**Fields**
- Transaction details  
- Rule name  
- Step sequence  
- Approvers  
- Comments  
- Exceptions  
- SoD results  
- Delegation context  
- Final outcome  

**Behavior**
- README is dynamically generated per export.  
- Only appears once in the package.  

## 6. Compliance Use Cases

Audit Packages support multiple compliance frameworks.

### 6.1 SOX Compliance

**Behavior**
- Provides evidence of approval controls.  
- Shows immutable step logs and timestamps.  
- SoD violations clearly documented.

### 6.2 Internal Audit

**Behavior**
- Tracks deviations, overrides, and exceptions.  
- Includes commentary and reviewer notes.  

### 6.3 External Audit

**Behavior**
- Allows sampling of approvals.  
- Shows evidence of control design and operating effectiveness.  

## 7. Troubleshooting Audit Packages

### Common Issues

**Package Not Generating**
- Insufficient permissions  
- Large date range with governance timeout  

**Missing CSV Files**
- User selected a limited dataset  
- Tier restrictions applied (Pro vs Enterprise)  

**Incorrect Data in CSV**
- Transaction edited mid-approval  
- Instance snapshots reflect values at approval time  

## 8. Related Documentation

- **Exception Detection Guide**  
- **Delegations Guide**  
- **Approval Steps Guide**  
- **Segregation of Duties (SoD) Guide**  
- **Command Center Overview**
---
title: "Audit Package Guide"
description: "How to generate export-ready audit packages and configure the audit log catalog."
section: "Administration"
order: 4
---

Audit Package content coming soon.
