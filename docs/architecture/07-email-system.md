# Email System Architecture

**Document:** Email Templates & Notification System
**Last Updated:** 2025-11-02

This document describes the email notification system, template architecture, and placeholder replacement engine.

---

## Table of Contents

1. [Template Files](#template-files)
2. [Placeholder System](#placeholder-system)
3. [Conditional Sections](#conditional-sections)
4. [Transaction Type Map](#transaction-type-map)

---

## Template Files

All templates are **NetSuite Email Template records** (type -120) stored in XML:

1. `custemailtmpl_gnl_assignment.template.html` - Assignment notification
2. `custemailtmpl_gnl_approved.template.html` - Approval confirmation (unified template with dynamic messaging)
3. `custemailtmpl_gnl_rejected.template.html` - Rejection notification
4. `custemailtmpl_gnl_complete.template.html` - Final approval (deprecated - now uses unified approved template)
5. `custemailtmpl_gnl_escalated.template.html` - Escalation notification

### Template Structure Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Approval Request</title>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1f2937; max-width: 650px; margin: 0 auto; padding: 20px;">

<!-- Greeting -->
<p style="font-size: 16px; margin-bottom: 24px;">Hi <strong>[recipientName]</strong>,</p>

<!-- Main Message -->
<p style="font-size: 15px; margin-bottom: 20px; color: #374151;">
    You have a new approval request for <strong>[transactionType]</strong> <strong>#[transactionId]</strong>.
</p>

<!-- Transaction Header (Conditional) -->
<!--[TXN_HEADER_START]-->
[transactionHeader]
<!--[TXN_HEADER_END]-->

<!-- Line Items (Conditional) -->
<!--[LINE_ITEMS_START]-->
[lineItems]
<!--[LINE_ITEMS_END]-->

<!-- Decision Context (Conditional) -->
<!--[RULE_CONTEXT_START]-->
<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 4px;">
    <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 15px;">Decision Context</h4>
    <div style="color: #1e40af; font-size: 14px; white-space: pre-line;">[decisionContext]</div>
</div>
<!--[RULE_CONTEXT_END]-->

<!-- Action Buttons (Conditional) -->
<!--[EMAIL_ACTIONS_START]-->
<div style="margin: 30px 0; text-align: center;">
    <a href="[approveUrl]" style="display: inline-block; background: #10b981; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 8px;">
        ✓ Approve
    </a>
    <a href="[rejectUrl]" style="display: inline-block; background: #ef4444; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 8px;">
        ✗ Reject
    </a>
</div>
<!--[EMAIL_ACTIONS_END]-->

<!-- View in NetSuite (Always shown) -->
<div style="margin: 20px 0; text-align: center;">
    <a href="[viewUrl]" style="color: #3b82f6; text-decoration: none; font-size: 14px;">
        View in NetSuite →
    </a>
</div>

</body>
</html>
```

---

## Placeholder System

### Standard Placeholders

- `[recipientName]` - Approver's name (personalized per recipient)
- `[transactionId]` - Transaction number (e.g., "PO-12345")
- `[transactionType]` - Transaction type name (e.g., "Purchase Order")
- `[amount]` - Transaction amount formatted (e.g., "$12,450.00")
- `[submitterName]` - Who submitted the transaction
- `[approverName]` - Who approved (for confirmation emails)
- `[stepNumber]` - Current step number (e.g., "1")
- `[totalSteps]` - Total steps in workflow (e.g., "3")
- `[rejectionReason]` - Rejection comments (for rejection emails)

### Dynamic Content Placeholders

- `[transactionHeader]` - Replaced with HTML from buildTransactionHeaderHTML()
- `[lineItems]` - Replaced with HTML from buildLineItemsHTML()
- `[decisionContext]` - Replaced with parsed decision context from rule

### URL Placeholders

- `[approveUrl]` - Email approval link with HMAC token
- `[rejectUrl]` - Email rejection link with HMAC token
- `[viewUrl]` - Direct link to transaction in NetSuite

### Dynamic Merge Fields

Email templates support dynamic field replacement using `{fieldName}` syntax:

**Example:**
```
Transaction: {tranid}
Total: {total_formatted}
Vendor: {entity}
Due Date: {duedate}
```

**Replacement:**
```
Transaction: PO-12345
Total: $12,450.00
Vendor: Acme Corporation
Due Date: 2025-11-15
```

**Implementation:**
- `parseMergeFields()` function finds all `{fieldName}` patterns
- Uses `search.lookupFields()` to get values dynamically
- Supports `{fieldName_formatted}` for currency/date formatting
- Works with any transaction field (no hardcoded list needed)

---

## Conditional Sections

### How Conditional Sections Work

Conditional sections allow admins to show/hide email content based on Settings toggles.

**Example: Transaction Header**
```html
<!--[TXN_HEADER_START]-->
<div style="background: #f9fafb; padding: 16px; margin: 20px 0; border-radius: 6px;">
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td><strong>Vendor:</strong></td>
            <td>Acme Corporation</td>
        </tr>
        <tr>
            <td><strong>Total:</strong></td>
            <td>$12,450.00</td>
        </tr>
    </table>
</div>
<!--[TXN_HEADER_END]-->
```

**Processing:**
1. Check Settings toggle: `custrecord_gnl_show_txn_header`
2. If toggle = F (unchecked): Remove everything between START and END markers
3. If toggle = T (checked): Remove only the comment markers, keep content

### Available Conditional Sections

1. **Transaction Header:** `<!--[TXN_HEADER_START]-->` ... `<!--[TXN_HEADER_END]-->`
   - Controlled by: `custrecord_gnl_show_txn_header`
   - Contains: Transaction-specific summary fields

2. **Line Items:** `<!--[LINE_ITEMS_START]-->` ... `<!--[LINE_ITEMS_END]-->`
   - Controlled by: `custrecord_gnl_show_line_items`
   - Contains: Line items table with configurable columns

3. **Decision Context:** `<!--[RULE_CONTEXT_START]-->` ... `<!--[RULE_CONTEXT_END]-->`
   - Controlled by: `custrecord_gnl_show_decision_context`
   - Contains: Admin-configured decision context text

4. **Email Actions:** `<!--[EMAIL_ACTIONS_START]-->` ... `<!--[EMAIL_ACTIONS_END]-->`
   - Controlled by: `custrecord_gnl_enable_email_actions`
   - Contains: Approve/Reject buttons

### Conditional Section Implementation

```javascript
function processConditionalSections(template, settings) {
    // Transaction Header
    if (!settings.showTxnHeader) {
        template = template.replace(/<!--\[TXN_HEADER_START\]-->[\s\S]*?<!--\[TXN_HEADER_END\]-->/g, '');
    } else {
        template = template.replace(/<!--\[TXN_HEADER_START\]-->|<!--\[TXN_HEADER_END\]-->/g, '');
    }

    // Line Items
    if (!settings.showLineItems) {
        template = template.replace(/<!--\[LINE_ITEMS_START\]-->[\s\S]*?<!--\[LINE_ITEMS_END\]-->/g, '');
    } else {
        template = template.replace(/<!--\[LINE_ITEMS_START\]-->|<!--\[LINE_ITEMS_END\]-->/g, '');
    }

    // Decision Context
    if (!settings.showDecisionContext) {
        template = template.replace(/<!--\[RULE_CONTEXT_START\]-->[\s\S]*?<!--\[RULE_CONTEXT_END\]-->/g, '');
    } else {
        template = template.replace(/<!--\[RULE_CONTEXT_START\]-->|<!--\[RULE_CONTEXT_END\]-->/g, '');
    }

    // Email Actions
    if (!settings.enableEmailActions) {
        template = template.replace(/<!--\[EMAIL_ACTIONS_START\]-->[\s\S]*?<!--\[EMAIL_ACTIONS_END\]-->/g, '');
    } else {
        template = template.replace(/<!--\[EMAIL_ACTIONS_START\]-->|<!--\[EMAIL_ACTIONS_END\]-->/g, '');
    }

    return template;
}
```

---

## Transaction Type Map

Maps NetSuite internal transaction types to friendly names:

```javascript
const TRX_TYPE_MAP = {
    'purchaseorder': 'Purchase Order',
    'salesorder': 'Sales Order',
    'expensereport': 'Expense Report',
    'vendorbill': 'Vendor Bill',
    'invoice': 'Invoice',
    'creditmemo': 'Credit Memo',
    'vendorcredit': 'Vendor Credit',
    'itemreceipt': 'Item Receipt',
    'vendorpayment': 'Vendor Payment',
    'cashsale': 'Cash Sale',
    'customerpayment': 'Customer Payment',
    'returnauthorization': 'Return Authorization',
    'transferorder': 'Transfer Order',
    'itemfulfillment': 'Item Fulfillment',
    'inventoryadjustment': 'Inventory Adjustment',
    'journalentry': 'Journal Entry',
    'check': 'Check',
    // ... 40+ transaction types
};
```

### Transaction-Specific Email Headers

Different transaction types show different header fields:

**Purchase Order:**
- Vendor, Total Amount, Payment Terms, Receive By Date, Shipping Method

**Sales Order:**
- Customer, Total Amount, Sales Rep, Ship Date, Order Status

**Expense Report:**
- Employee, Department, Total Amount, Policy Violations, Approval Chain

**Vendor Bill:**
- Vendor, Total Amount, Due Date, Payment Hold, Discount Available

**Invoice:**
- Customer, Total Amount, Currency, Payment Terms, Due Date

**Journal Entry:**
- Memo, Total Debits, Total Credits, Balance Check, Posting Period

**Default (all others):**
- Transaction Number, Transaction Type, Total Amount, Date

### Header Builder Functions

Each transaction type has a dedicated header builder function:

- `buildPurchaseOrderHeader(record)`
- `buildSalesOrderHeader(record)`
- `buildExpenseReportHeader(record)`
- `buildVendorBillHeader(record)`
- `buildInvoiceHeader(record)`
- `buildVendorReturnAuthorizationHeader(record)`
- `buildJournalEntryHeader(record)`
- `buildDefaultHeader(record)`

---

**Next:** See [Forms & UX](08-forms-ux.md) for custom form design and progressive disclosure patterns.
