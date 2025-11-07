# Budget vs Actual Enforcement - Design Document

**Created:** 2025-10-13
**Status:** Design Phase - Ready for Implementation
**Priority:** HIGH - Key Differentiator Feature
**LOE Estimate:** 12-15 hours

---

## 🎯 Overview

**Problem:** Companies have budgets defined in NetSuite but no way to enforce them during transaction approval workflows.

**Solution:** Integrate Greenlight Approvals with NetSuite native budgets to trigger approvals when transactions would cause budget overruns.

**Key Differentiator:** Uses customer's EXISTING NetSuite budget data - no duplicate data entry required!

---

## 💡 Value Proposition

### Why This Feature Sells

**Sales Demo Script:**
> "See this Purchase Order? The IT Department has spent $48,000 of their $50,000 monthly budget. This $5,000 PO would put them $3,000 over budget. Our system automatically detected this using YOUR existing NetSuite budgets and routed it to the CFO for approval. No duplicate data entry, no manual tracking - it just works."

**Customer Benefits:**
- ✅ Prevent budget overruns in real-time (before transactions are approved)
- ✅ No duplicate budget entry (uses NetSuite's native budgets)
- ✅ Works at Department, Class, Location, or GL Account level
- ✅ Visual budget utilization in approval tray
- ✅ Automatic budget tracking with no admin overhead

**Competitive Advantage:**
- NetSuite native approvals: NO budget integration
- Other approval tools: Usually require manual budget entry in separate system
- Greenlight: Uses YOUR NetSuite budgets automatically

---

## 📊 NetSuite Budget Structure

### How NetSuite Stores Budgets

**Two Tables (accessible via SuiteQL):**

#### 1. `Budgets` Table
Annual budget totals per account/department/class/location

```sql
Key Fields:
- ID (budget record ID)
- Year (accounting period ID for fiscal year)
- Account (GL account ID)
- Department (optional - can be NULL)
- Class (optional - can be NULL)
- Location (optional - can be NULL)
- Subsidiary
- Total (annual total budget amount)
```

#### 2. `BudgetsMachine` Table
Period-by-period breakdown (monthly/quarterly budget amounts)

```sql
Key Fields:
- Budget (links to Budgets.ID)
- Period (accounting period ID - monthly/quarterly)
- Amount (budget for that specific period)
```

### Example Budget Query

```javascript
// Get IT Department's budget for current period
SELECT
    b.Department,
    b.Account,
    bm.Amount AS BudgetAmount,
    bm.Period,
    BUILTIN.DF(b.Department) AS DepartmentName,
    BUILTIN.DF(bm.Period) AS PeriodName
FROM
    Budgets b
    INNER JOIN BudgetsMachine bm ON (bm.Budget = b.ID)
WHERE
    b.Department = ?        -- Department ID
    AND bm.Period = ?       -- Current period ID
    AND b.Year = ?          -- Current fiscal year ID
```

---

## 🏗️ Architecture Design

### Phase 1 Scope: Department & Vendor Budget Enforcement

Start with two most requested use cases:
1. **Department Budget Enforcement** - "Don't let Marketing exceed $50K/month"
2. **Vendor Budget Enforcement** - "Don't spend more than $100K/year with Office Depot"

### Data Model Changes

#### New Fields on `customrecord_gnl_approval_rule`

```javascript
// Budget Enforcement Section
custrecord_gnl_rule_budget_check      // Checkbox - Enable budget checking
custrecord_gnl_rule_budget_type       // List: Department, Class, Location, GL Account, Vendor
custrecord_gnl_rule_budget_period     // List: Current Month, Current Quarter, Current Year, Custom Period
custrecord_gnl_rule_budget_threshold  // Percent: 100% (trigger when at/over 100% of budget)
custrecord_gnl_rule_budget_warning    // Percent: 80% (optional warning threshold)
```

#### New Fields on `customrecord_gnl_approval_instance`

**Budget Snapshot Fields** (capture budget state at approval time):

```javascript
custrecord_gnl_inst_budget_type        // Text: "Department", "Vendor", etc.
custrecord_gnl_inst_budget_entity_id   // Text: Internal ID of dept/vendor/etc
custrecord_gnl_inst_budget_entity_name // Text: Display name
custrecord_gnl_inst_budget_amount      // Currency: Total budget for period
custrecord_gnl_inst_actual_spend       // Currency: Spent so far
custrecord_gnl_inst_current_amount     // Currency: Portion of current transaction counted toward budget
custrecord_gnl_inst_projected_spend    // Currency: Actual + Current
custrecord_gnl_inst_budget_util_pct    // Percent: (Projected / Budget) * 100
custrecord_gnl_inst_budget_period      // Text: "October 2025"
custrecord_gnl_inst_budget_calc_date   // DateTime: When calculation was performed
custrecord_gnl_inst_budget_detail      // Long Text: JSON with transaction breakdown
```

---

## 🔧 Implementation Plan

### ✅ Progress Update (2025-11-05)

- **Helper prototype live:** `lib/GNL_BudgetHelpers_V2.js` now queries NetSuite budget data via SuiteQL (joins `budgets` + `budgetsmachine`) and totals actual spend with a transaction search. Returns budget, actual, remaining, and utilization values for the supplied subsidiary/department/class/location/account/date range.
- **Diagnostic Suitelet deployed:** `SL_GNL_BudgetSnapshot.js` (script `customscript_gnl_budget_snapshot`) exposes the helper as a JSON endpoint so we can validate IDs/date ranges while wiring the results into approval flow.
- **Sandbox data verified:** Seeded a $10k/month departmental budget and matching transactions; Suitelet response shows expected budget amount and utilization (e.g., `budgetAmount`, `actualAmount`, `remainingAmount`).
- **Schema & lists deployed:** `customrecord_gnl_approval_rule` now includes budget enforcement fields (checkbox, type, period, thresholds, custom segment id) backed by `customlist_gnl_budget_type` and `customlist_gnl_budget_period`. `customrecord_gnl_approval_instance` includes budget snapshot storage fields.
- **Instance generation wiring:** `UE_GNL_RuleEvaluation` captures budget snapshots (department/class/location/account) per transaction, persists summary + JSON detail on each new instance, and refreshes snapshots on resubmission resets.
- **Tray integration:** `SL_GNL_ApprovalActions` returns the snapshot payload and `CS_GNL_ApprovalTray` renders a budget card (utilization badge, budget/actual/projected, variance, top dimension breakdown, warnings).
- **Next steps:** validate “Actual Spend” against posted transactions, expose snapshot data in Phase 5 reports/Audit Package, document the budget owner/escalation process, and consider relaxed filtering for Department-only budgets.

### 1. Create Budget Helper Library

**File:** `lib/GNL_BudgetHelpers.js`

```javascript
/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define(['N/query', 'N/runtime'], function(query, runtime) {

    /**
     * Check if transaction would exceed department budget
     * @param {Object} transactionRec - Transaction record object
     * @param {Object} ruleRec - Approval rule record object
     * @returns {Object|null} Budget status or null if under budget
     */
    function checkDepartmentBudget(transactionRec, ruleRec) {
        var department = transactionRec.getValue('department');
        if (!department) return null;

        var amount = parseFloat(transactionRec.getValue('total') || 0);
        var currentPeriod = getCurrentPeriodId();
        var fiscalYear = getCurrentFiscalYearId();
        var threshold = parseFloat(ruleRec.getValue('custrecord_gnl_rule_budget_threshold') || 100);

        // Query total budget for department in current period
        var budgetSql = `
            SELECT
                SUM(bm.Amount) AS TotalBudget,
                b.Department
            FROM
                Budgets b
                INNER JOIN BudgetsMachine bm ON (bm.Budget = b.ID)
            WHERE
                b.Department = ?
                AND bm.Period = ?
                AND b.Year = ?
            GROUP BY b.Department
        `;

        var budgetResults = query.runSuiteQL({
            query: budgetSql,
            params: [department, currentPeriod, fiscalYear]
        }).asMappedResults();

        if (!budgetResults || budgetResults.length === 0) {
            log.debug('No budget found for department', department);
            return null; // No budget = no enforcement
        }

        var totalBudget = parseFloat(budgetResults[0].totalbudget || 0);

        // Query actual spend for department this period
        var actualSql = `
            SELECT
                SUM(t.FxAmount) AS ActualSpend
            FROM
                Transaction t
            WHERE
                t.Department = ?
                AND t.PostingPeriod = ?
                AND t.Type IN ('VendBill', 'PurchOrd')
                AND t.MainLine = 'T'
                AND t.custbody_gnl_approval_status IN ('2')  -- Only approved transactions
        `;

        var actualResults = query.runSuiteQL({
            query: actualSql,
            params: [department, currentPeriod]
        }).asMappedResults();

        var actualSpend = parseFloat(actualResults[0]?.actualspend || 0);
        var projectedSpend = actualSpend + amount;
        var utilization = (projectedSpend / totalBudget) * 100;
        var thresholdAmount = (totalBudget * threshold) / 100;

        // Check if projected spend exceeds threshold
        if (projectedSpend > thresholdAmount) {
            return {
                exceeded: true,
                budgetType: 'Department',
                entityId: department,
                entityName: getDepartmentName(department),
                budgetAmount: totalBudget,
                actualSpend: actualSpend,
                currentTransaction: amount,
                projectedSpend: projectedSpend,
                utilization: utilization,
                threshold: threshold,
                thresholdAmount: thresholdAmount,
                overage: projectedSpend - thresholdAmount,
                period: getPeriodName(currentPeriod),
                transactionDetail: getTransactionBreakdown(department, currentPeriod)
            };
        }

        return null; // Under budget
    }

    /**
     * Check if transaction would exceed vendor spend budget
     */
    function checkVendorBudget(transactionRec, ruleRec) {
        var vendor = transactionRec.getValue('entity');
        if (!vendor) return null;

        var amount = parseFloat(transactionRec.getValue('total') || 0);
        var periodType = ruleRec.getValue('custrecord_gnl_rule_budget_period'); // Year, Quarter, Month
        var threshold = parseFloat(ruleRec.getValue('custrecord_gnl_rule_budget_threshold') || 100);

        // Query vendor spend for period
        var dateRange = getDateRangeForPeriod(periodType);

        var vendorSql = `
            SELECT
                SUM(t.FxAmount) AS TotalSpend
            FROM
                Transaction t
            WHERE
                t.Entity = ?
                AND t.TranDate >= ?
                AND t.TranDate <= ?
                AND t.Type IN ('VendBill', 'VendPymt', 'PurchOrd')
                AND t.MainLine = 'T'
                AND t.custbody_gnl_approval_status = '2'  -- Approved only
        `;

        var results = query.runSuiteQL({
            query: vendorSql,
            params: [vendor, dateRange.startDate, dateRange.endDate]
        }).asMappedResults();

        var actualSpend = parseFloat(results[0]?.totalspend || 0);
        var projectedSpend = actualSpend + amount;

        // For vendor budgets, threshold is a fixed amount (not from Budgets table)
        // This would come from a custom field on vendor record or rule
        var budgetAmount = parseFloat(ruleRec.getValue('custrecord_gnl_rule_vendor_budget_amt') || 0);

        if (budgetAmount === 0) return null; // No budget set

        var utilization = (projectedSpend / budgetAmount) * 100;
        var thresholdAmount = (budgetAmount * threshold) / 100;

        if (projectedSpend > thresholdAmount) {
            return {
                exceeded: true,
                budgetType: 'Vendor',
                entityId: vendor,
                entityName: getVendorName(vendor),
                budgetAmount: budgetAmount,
                actualSpend: actualSpend,
                currentTransaction: amount,
                projectedSpend: projectedSpend,
                utilization: utilization,
                threshold: threshold,
                thresholdAmount: thresholdAmount,
                overage: projectedSpend - thresholdAmount,
                period: periodType,
                transactionDetail: getVendorTransactionBreakdown(vendor, dateRange)
            };
        }

        return null;
    }

    /**
     * Get transaction breakdown for display
     */
    function getTransactionBreakdown(departmentId, periodId) {
        var sql = `
            SELECT
                t.ID,
                t.Type,
                t.TranID,
                t.TranDate,
                t.FxAmount,
                t.Status
            FROM
                Transaction t
            WHERE
                t.Department = ?
                AND t.PostingPeriod = ?
                AND t.Type IN ('VendBill', 'PurchOrd')
                AND t.MainLine = 'T'
                AND t.custbody_gnl_approval_status = '2'
            ORDER BY t.TranDate DESC
            FETCH FIRST 50 ROWS ONLY
        `;

        var results = query.runSuiteQL({
            query: sql,
            params: [departmentId, periodId]
        }).asMappedResults();

        return JSON.stringify(results);
    }

    // Helper functions
    function getCurrentPeriodId() {
        // Get current posting period
        var periodSql = "SELECT ID FROM AccountingPeriod WHERE IsQuarter = 'F' AND IsYear = 'F' AND Closed = 'F' ORDER BY StartDate DESC FETCH FIRST 1 ROW ONLY";
        var result = query.runSuiteQL({ query: periodSql }).asMappedResults();
        return result[0]?.id;
    }

    function getCurrentFiscalYearId() {
        var yearSql = "SELECT ID FROM AccountingPeriod WHERE IsYear = 'T' AND Closed = 'F' ORDER BY StartDate DESC FETCH FIRST 1 ROW ONLY";
        var result = query.runSuiteQL({ query: yearSql }).asMappedResults();
        return result[0]?.id;
    }

    function getDepartmentName(id) {
        var sql = "SELECT Name FROM Department WHERE ID = ?";
        var result = query.runSuiteQL({ query: sql, params: [id] }).asMappedResults();
        return result[0]?.name || 'Unknown';
    }

    function getVendorName(id) {
        var sql = "SELECT CompanyName FROM Vendor WHERE ID = ?";
        var result = query.runSuiteQL({ query: sql, params: [id] }).asMappedResults();
        return result[0]?.companyname || 'Unknown';
    }

    function getPeriodName(id) {
        var sql = "SELECT PeriodName FROM AccountingPeriod WHERE ID = ?";
        var result = query.runSuiteQL({ query: sql, params: [id] }).asMappedResults();
        return result[0]?.periodname || 'Unknown';
    }

    function getDateRangeForPeriod(periodType) {
        // Returns { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' }
        var today = new Date();
        var startDate, endDate;

        if (periodType === 'Current Month') {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        } else if (periodType === 'Current Quarter') {
            var quarter = Math.floor(today.getMonth() / 3);
            startDate = new Date(today.getFullYear(), quarter * 3, 1);
            endDate = new Date(today.getFullYear(), quarter * 3 + 3, 0);
        } else if (periodType === 'Current Year') {
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = new Date(today.getFullYear(), 11, 31);
        }

        return {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate)
        };
    }

    function formatDate(date) {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }

    return {
        checkDepartmentBudget: checkDepartmentBudget,
        checkVendorBudget: checkVendorBudget
    };
});
```

---

### 2. Integrate into Rule Evaluation

**File:** `UE_GNL_RuleEvaluation.js`

**Modify `findMatchingRule()` function:**

```javascript
function findMatchingRule(transactionRec, transactionType, settingsId) {
    // ... existing rule matching logic ...

    if (!bestMatch) return null;

    // NEW: Check if best match has budget enforcement enabled
    var ruleRec = record.load({
        type: 'customrecord_gnl_approval_rule',
        id: bestMatch.ruleId
    });

    var budgetCheckEnabled = ruleRec.getValue('custrecord_gnl_rule_budget_check');

    if (budgetCheckEnabled) {
        var budgetType = ruleRec.getValue('custrecord_gnl_rule_budget_type');
        var budgetStatus = null;

        if (budgetType === 'Department') {
            budgetStatus = budgetHelpers.checkDepartmentBudget(transactionRec, ruleRec);
        } else if (budgetType === 'Vendor') {
            budgetStatus = budgetHelpers.checkVendorBudget(transactionRec, ruleRec);
        }

        if (budgetStatus && budgetStatus.exceeded) {
            log.audit('Budget Exceeded', budgetStatus);
            // Store budget status for use in afterSubmit
            runtime.getCurrentScript().setSharedObject('budgetStatus', budgetStatus);
        } else {
            log.debug('Budget Check Passed', 'Under budget or no budget found');
        }
    }

    return bestMatch;
}
```

**Modify `generateApprovalInstances()` function:**

```javascript
function generateApprovalInstances(transactionId, transactionType, ruleId, createdBy) {
    // ... existing instance generation logic ...

    // NEW: Check for budget status from rule evaluation
    var budgetStatus = runtime.getCurrentScript().getSharedObject('budgetStatus');

    if (budgetStatus) {
        // Store budget snapshot on first instance
        var firstInstance = instances[0];
        record.submitFields({
            type: 'customrecord_gnl_approval_instance',
            id: firstInstance.id,
            values: {
                custrecord_gnl_inst_budget_type: budgetStatus.budgetType,
                custrecord_gnl_inst_budget_entity_id: budgetStatus.entityId,
                custrecord_gnl_inst_budget_entity_name: budgetStatus.entityName,
                custrecord_gnl_inst_budget_amount: budgetStatus.budgetAmount,
                custrecord_gnl_inst_actual_spend: budgetStatus.actualSpend,
                custrecord_gnl_inst_current_trx: budgetStatus.currentTransaction,
                custrecord_gnl_inst_projected_spend: budgetStatus.projectedSpend,
                custrecord_gnl_inst_budget_utilization: budgetStatus.utilization,
                custrecord_gnl_inst_budget_period: budgetStatus.period,
                custrecord_gnl_inst_budget_calc_date: new Date(),
                custrecord_gnl_inst_budget_detail: budgetStatus.transactionDetail
            }
        });
    }
}
```

---

### 3. Display Budget Alert in Approval Tray

**File:** `CS_GNL_ApprovalTray.js`

**Add budget alert rendering function:**

```javascript
function displayBudgetAlert(instanceRecord) {
    var budgetType = instanceRecord.getValue('custrecord_gnl_inst_budget_type');

    if (!budgetType) return ''; // No budget alert

    var entityName = instanceRecord.getValue('custrecord_gnl_inst_budget_entity_name');
    var budgetAmount = parseFloat(instanceRecord.getValue('custrecord_gnl_inst_budget_amount') || 0);
    var actualSpend = parseFloat(instanceRecord.getValue('custrecord_gnl_inst_actual_spend') || 0);
    var currentTrx = parseFloat(instanceRecord.getValue('custrecord_gnl_inst_current_trx') || 0);
    var projectedSpend = parseFloat(instanceRecord.getValue('custrecord_gnl_inst_projected_spend') || 0);
    var utilization = parseFloat(instanceRecord.getValue('custrecord_gnl_inst_budget_utilization') || 0);
    var period = instanceRecord.getValue('custrecord_gnl_inst_budget_period');

    var overage = projectedSpend - budgetAmount;
    var overagePct = ((overage / budgetAmount) * 100).toFixed(1);

    var html = '<div class="gnl-budget-alert">';
    html += '<div class="gnl-budget-alert-header">';
    html += '<span class="gnl-budget-icon">⚠️</span>';
    html += '<h3>' + budgetType.toUpperCase() + ' BUDGET THRESHOLD EXCEEDED</h3>';
    html += '</div>';

    html += '<table class="gnl-budget-breakdown">';
    html += '<tr><td><strong>' + budgetType + ':</strong></td><td>' + escapeHtml(entityName) + '</td></tr>';
    html += '<tr><td><strong>Budget Period:</strong></td><td>' + escapeHtml(period) + '</td></tr>';
    html += '<tr class="gnl-spacer"><td colspan="2"></td></tr>';

    html += '<tr><td>Period Budget:</td><td class="gnl-amount">' + formatCurrency(budgetAmount) + '</td></tr>';
    html += '<tr><td>Spent to Date:</td><td class="gnl-amount">' + formatCurrency(actualSpend) + '</td></tr>';
    html += '<tr><td>This Transaction:</td><td class="gnl-amount gnl-highlight">+ ' + formatCurrency(currentTrx) + '</td></tr>';
    html += '<tr class="gnl-divider"><td colspan="2"><hr></td></tr>';

    html += '<tr class="gnl-total"><td><strong>Projected Spend:</strong></td><td class="gnl-amount"><strong>' + formatCurrency(projectedSpend) + '</strong></td></tr>';
    html += '<tr class="gnl-utilization"><td>Budget Utilization:</td><td class="gnl-amount gnl-warning">' + utilization.toFixed(1) + '%</td></tr>';
    html += '<tr class="gnl-overage"><td><strong>Overage:</strong></td><td class="gnl-amount gnl-danger"><strong>' + formatCurrency(overage) + ' (' + overagePct + '% over)</strong></td></tr>';
    html += '</table>';

    html += '<div class="gnl-budget-actions">';
    html += '<button class="gnl-btn-secondary" onclick="viewBudgetBreakdown(\'' + instanceRecord.id + '\')">View Transaction Breakdown</button>';
    html += '</div>';

    html += '</div>';

    return html;
}

// Add CSS for budget alert
var budgetAlertCSS = `
.gnl-budget-alert {
    background: #fff8dc;
    border: 2px solid #ff9800;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
}

.gnl-budget-alert-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.gnl-budget-icon {
    font-size: 24px;
    margin-right: 8px;
}

.gnl-budget-alert-header h3 {
    margin: 0;
    color: #f57c00;
    font-size: 16px;
}

.gnl-budget-breakdown {
    width: 100%;
    font-size: 13px;
}

.gnl-budget-breakdown td {
    padding: 4px 8px;
}

.gnl-budget-breakdown .gnl-amount {
    text-align: right;
    font-family: 'Courier New', monospace;
}

.gnl-budget-breakdown .gnl-highlight {
    background: #fff3cd;
    font-weight: bold;
}

.gnl-budget-breakdown .gnl-warning {
    color: #ff9800;
    font-weight: bold;
}

.gnl-budget-breakdown .gnl-danger {
    color: #d32f2f;
}

.gnl-budget-breakdown .gnl-divider hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 4px 0;
}

