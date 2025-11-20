---
title: "Settings Guide"
description: "Detailed reference for all configuration options available in the Greenlight Settings record."
section: "Administration"
order: 1
---

The **Settings** record controls global behavior for Greenlight Approvals. This guide explains all configuration options,
field purposes, and tier‑specific behavior.

> **Navigation:**  
> **Approvals → Settings**

---

## 1. Overview

The Settings record defines:

- Email and notification configuration  
- Display options for the Approval Drawer  
- Budget intelligence (Pro & Enterprise)  
- AI Insights behavior (Pro & Enterprise)  
- Segregation of Duties settings (Pro & Enterprise)  
- Custom segments used in rule matching  
- Line‑item configuration for emails and the Approval Drawer  

Each section below corresponds to a tab or field group on the Settings form.

---

## 2. Email Configuration

Controls all notification templates and messaging behavior.

### 2.1 Email Templates

Select the templates Greenlight should use for:

- Assignment notifications  
- Approval confirmations  
- Rejection notifications  
- Escalation notifications  

Templates can be customized using NetSuite’s email template editor.

**Available in all tiers.**

**Fields**
- **Assignment Template**  
- **Approval Template**  
- **Rejection Template**  
- **Escalation Template**

---

### 2.2 Email Content Options

Controls optional blocks within transactional emails.

**Fields**
- **Show Transaction Header**  
- **Show Line Items**  
- **Show Decision Context**  
- **Enable Email Actions** (approve/reject buttons)

> **Tier Notes:**  
> - Core: All display blocks available except Decision Context.  
> - Pro: Full display support.  
> - Enterprise: Full display + richer contextual data.

---

## 3. Approval Drawer Configuration

Controls what appears inside the Greenlight Approval Drawer.

### 3.1 Drawer Content

**Fields**
- **Show Transaction Header**  
- **Show Line Items**  
- **Show Decision Context**  
- **Show Timeline Tab**  
- **Show Budget Block** *(Pro/Enterprise)*  
- **Enable AI Insights** *(Pro limited, Enterprise full)*

> **AI Insights Note:**  
> AI in the drawer is **read‑only insights**, not chat.  
> Interactive AI will route through **Ask Oracle** once available.

---

## 4. Budget Intelligence (Pro & Enterprise)

Enables real‑time budget intelligence in the Drawer and Command Center.

**Fields**
- **Enable Budget Intelligence**  
- **Default Period View** (Month, Quarter, YTD)

**Behavior**
- Budget is calculated using SuiteQL against actuals + budgets.
- Snapshot stored per approval instance.

> **Tier Notes:**  
> - Core: No budget features.  
> - Pro: Budget block appears.  
> - Enterprise: Budget block + deeper variance context.

---

## 5. AI Insights (Pro & Enterprise)

Configures read‑only AI insights displayed in the Drawer.

**Fields**
- **Enable AI Insights**  
- **Insight Detail Level** (Basic, Standard, Deep — Enterprise only)

**Behavior**
AI generates:
- Transaction summaries  
- Budget variance highlights  
- Vendor or payee insights  
- Step rationale explanations  

> **Important:**  
> AI chat is **not** embedded in the Drawer.  
> Chat functionality will be deferred to Ask Oracle.

---

## 6. Segregation of Duties (SoD)

Controls SoD detection and enforcement.

**Fields**
- **Enable SoD**  
- **SoD Mode** (Disable, Warn, Enforce)  
- **Notification Group** (Enterprise)

**Behavior**
- Detects creator self‑approval  
- Detects duplicate approvals  
- Enforcement behavior depends on tier and mode

> **Tier Notes:**  
> - Core: SoD disabled  
> - Pro: Warn‑only  
> - Enterprise: Warn + Enforce + Logging

---

## 7. Custom Segments

Greenlight supports up to **10 custom segments** for rule matching.

**Fields**
- Segment Label 1–10  
- Segment Field ID 1–10

**Behavior**
If a transaction includes a matching segment value, the Rule Engine uses it during specificity scoring.

---

## 8. Line‑Item Configuration

Controls line‑item behavior in emails and the Approval Drawer.

**Fields**
- **Line‑Item Field List**  
- **PO Line Field List**  
- **Transaction Type Overrides** (optional)

**Notes**
- Used to populate tables in the UI and in email notifications.  
- Avoid choosing fields with high governance impact when possible.

---

## 9. Troubleshooting Settings Issues

**Missing Settings Menu**
- User role missing custom record permission  
- Bundle installation incomplete  

**Drawer Not Displaying Configured Fields**
- Browser caching  
- Client script deployment issue  
- XML visibility mismatch on form  

**Budget Block Not Appearing**
- Not available in Core  
- Budget dataset missing for period  
- Budget intelligence disabled  

---

## 10. Related Documentation

- **Report Settings Guide**  
- **Approval Rules Guide**  
- **Approval Steps Guide**  
- **Approval Drawer Guide**  
- **SoD Guide**  
- **Email Approval System Guide**

---
