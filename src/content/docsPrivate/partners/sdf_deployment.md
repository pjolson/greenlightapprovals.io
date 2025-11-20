---
title: "SDF Deployment Guide"
description: "Guide for deploying Greenlight Approvals using SuiteCloud Development Framework (SDF), including project structure, validation, and promotion steps."
section: "Partners"
order: 40
---

This guide provides instructions for partners and developers deploying Greenlight Approvals using the SuiteCloud Development Framework (SDF).  
It includes recommended project structure, deployment workflows, validation commands, and best practices for managing Greenlight configurations across environments.

## 1. Overview

SDF deployment is recommended for:

- Partner-managed implementations  
- Multi-account rollouts  
- CI/CD-enabled NetSuite teams  
- Large enterprise customers with strict change control  
- Environments requiring versioned configuration  

Greenlight supports SDF-based deployment **for configuration records only**, not core script files (which are bundle/SuiteApp distributed).

---

## 2. Supported SDF Deployment Artifacts

### 2.1 Deployable with SDF

**Supported**
- Approval Rules  
- Approval Steps  
- Settings  
- Report Settings  
- Delegation records  
- Saved searches used by Greenlight dashboards  
- Custom forms or fields related to customer-specific extensions  

### 2.2 Not Deployable with SDF

**Not Supported**
- Core Greenlight SuiteScripts  
- Queue processor scripts  
- Drawer Suitelets  
- Engine logic (rule engine, workflow engine, SoD engine)  

These components must be installed via the Greenlight bundle/SuiteApp.

---

## 3. SDF Project Setup

### 3.1 Creating a New SDF Project

**Command**
```
sdf createproject -p greenlight-config
```

### 3.2 Recommended Project Structure

```
/greenlight-config
  /Objects
    customrecord_gl_rule_*
    customrecord_gl_step_*
    customrecord_gl_settings
    customrecord_gl_report_settings
    customrecord_gl_delegation_*
  /FileCabinet
    /SuiteScripts (custom partner scripts only)
  manifest.xml
  deploy.xml
```

### 3.3 Include Only Customer-Specific Configuration

**Behavior**
- Do not include core Greenlight files  
- Do not overwrite bundle-managed files  
- Include only configuration objects and extension artifacts  

---

## 4. Extracting Greenlight Configuration from Sandbox

### 4.1 Listing Custom Objects

```
sdf object:list
```

### 4.2 Importing Objects

```
sdf project:importobjects -p greenlight-config -o customrecord_gl_rule_123,customrecord_gl_step_456
```

### 4.3 Importing All Rule/Step Objects

```
sdf project:importobjects -p greenlight-config -m OBJECT
```

**Note**  
Always confirm imported objects do not include Greenlight’s core managed scripts.

---

## 5. Validating the SDF Project

### 5.1 SDF Validation

```
sdf project:validate -p greenlight-config
```

### 5.2 Common Validation Issues

**Issues**
- Missing references to custom segments  
- Permissions not assigned in target account  
- Invalid XML structure after manual edits  

**Resolution**
- Re-import objects  
- Re-sync custom segment definitions  
- Validate XML schemas  

---

## 6. Deploying to a Target Account

### 6.1 Standard Deployment

```
sdf project:deploy -p greenlight-config
```

### 6.2 Deployment with Preview

```
sdf project:deploy -p greenlight-config --dryrun
```

### 6.3 Required Pre-Deployment Checks

**Checklist**
- Confirm Greenlight bundle installed in target  
- Confirm scripts deployed and running  
- Ensure rule/step IDs do not conflict  
- Validate delegation assignments match target account  

---

## 7. Managing Environment Differences

### 7.1 Sandbox → Production Alignment

**Best Practices**
- Keep rule/step naming consistent  
- Standardize approver roles  
- Avoid Sandbox-specific IDs  
- Use dynamic approvers when possible  

### 7.2 Handling Custom Segments

**Behavior**
- If custom segment IDs differ across environments, update manifest references  
- Validate segment availability before deploying  

### 7.3 Handling Saved Searches

**Recommendations**
- Include partner-created saved searches in SDF  
- Do not modify Greenlight-managed saved searches  

---

## 8. CI/CD Pipeline Integration

### 8.1 Automated Validation

**Behavior**
- Run `project:validate` in CI before merging changes  

### 8.2 Automated Deployment

**Behavior**
- Trigger deployment only after QA approve  
- Use separate credentials for Prod vs Sandbox  

### 8.3 GitOps Workflow

**Recommendations**
- Store SDF project in Git  
- Use tags for versions  
- Include a README detailing environment-specific notes  

---

## 9. Troubleshooting SDF Deployments

### 9.1 Object Deployment Failures

**Possible Causes**
- Missing dependent records  
- Incompatible field IDs  
- Deprecated fields  

**Resolution**
- Import related objects  
- Review XML structure for mismatches  

### 9.2 Rules Not Working After Deployment

**Possible Causes**
- Approver roles missing in target  
- Rule/step IDs changed  
- Settings not deployed  

**Resolution**
- Re-import roles  
- Adjust mapping for target environment  
- Deploy Settings & Report Settings  

---

## 10. Related Documentation

- **Implementation Partner Guide**  
- **Customization Guidelines**  
- **Integration Guide**  
- **Workflow Behavior & Lifecycle**