.gnl-budget-breakdown .gnl-total td {
    padding-top: 8px;
    font-size: 14px;
}

.gnl-budget-actions {
    margin-top: 12px;
    text-align: center;
}
`;
```

---

## 📋 Implementation Checklist

### Phase 1: Core Budget Integration (12-15 hours)

- [ ] **Create Budget Helper Library** (4-5 hours)
  - [ ] Create `GNL_BudgetHelpers.js`
  - [ ] Implement `checkDepartmentBudget()`
  - [ ] Implement `checkVendorBudget()`
  - [ ] Implement helper functions (period lookups, name lookups)
  - [ ] Test SuiteQL queries in NetSuite console

- [ ] **Add Custom Fields** (1 hour)
  - [ ] Add 5 fields to `customrecord_gnl_approval_rule`
  - [ ] Add 10 fields to `customrecord_gnl_approval_instance`
  - [ ] Deploy via SDF

- [ ] **Integrate into Rule Evaluation** (3-4 hours)
  - [ ] Modify `UE_GNL_RuleEvaluation.js`
  - [ ] Add budget check to `findMatchingRule()`
  - [ ] Store budget snapshot in `generateApprovalInstances()`
  - [ ] Test with sample transactions

- [ ] **Build Budget Alert UI** (3-4 hours)
  - [ ] Add `displayBudgetAlert()` to Client Script
  - [ ] Add CSS for budget alert box
  - [ ] Integrate into tray rendering
  - [ ] Add "View Breakdown" popup (optional)

