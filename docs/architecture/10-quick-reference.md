# Quick Reference

**Document:** IDs, Searches & Common Operations
**Last Updated:** 2025-11-02

This document provides quick reference information for developers working with Greenlight Approvals.

---

## Table of Contents

1. [Important Script IDs](#important-script-ids)
2. [Custom Form IDs](#custom-form-ids)
3. [Important Field IDs](#important-field-ids)
4. [Useful Searches](#useful-searches)

---

## Important Script IDs

### Core Scripts

- **Rule Evaluation:** `customscript_gnl_rule_evaluation`
- **Approval Tray:** `customscript_gnl_approval_tray`
- **Approval Step Helper:** `customscript_gnl_step_helper` (progressive disclosure)
- **Approval Actions API:** `customscript_gnl_approval_actions`
- **Email Approval (Public Suitelet):** `customscript_gnl_email_approval`
- **Approval Queue Processor:** `customscript_gnl_approval_queue`
- **Escalation Processor:** `customscript_gnl_escalation`

### Important Records

- **Settings Record:** `customrecord_gnl_settings` (ID: 1 - singleton)
- **Report Settings Record:** `customrecord_gnl_report_settings` (ID: 1 - singleton)
- **Approval Queue Record:** `customrecord_gnl_approval_queue`

---

## Custom Form IDs

- **Approval Step Form:** `custform_gnl_step_form` (with dynamic field visibility)
- **Approval Instance Form:** `custform_gnl_approval_instance_form` (6 field groups)
- **Settings Form:** `custform_gnl_settings_form` (tab-based layout)
- **Delegation Form:** `custform_gnl_delegation_form`

---

## Important Field IDs

### Transaction Body Fields

- `custbody_gnl_matched_rule` - Matched rule ID
- `custbody_gnl_created_by` - Transaction submitter (employee FK)
- `custbody_gnl_rule_description` - Rule name for display

### Instance Fields

- `custrecord_gnl_instance_transaction` - Transaction FK
- `custrecord_gnl_instance_rule` - Rule FK
- `custrecord_gnl_instance_step` - Step FK
- `custrecord_gnl_instance_status` - Status (Pending, Approved, Rejected, Escalated, Waiting, Superseded)
- `custrecord_gnl_instance_step_num` - Step number for sorting
- `custrecord_gnl_instance_assigned_date` - When became Pending (escalation clock)
- `custrecord_gnl_instance_approved_by` - Who approved (employee FK)
- `custrecord_gnl_instance_generation` - Resubmission round number

### Log Fields

- `custrecord_gnl_log_transaction` - Transaction FK
- `custrecord_gnl_log_instance` - Instance FK
- `custrecord_gnl_log_action` - Action type
- `custrecord_gnl_log_actor` - User who performed action
- `custrecord_gnl_log_datetime` - When action occurred
- `custrecord_gnl_log_comments` - Comments/reason

### Settings Fields

- `custrecord_gnl_enable_email` - Master email toggle
- `custrecord_gnl_enable_email_actions` - Click-to-approve toggle
- `custrecord_gnl_show_txn_header` - Transaction header toggle
- `custrecord_gnl_show_line_items` - Line items toggle
- `custrecord_gnl_show_decision_context` - Decision context toggle

### Report Settings Fields

- `custrecord_gnl_rpt_late_days` - Late approval threshold (days)
- `custrecord_gnl_rpt_very_late_days` - Very late threshold (days)
- `custrecord_gnl_rpt_target_hours` - SLA target (hours)
- `custrecord_gnl_rpt_critical_amt` - Critical amount threshold

---

## Useful Searches

### Pending Approvals

```javascript
search.create({
    type: 'customrecord_gnl_approval_instance',
    filters: [
        ['custrecord_gnl_instance_status', 'is', '1'] // Pending
    ],
    columns: [
        'custrecord_gnl_instance_transaction',
        'custrecord_gnl_instance_step_num',
        'custrecord_gnl_approver_employee',
        'custrecord_gnl_instance_assigned_date'
    ]
});
```

### Overdue Approvals (for escalation)

```javascript
search.create({
    type: 'customrecord_gnl_approval_instance',
    filters: [
        ['custrecord_gnl_instance_status', 'is', '1'], // Pending
        'AND',
        ['formulanumeric: {now} - {custrecord_gnl_instance_assigned_date}', 'greaterthan', '48'] // 48 hours
    ],
    columns: [
        'custrecord_gnl_instance_transaction',
        'custrecord_gnl_instance_assigned_date',
        'custrecord_gnl_approver_employee',
        'custrecord_gnl_escalation_hours'
    ]
});
```

### Pending Queue Records (for monitoring)

```javascript
search.create({
    type: 'customrecord_gnl_approval_queue',
    filters: [
        ['custrecord_gnl_queue_status', 'is', 'Pending']
    ],
    columns: [
        'custrecord_gnl_queue_instance',
        'custrecord_gnl_queue_action',
        'custrecord_gnl_queue_created'
    ]
});
```

### Failed Queue Records (for troubleshooting)

```javascript
search.create({
    type: 'customrecord_gnl_approval_queue',
    filters: [
        ['custrecord_gnl_queue_status', 'is', 'Failed']
    ],
    columns: [
        'custrecord_gnl_queue_instance',
        'custrecord_gnl_queue_action',
        'custrecord_gnl_queue_error',
        'custrecord_gnl_queue_created'
    ]
});
```

### All Approvals by User

```javascript
search.create({
    type: 'customrecord_gnl_approval_log',
    filters: [
        ['custrecord_gnl_log_actor', 'is', employeeId],
        'AND',
        ['custrecord_gnl_log_action', 'is', 'Approved']
    ],
    columns: [
        'custrecord_gnl_log_datetime',
        'custrecord_gnl_log_transaction',
        'custrecord_gnl_log_comments',
        'custrecord_gnl_log_hours_to_action'
    ]
});
```

### Exceptions by Severity

```javascript
search.create({
    type: 'customrecord_gnl_approval_instance',
    filters: [
        ['custrecord_gnl_inst_has_exception', 'is', 'T'],
        'AND',
        ['custrecord_gnl_inst_exception_severity', 'is', '1'] // Critical
    ],
    columns: [
        'custrecord_gnl_instance_transaction',
        'custrecord_gnl_inst_exception_type',
        'custrecord_gnl_inst_exception_date',
        'custrecord_gnl_approver_employee'
    ]
});
```

### Self-Approval Violations

```javascript
search.create({
    type: 'customrecord_gnl_approval_instance',
    filters: [
        ['custrecord_gnl_inst_exc_self_approval', 'is', 'T']
    ],
    columns: [
        'custrecord_gnl_instance_transaction',
        'custrecord_gnl_instance_approved_by',
        'custrecord_gnl_instance_approved_date',
        'custrecord_gnl_inst_exception_date'
    ]
});
```

### Configuration Changes (Audit Trail)

```javascript
search.create({
    type: 'customrecord_gnl_approval_log',
    filters: [
        ['custrecord_gnl_log_change_type', 'anyof', ['3', '4', '5']], // Rule Modified, Step Modified, Settings Changed
        'AND',
        ['custrecord_gnl_log_datetime', 'within', 'today'] // Today's changes
    ],
    columns: [
        'custrecord_gnl_log_datetime',
        'custrecord_gnl_log_actor',
        'custrecord_gnl_log_record_type',
        'custrecord_gnl_log_field_name',
        'custrecord_gnl_log_old_value_display',
        'custrecord_gnl_log_new_value_display'
    ]
});
```

### Transactions Pending My Approval

```javascript
search.create({
    type: 'customrecord_gnl_approval_instance',
    filters: [
        ['custrecord_gnl_instance_status', 'is', '1'], // Pending
        'AND',
        ['custrecord_gnl_approver_employee', 'is', currentUserId]
    ],
    columns: [
        'custrecord_gnl_instance_transaction',
        'custrecord_gnl_instance_transaction.tranid',
        'custrecord_gnl_instance_transaction.total',
        'custrecord_gnl_instance_assigned_date',
        'custrecord_gnl_decision_context'
    ]
});
```

### Approval Performance by Approver

```javascript
search.create({
    type: 'customrecord_gnl_approval_instance',
    filters: [
        ['custrecord_gnl_instance_status', 'is', '2'], // Approved
        'AND',
        ['custrecord_gnl_instance_approved_date', 'within', 'lastmonth']
    ],
    columns: [
        search.createColumn({
            name: 'custrecord_gnl_instance_approved_by',
            summary: 'GROUP'
        }),
        search.createColumn({
            name: 'custrecord_gnl_inst_total_hours',
            summary: 'AVG'
        }),
        search.createColumn({
            name: 'internalid',
            summary: 'COUNT'
        })
    ]
});
```

---

**End of Quick Reference**

For more detailed information, see the other architecture documents:
- [Overview](01-overview.md)
- [Data Model](02-data-model.md)
- [Scripts](03-scripts.md)
- [Libraries](04-libraries.md)
- [Workflows](05-workflows.md)
- [Security](06-security.md)
- [Email System](07-email-system.md)
- [Forms & UX](08-forms-ux.md)
- [Development Standards](09-development.md)
