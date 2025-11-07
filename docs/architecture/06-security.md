# Security Model

**Document:** Security & Compliance
**Last Updated:** 2025-11-02

This document describes the security architecture, permission validation, and audit trail mechanisms.

---

## Table of Contents

1. [Permission Validation](#permission-validation)
2. [HMAC Token Security](#hmac-token-security)
3. [Audit Trail](#audit-trail)
4. [Technical Debt & Future Enhancements](#technical-debt--future-enhancements)

---

## Permission Validation

### Multi-Layer Permission Check

When a user tries to approve, the system checks (in order):

1. **Direct Employee Match:** Is user the assigned approver?
2. **Active Delegation:** Is there an active delegation from approver to user?
   - Check `custrecord_gnl_delegation` records
   - Must be active and within date range
3. **Role Member:** If approver type = Role, is user in that role?
   - Query employee record for role assignments
4. **Group Member:** If approver type = Group, is user in that group?
   - Query group membership
   - Handles both static and dynamic groups
5. **Admin Override:** Does user have "Greenlight Admin" role?
   - Special permission for system administrators

**All checks must pass permission validation before approval is processed.**

### Permission Validation Code Pattern

```javascript
function checkApprovalPermission(instanceId, userId) {
    const instance = loadInstance(instanceId);
    const user = loadUser(userId);

    // Check 1: Direct employee match
    if (instance.approverEmployee === userId) {
        return { allowed: true, reason: 'Direct approver' };
    }

    // Check 2: Active delegation
    const delegation = findActiveDelegation(instance.approverEmployee, userId);
    if (delegation) {
        return { allowed: true, reason: 'Delegation', delegateId: delegation.id };
    }

    // Check 3: Role member
    if (instance.approverType === 'Role') {
        if (userHasRole(userId, instance.approverRole)) {
            return { allowed: true, reason: 'Role member' };
        }
    }

    // Check 4: Group member
    if (instance.approverType === 'Group') {
        if (userInGroup(userId, instance.approverGroup)) {
            return { allowed: true, reason: 'Group member' };
        }
    }

    // Check 5: Admin override
    if (userHasRole(userId, 'GREENLIGHT_ADMIN')) {
        return { allowed: true, reason: 'Admin override' };
    }

    return { allowed: false, reason: 'No permission' };
}
```

---

## HMAC Token Security

### Token Generation

Email approve/reject links include HMAC tokens to prevent URL tampering:

```javascript
const payload = `${instanceId}:${action}:${expiresAt}`;
const token = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');

const approveUrl = `${suiteletUrl}?instance=${instanceId}&action=approve&expires=${expiresAt}&token=${token}`;
```

### Token Validation

```javascript
function validateToken(instanceId, action, expiresAt, token) {
    // Reconstruct expected token
    const payload = `${instanceId}:${action}:${expiresAt}`;
    const expectedToken = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');

    // Timing-safe comparison
    if (token !== expectedToken) {
        throw 'Invalid token - URL tampered';
    }

    // Check expiration
    if (Date.now() > expiresAt) {
        throw 'Token expired';
    }

    return true;
}
```

### Why HMAC Security Matters

**Without HMAC tokens:**
- User could modify `instanceId` in URL to approve different transaction
- User could extend `expiresAt` to use expired link
- User could change `action` from "approve" to something else
- Malicious user could brute-force URLs

**With HMAC tokens:**
- Any URL modification breaks token signature → validation fails
- Token includes expiration timestamp → cannot extend validity
- Secret key never exposed in URL → cannot forge tokens
- Each token unique per instance/action/expiration combination

### Defense in Depth

Tokens are validated **twice** for security:

1. **Public Suitelet (SL_GNL_EmailApproval):**
   - First validation before queuing
   - Prevents invalid requests from entering system
   - Shows error page immediately

2. **Scheduled Script (SS_GNL_ApprovalQueue):**
   - Second validation before processing
   - Defense against queue record manipulation
   - Ensures tokens still valid at processing time

### Token Expiration

- Default expiration: **7 days** from email sent
- After expiration: "This approval link has expired" error page
- User must request new approval link or approve via NetSuite UI
- Configurable in Settings record (future enhancement)

---

## Audit Trail

### Immutable Log Entries

Every action logged in Approval Log (`customrecord_gnl_approval_log`):

- **Who** performed the action (employee ID + name)
- **When** (timestamp with timezone)
- **What** action (Submitted, Approved, Rejected, Escalated, etc.)
- **Comments/reason** (approval notes, rejection reason)
- **IP address** (for email approvals)
- **Old value / New value** (for configuration changes)

**Logs are immutable:** Once created, never updated or deleted (SOX requirement)

### Log Entry Types

#### 1. Approval Actions
- Submitted, Approved, Rejected, Escalated, Delegated
- Captures: actor, datetime, comments, hours_to_action
- Links to: transaction, instance, rule, step

#### 2. Configuration Changes
- Rule Modified, Step Modified, Settings Changed
- Captures: record type, record ID, field name, old/new values (internal + display)
- Links to: changed record, actor

#### 3. Exception Detection
- All exception types (self-approval, late, amount changed, etc.)
- Captures: exception type, severity, detection datetime
- Links to: instance, transaction

#### 4. Escalation Events
- Timeout escalation, manual escalation, SOD conflict
- Captures: escalation type, original assignee, new assignee
- Links to: instance, transaction

### Audit Trail Query Examples

**Find all approvals by user:**
```javascript
search.create({
    type: 'customrecord_gnl_approval_log',
    filters: [
        ['custrecord_gnl_log_actor', 'is', employeeId],
        'AND',
        ['custrecord_gnl_log_action', 'is', 'Approved']
    ],
    columns: ['custrecord_gnl_log_datetime', 'custrecord_gnl_log_transaction', 'custrecord_gnl_log_comments']
});
```

**Find all configuration changes to rule:**
```javascript
search.create({
    type: 'customrecord_gnl_approval_log',
    filters: [
        ['custrecord_gnl_log_change_type', 'is', 'Rule Modified'],
        'AND',
        ['custrecord_gnl_log_record_id', 'is', ruleId]
    ],
    columns: ['custrecord_gnl_log_datetime', 'custrecord_gnl_log_field_name', 'custrecord_gnl_log_old_value_display', 'custrecord_gnl_log_new_value_display']
});
```

**Find all exceptions for transaction:**
```javascript
search.create({
    type: 'customrecord_gnl_approval_log',
    filters: [
        ['custrecord_gnl_log_transaction', 'is', transactionId],
        'AND',
        ['custrecord_gnl_log_is_error', 'is', 'T']
    ],
    columns: ['custrecord_gnl_log_datetime', 'custrecord_gnl_inst_exception_type', 'custrecord_gnl_inst_exception_severity', 'custrecord_gnl_log_comments']
});
```

### SOX Compliance Features

1. **Immutable Logs:** Never updated or deleted after creation
2. **Complete Audit Trail:** Every action logged with who/when/what
3. **Configuration Change Tracking:** All rule/step/settings changes logged
4. **Exception Detection:** SOD violations, late approvals, amount changes flagged
5. **Material Change Detection:** GL-impacting changes trigger re-approval
6. **Segregation of Duties:** Self-approval detection and prevention
7. **Generation Tracking:** Resubmission history preserved

---

## Technical Debt & Future Enhancements

### Known Issues

1. **Large Group Email Sending:** May hit governance limits with 50+ member groups
   - Solution: Queue-based architecture helps, monitoring needed for high-volume groups
   - Status: Basic implementation complete, comprehensive testing pending

2. **Mobile Email Rendering:** Not fully tested on all email clients
   - Solution: Comprehensive email client testing (Gmail, Outlook, Apple Mail, mobile)
   - Status: Basic testing done, comprehensive testing pending

3. **Queue Processing Monitoring:** Need dashboard for queue status visibility
   - Solution: Create saved search or dashboard showing pending/completed/failed queue records
   - Status: Queue records exist, monitoring UI not yet built

### Performance Optimizations

1. **Cache email template lookups** (currently loads template on every email send)
2. **Batch approval log creation** (currently one at a time)
3. **Lazy-load approval tray** on transaction forms (currently loads on pageInit)

### Security Enhancements

1. **Rate limiting** on email approval links (prevent brute force token guessing)
2. **Audit log export** for compliance reviews (CSV/PDF download)
3. **IP whitelist** for email approvals (optional enterprise feature)

---

**Next:** See [Email System](07-email-system.md) for template architecture and placeholder system.
