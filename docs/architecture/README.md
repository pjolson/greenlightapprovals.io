# Greenlight Approvals - Architecture Documentation

**Version:** 1.6
**Last Updated:** 2025-11-02
**Status:** 99% Complete

---

## Welcome

This directory contains the complete architecture documentation for Greenlight Approvals, organized into logical, manageable sections for easy reference.

---

## Documentation Structure

### 📋 [01. Overview](01-overview.md)
Executive summary, system architecture diagram, current status, glossary

**What you'll find:**
- Executive Summary
- System Architecture Overview
- Transaction Flow Diagram
- Current Phase Completion Status
- Integration Points
- Glossary of Terms

**Best for:** Getting started, understanding the big picture, checking project status

---

### 🗄️ [02. Data Model](02-data-model.md)
Complete custom record definitions with all fields, relationships, and implementation notes

**What you'll find:**
- 10 Custom Record Types:
  1. Approval Rule
  2. Approval Step
  3. Approval Instance
  4. Approval Log
  5. Delegation
  6. Approval Queue
  7. Settings
  8. Transaction Type
  9. Report Settings
  10. Custom Lists
- Field definitions with data types
- Relationships and foreign keys
- Snapshot fields for change detection
- Exception detection fields
- Performance metric fields

**Best for:** Understanding data structure, creating saved searches, debugging record issues

---

### 📜 [03. Scripts Architecture](03-scripts.md)
All SuiteScript implementations organized by type

**What you'll find:**
- **User Event Scripts:**
  - UE_GNL_RuleEvaluation (Core Approval Engine)
  - UE_GNL_ApprovalRule_Audit (Change Tracking)
  - UE_GNL_ApprovalStep_Audit
  - UE_GNL_Settings_Audit
  - UE_GNL_ReportSettings_Audit
- **Client Scripts:**
  - CS_GNL_ApprovalTray (Transaction Form UI)
  - CS_GNL_ApprovalStepHelper (Progressive Disclosure)
- **Suitelets:**
  - SL_GNL_ApprovalActions (Approval API)
  - SL_GNL_EmailApproval (Public Email Handler)
- **Scheduled Scripts:**
  - SS_GNL_ApprovalQueue (Queue Processor)
  - SS_GNL_Escalation (Escalation Processor)

**Best for:** Understanding script flow, debugging script issues, implementing new features

---

### 📚 [04. Library Files](04-libraries.md)
Shared utility modules and helper functions

**What you'll find:**
- **GNL_LogHelpers.js** - Audit logging engine
- **GNL_ExceptionDetector.js** - Exception detection engine
- **GNL_EmailHelpers.js** - Email notification engine
- **GNL_RuleHelpers.js** - Rule matching engine with specificity scoring
- **GNL_FeatureHelpers.js** - NetSuite feature detection for portability

**Best for:** Reusing common functions, understanding helper utilities, debugging shared logic

---

### 🔄 [05. Workflows](05-workflows.md)
Detailed process flows for all major workflows

**What you'll find:**
1. Transaction Submission
2. Approval via Tray
3. Approval via Email (Queue-Based)
4. Rejection
5. Smart Re-Evaluation (Material Change Detection)
6. Escalation (Scheduled)

**Best for:** Understanding business processes, troubleshooting workflow issues, onboarding new developers

---

### 🔒 [06. Security Model](06-security.md)
Security architecture, permission validation, and compliance features

**What you'll find:**
- Multi-layer permission validation
- HMAC token security for email links
- Defense-in-depth architecture
- Audit trail requirements
- SOX compliance features
- Known security issues and enhancements

**Best for:** Understanding security model, implementing new security features, compliance audits

---

### 📧 [07. Email System](07-email-system.md)
Email template architecture and notification system

**What you'll find:**
- Template file structure
- Placeholder system (standard, dynamic, URL)
- Conditional sections (show/hide content)
- Transaction-specific email headers
- Transaction type map (40+ types)
- Header builder functions

**Best for:** Customizing email templates, adding new transaction types, troubleshooting email issues

---

