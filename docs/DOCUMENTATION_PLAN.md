# Greenlight Approvals – Documentation Plan

**Last Updated:** November 5, 2025  
**Owner:** Greenlight Product & Documentation Team  
**Purpose:** Central checklist for in-flight and upcoming documentation work that keeps the product install-ready and demo-ready.

---

## 📌 Active Priorities

### 1. Phase 5 Reporting Wrap-Up
- **Saved Search Catalog Notes** – Author a short guide that explains the new Phase 5 saved searches (`GNL || My Pending Approvals`, `GNL || My Pending – Overdue`, `GNL || All Pending`, delegation views, requestor views). Include where they live, filters to tweak, and how to clone for subsidiaries.  
  - **Target Location:** `docs/TECHNICAL_REFERENCE.md` (Reporting section) with cross-link in `docs/PROJECT_STATUS.md`.
- **Dashboard & Center Tab Setup** – ✅ Completed 2025-11-05. Added guidance to `docs/TECHNICAL_REFERENCE.md` (“Phase 5 Dashboards & Saved Searches”).

### 2. Admin Field Guide & Search Templates (New from Claude Plan)
- Build a **task-based “Admin Field Guide”** that moves admins from copy/paste templates to customization without overwhelming them.  
  - **Part 1 – Quick Start:** 5 turnkey searches (My Pending, Late Approvals, Approval History 30 days, Exceptions, Approver Performance).  
  - **Part 2 – Template Library:** 10-12 documented searches with purpose, filters, columns, customization ideas, and screenshots.  
  - **Part 3 – Field Guide by Category:** Organize approval instance fields into Core, Timing/Performance, Exceptions, Audit Trail, System.  
  - **Part 4 – Visual Map & “I Want To…” Index:** Diagram relationships and map common tasks to templates.  
  - **Appendix:** Alphabetical reference with internal IDs for power users.
- **Implementation Phases:**  
  1. **MVP (8-10 hrs):** Draft quick start, export existing searches, outline categories, create index & field map.  
  2. **Polish (4-6 hrs):** Add screenshots, example outputs, formatting, peer review, generate PDF.  
  3. **Optional Videos (8-12 hrs):** 4 short screencasts (First Search, Customizing Templates, Performance Reporting, Exception Reporting).
- **Deliverables & Placement:**  
  - Primary guide published under `docs/TECHNICAL_REFERENCE.md` or new `docs/ADMIN_FIELD_GUIDE.md` (decision pending).  
  - Template CSV/SDF bundle references added to installation guide.  
  - Update `PROJECT_STATUS.md` Phase 5 notes once guide ships.
- **Success Metrics:** Admin builds first search in <15 minutes, template usage >80%, reduced support tickets (“which field do I use?”).

### 3. Email Reminders (Backlog Coordination)
- Capture requirements for branded daily reminder emails (approver + requestor digests) so implementation can reference a ready-to-send brief.  
  - **Status:** Backlog item tracked in `BACKLOG.md` (“Branded Daily Reminder Emails”).  
  - **Documentation To-Do:** Once design is locked, add admin setup + sample template to `EMAIL_NOTIFICATIONS_DESIGN.md`.

---

## 📚 Planned Follow-Ups
- **Audit Package Modularization** – When the modular audit report registry ships, update the Audit Package documentation to explain how to add/remove reports via custom records (link to new admin guide).  
- **Budget Snapshot Reference** – Expand the budget integration section with screenshots and glossary once Phase 6 Actual validation is confirmed.
- **Search Builder Assistant** – Lightweight 3-page “wizard” that complements the field guide (checkbox flows, common filters, grouping tips). Can live as appendix or net-new doc post-field-guide.
- **Video Tutorials** – Revisit optional screencasts post-MVP; note topics in appendix so scripts are ready when we record.

---

## ✅ Recently Completed / No Action Needed
- Documentation index and architecture guides already live in `/docs`; no relocation required.
- Phase 5 dashboard/center-tab setup documented in `docs/TECHNICAL_REFERENCE.md` (2025-11-05).
- Email notification core workflow (Phase 7A) documented in `EMAIL_NOTIFICATIONS_DESIGN.md`; only new reminders remain outstanding.

---

## 📥 How to Use This Plan
- Treat this file as the single source for upcoming documentation work.  
- Update the “Last Updated” date and check off bullets as deliverables publish.  
- When new features enter development, add documentation tasks here first, then create or update the corresponding doc files.