- [ ] **Testing & Validation** (1-2 hours)
  - [ ] Test department budget enforcement
  - [ ] Test vendor budget enforcement
  - [ ] Test with no budget defined (should not block)
  - [ ] Test utilization calculations
  - [ ] Verify budget snapshot accuracy

---

## 🎨 UI Mockup

### Budget Alert in Approval Tray

```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️ DEPARTMENT BUDGET THRESHOLD EXCEEDED                     │
├─────────────────────────────────────────────────────────────┤
│ Department: IT Department                                   │
│ Budget Period: October 2025                                 │
│                                                              │
│ Period Budget:         $50,000.00                           │
│ Spent to Date:         $48,000.00                           │
│ This Transaction:      + $5,000.00                          │
│ ─────────────────────────────────────                       │
│ Projected Spend:       $53,000.00                           │
│ Budget Utilization:    106.0%                               │
│ Overage:               $3,000.00 (6.0% over)                │
│                                                              │
│            [View Transaction Breakdown]                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Future Enhancements (Phase 2)

### Additional Budget Types
- [ ] GL Account budgets (line-level enforcement)
- [ ] Class budgets
- [ ] Location budgets
- [ ] Project budgets

### Advanced Features
- [ ] Budget utilization dashboard
- [ ] Budget forecast warnings (80% threshold)
- [ ] Budget reallocation workflows
- [ ] Multi-dimensional budgets (Dept + Account)
- [ ] Budget variance reporting

---

## 📊 Success Metrics

**Implementation Success:**
- Rule evaluation with budget check completes in <2 seconds
- Budget queries use <10 governance units per transaction
- UI renders budget alert in <500ms

**Business Success:**
- Customers report 90%+ reduction in budget overruns
- Finance teams save 10+ hours/month on manual budget tracking
- Feature appears in 50%+ of sales demos
- Closes at least 2 deals per quarter as primary differentiator

---

## 🎯 Sales Positioning

**Key Talking Points:**
1. "Greenlight is the ONLY approval tool that integrates with NetSuite budgets"
2. "No duplicate data entry - uses your existing budgets"
3. "Real-time budget enforcement - prevent overruns BEFORE approval"
4. "Visual budget dashboards in every approval"
5. "Works at Department, Vendor, Class, Location, or GL Account level"

**Demo Flow:**
1. Show NetSuite budget (Setup > Accounting > Budgets)
2. Show Greenlight rule with budget check enabled
3. Create PO that would exceed budget
4. Show budget alert in approval tray with utilization %
5. Show budget breakdown with contributing transactions

---

**End of Budget Integration Design**
_Ready for implementation - all technical details defined_
