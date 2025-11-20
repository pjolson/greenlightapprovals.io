---
title: "Post-Installation Checklist"
description: "Verify that Greenlight Approvals has been installed and configured correctly in your NetSuite account."
section: "Implementation"
order: 20
---

# Post-Installation Checklist

Use this checklist to confirm that Greenlight Approvals was installed successfully and that your NetSuite account is ready for configuration and testing.

---

## ✅ 1. Verify Custom Records Installed

Ensure the following custom records exist:

- **Approval Rule**
- **Approval Step**
- **Approval Instance**
- **Approval Log**
- **Delegation**
- **Greenlight Settings**
- **Report Settings**
- **Approval Queue**
- **Email Approval Queue**
- **Audit Export Item**  
  - *(Pro: limited catalog, Enterprise: full catalog)*

---

## ✅ 2. Verify Script Deployments

Check **Customization → Scripting → Script Deployments** for:

### User Event Scripts
- Rule Evaluation (UE)
- Rule & Step Audit (UE)
- Settings Audit (UE)
- Report Settings Audit (UE)

### Client Scripts
- Approval Drawer Client Script
- Approval Step Helper Script

### Suitelets
- Approval Actions (SL)
- Email Approval (SL)
- Audit Package (SL)

### Scheduled Scripts
- Approval Queue Processor
- Action Queue Processor
- Escalation Engine

---

## ✅ 3. Confirm Menu Navigation Appears

In the NetSuite navigation menu, you should see:

**Approvals →**
- Settings  
- Delegations  
- Rules  
- Audit Package *(Pro/Enterprise only)*  
- Command Center *(module availability varies by tier)*

If items are missing, refresh permissions or clear browser cache.

---

## ✅ 4. Confirm Settings Are Accessible

Navigate to:

**Approvals → Settings**

Verify:
- The Settings record loads successfully
- All expected configuration fields appear
- No permission errors occur

---

## ✅ 5. Confirm Report Settings Are Accessible

Navigate to:

**Approvals → Report Settings**

Verify:
- SLA fields are editable
- Thresholds and aging buckets are present
- No errors or hidden fields

---

## ✅ 6. Verify Approval Drawer Loads on Transactions

Open a supported transaction type (PO, VB, ER, JE, SO, etc.) and confirm:

- The **Greenlight Approval Drawer** appears
- AI Insights block (Pro/Enterprise only)
- Budget block (Pro/Enterprise only)
- Decision context
- Timeline tab
- Comments area
- No script errors

---

## ✅ 7. Verify Email Approvals are Enabled

Check that:

- Email templates are installed
- `[approveUrl]` and `[rejectUrl]` links render correctly
- Public email approval Suitelet loads
- Queue processor scheduled script is deployed

---

## ✅ 8. Confirm Scheduled Scripts Are Running

Navigate to:

**Setup → Automation → Scheduled Scripts**

Verify:
- **Approval Queue Processor** is scheduled (Every 15 minutes)
- **Action Queue Processor** is scheduled (Every 5 minutes)
- **Escalation Engine** is scheduled (Every 15 minutes)

---

## ✅ 9. Run a Basic Transaction Test

Create or edit a sample transaction:

- Ensure rule matches
- Status changes to “Pending Approval”
- Approval Instance is created
- Approval Drawer loads
- Approve using the drawer
- Check that:
  - Step progresses
  - Email notification is sent
  - Instance logs update
  - No exceptions occur (unless expected)

---

## 🎉 Checklist Complete!

Your environment is now ready for full configuration, rule building, and production testing.  
If any step fails, refer to the **Troubleshooting** section or contact Greenlight Support.