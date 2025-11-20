---
title: "Internal FAQ"
description: "Internal-facing frequently asked questions covering product strategy, sales guidance, implementation notes, and support policies."
section: "Internal"
order: 60
---

This internal FAQ provides fast answers for sales, product, support, and partner teams.  
It is not intended for customers. Use this during conversations, demos, and implementation planning.

## 1. Product & Strategy

### 1.1 Is Greenlight a replacement for SuiteFlow?
**Answer:**  
No. Greenlight replaces *approval workflows only*. SuiteFlow is still needed for non-approval automation.

### 1.2 Is Greenlight a competitor to ApprovalMax?
**Answer:**  
Yes, for NetSuite customers. Greenlight is native; ApprovalMax is external and fragmented between systems.

### 1.3 Why don’t we support custom approval actions?
**Answer:**  
To preserve workflow integrity, SoD enforcement, audit trail continuity, and SDN compliance. Only Approve/Reject is allowed.

### 1.4 Why is there no chat-based AI in the Drawer?
**Answer:**  
NetSuite’s Redwood UX principles prohibit embedded conversational AI. Insights only, no chat.

---

## 2. Licensing & Tiers

### 2.1 Can customers mix tiers across subsidiaries?
**Answer:**  
No. Tiering is account-wide.

### 2.2 What happens when a customer upgrades tiers?
**Answer:**  
Features instantly unlock (AI, Budgets, SoD, Delegations, Dashboards). No reinstall required.

### 2.3 Are there per-user or per-approver fees?
**Answer:**  
No. Pricing is tier-based only.

---

## 3. Implementation & Support

### 3.1 How long does a typical implementation take?
**Answer:**  
2–6 weeks depending on complexity. Core can deploy in days.

### 3.2 Do partners configure rules or does Greenlight?
**Answer:**  
Both. Partners own configuration during implementations; Greenlight can assist via support packages.

### 3.3 What is the biggest cause of rule-matching failures?
**Answer:**  
Overly restrictive filters or missing classification fields.

### 3.4 What are the most common support tickets?
**Top categories**
- Drawer not appearing (permissions or script deployment)
- Queue backlog (script scheduling)
- Email token errors
- Missing budget data
- Step assignment mismatches

---

## 4. Technical Architecture

### 4.1 Does Greenlight modify transaction forms?
**Answer:**  
No. The Drawer injects into the DOM and leaves forms untouched.

### 4.2 Can customers extend the Drawer?
**Answer:**  
No. DOM modifications inside the Drawer are unsupported.

### 4.3 Is Greenlight API-first?
**Answer:**  
Partially. Enterprise gains Audit API access; other API surfaces planned (webhooks, workflow builder).

### 4.4 Is any data stored outside NetSuite?
**Answer:**  
Never. All data stays within the customer account.

---

## 5. Compliance & Security

### 5.1 Is Greenlight SOC2-compliant?
**Answer:**  
The product is architected to support SOC2 operations for customers; customer organizations own final compliance posture.

### 5.2 Does Greenlight support SOX?
**Answer:**  
Yes. SoD enforcement, immutable logs, budget evidence, and audit exports directly support SOX validation.

### 5.3 Who can access Audit Package exports?
**Answer:**  
Only roles explicitly granted permission.

---

## 6. Roadmap & Vision

### 6.1 Is Workflow Builder replacing Rules/Steps?
**Answer:**  
No. Workflow Builder will be an *advanced* layer on top of rules/steps for Enterprise.

### 6.2 Are webhooks guaranteed?
**Answer:**  
Yes—Enterprise roadmap, pending SDN approval and stability considerations.

### 6.3 Will we support approval of custom records?
**Answer:**  
Likely yes (future extension), depending on metadata complexity.

---

## 7. Sales & Messaging

### 7.1 What’s the strongest reason customers buy Greenlight?
**Answer:**  
Because it fixes broken approvals in NetSuite **with a modern UI, strong compliance, and reliable logic.**

### 7.2 What’s the easiest qualification question?
**Question:**  
“How predictable and auditable are your approvals today?”

### 7.3 What’s the strongest upsell path?
**Answer:**  
Pro → Enterprise via audit requirements, SoD enforcement, and dashboards.

---

## 8. Internal Notes

### 8.1 Where should internal architecture docs live?
**Answer:**  
Not on public docs. Use private systems (Confluence, Jira, Zendesk, etc.)

### 8.2 What content should never be public?
**List**
- Internal architecture specs  
- Queue internals  
- SoD logic  
- Tokens/security internals  
- Competitive analysis  
- Pricing strategy  
- Internal sales deck  

---

## 9. Related Documentation

- **Product Overview**  
- **Pricing & Tiers**  
- **Competitive Comparison**  
- **Sales Deck (Text Version)**  
- **ROI Calculator Guide**  