### 🎨 [08. Forms & UX](08-forms-ux.md)
Custom form design and progressive disclosure patterns

**What you'll find:**
- Form design philosophy
- Approval Step Form (progressive disclosure)
- Approval Instance Form (6 field groups)
- Settings Form (tab-based)
- Delegation Form
- Technical implementation patterns
- Client script patterns for dynamic fields

**Best for:** Customizing forms, implementing progressive disclosure, improving UX

---

### 💻 [09. Development Standards](09-development.md)
Coding conventions and deployment process

**What you'll find:**
- File naming conventions
- Code standards (API version, error handling, logging)
- JSDoc documentation patterns
- Security best practices
- Deployment process (SDF, bundle)
- Deployment checklist

**Best for:** Onboarding new developers, code reviews, deployment planning

---

### ⚡ [10. Quick Reference](10-quick-reference.md)
Commonly used IDs and saved searches

**What you'll find:**
- Important script IDs
- Custom form IDs
- Important field IDs
- Useful saved searches (12+ examples)
- Common operations code snippets

**Best for:** Quick lookups, creating saved searches, debugging production issues

---

## How to Use This Documentation

### For New Claude Code Sessions

When starting a new Claude Code session, provide context by referencing specific sections:

```
"See docs/architecture/05-workflows.md for the email approval flow"
"Refer to docs/architecture/02-data-model.md for instance field definitions"
"Check docs/architecture/10-quick-reference.md for script IDs"
```

### For New Developers

**Recommended reading order:**
1. Start with [01-overview.md](01-overview.md) for the big picture
2. Read [02-data-model.md](02-data-model.md) to understand the data structure
3. Review [05-workflows.md](05-workflows.md) to understand business processes
4. Study [03-scripts.md](03-scripts.md) to understand implementation
5. Reference other sections as needed

### For Debugging

1. **Script errors:** Check [03-scripts.md](03-scripts.md) and [04-libraries.md](04-libraries.md)
2. **Workflow issues:** See [05-workflows.md](05-workflows.md)
3. **Data issues:** Refer to [02-data-model.md](02-data-model.md)
4. **Email problems:** Check [07-email-system.md](07-email-system.md)
5. **Security issues:** See [06-security.md](06-security.md)

### For Adding Features

1. **New approval rule criteria:** See [02-data-model.md](02-data-model.md) → Approval Rule section
2. **New transaction type:** See [07-email-system.md](07-email-system.md) → Transaction Type Map
3. **New exception type:** See [04-libraries.md](04-libraries.md) → GNL_ExceptionDetector section
4. **New email template:** See [07-email-system.md](07-email-system.md) → Template Structure

---

## Document Maintenance

### When to Update Documentation

- **After deploying major features** → Update relevant sections with new functionality
- **After architectural changes** → Update affected workflow diagrams and data model
- **After adding new scripts** → Add to [03-scripts.md](03-scripts.md)
- **After adding new fields** → Update [02-data-model.md](02-data-model.md)
- **When patterns change** → Update [09-development.md](09-development.md)

### Documentation Owners

- **Architecture decisions:** Lead Developer
- **Data model changes:** Lead Developer + DBA
- **Security model:** Security Team Lead
- **Development standards:** All developers (via PR review)

---

## Version History

- **v1.6 (2025-11-02):** Split into 10 logical sections for manageability
- **v1.5 (2025-11-01):** Added Audit Logging Phases 1-5 documentation
- **v1.4 (2025-10-31):** Added queue-based email approval architecture
- **v1.3 (2025-10-30):** Added exception detection and reporting
- **v1.2 (2025-10-15):** Added custom forms and progressive disclosure
- **v1.1 (2025-10-01):** Added email notification system
- **v1.0 (2025-09-15):** Initial architecture documentation

---

## Questions or Feedback?

For questions, clarifications, or suggestions about this documentation:
- See the main [ARCHITECTURE.md](../../ARCHITECTURE.md) redirect file
- Contact the development team
- Consult DEVELOPMENT_NOTES.md for implementation details

---

**Happy Coding! 🚀**
