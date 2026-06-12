# TASKS.md — Thapar Placement Tracker

> Critical Rule for AI Coding Agents:
>
> Pick exactly one incomplete task.
>
> Complete the task fully.
>
> Mark it complete.
>
> Stop.
>
> Do not start the next task automatically.

---

# Status Legend

[ ] Not Started

[~] In Progress

[x] Complete

[!] Blocked

---

# Component Ownership

[SHARED]

[AUTH]

[COMPANY]

[DASHBOARD]

[ELIGIBILITY]

[CALENDAR]

[DISCUSSION]

[RESOURCE]

[ADMIN]

---

# Phase 0 — Foundation

Goal:

Create project structure.

Establish frontend and backend communication.

MongoDB connection working.

---

## Shared

### [ ] P0-S1 [SHARED]

Create repository structure.

Frontend

```text
client/
```

Backend

```text
server/
```

Required folders:

Frontend

```text
src/
pages/
components/
layouts/
hooks/
services/
contexts/
```

Backend

```text
src/
controllers/
models/
routes/
middlewares/
services/
sockets/
utils/
```

Acceptance Criteria

* Project boots successfully
* Folder structure exists
* No build errors

---

### [ ] P0-S2 [SHARED]

Setup MongoDB Atlas.

Create:

```text
config/db.js
```

Responsibilities:

* Establish connection
* Log success
* Log failure

Acceptance Criteria

* Database connects successfully
* Connection failure handled

---

### [ ] P0-S3 [SHARED]

Create environment configuration.

Backend Variables

```text
PORT
MONGO_URI
JWT_SECRET
CLIENT_URL
NODE_ENV
```

Acceptance Criteria

* Variables loaded correctly
* App crashes if required variable missing

---

### [ ] P0-S4 [SHARED]

Configure Axios instance.

Create:

```text
client/src/services/api.js
```

Responsibilities

* Base URL
* Credentials support
* Global error interceptor

Acceptance Criteria

* All API calls use shared instance

# Phase 0.5 — UI Blueprint & Navigation Skeleton

Goal

Build the complete frontend structure using reference images.

No backend integration.

No API calls.

Use mock data only.

---

Purpose

Before writing any business logic:

* All routes exist
* All pages exist
* Navigation works
* Layout is finalized
* UI matches reference images

This phase creates a visual MVP.

---

## UI References

Source of Truth

```text
docs/images/

dashboard.png
placement-updates.png
eligibility-simulator.png
placement-calendar.png
discussion-hub.png
resources.png
```

---

## Layout System

### [ ] P0.5-U1 [SHARED]

Create Main Layout.

Reference

All images.

Components

```text
Sidebar

Top Navbar

Content Area
```

Acceptance Criteria

* Responsive
* Shared across pages

---

### [ ] P0.5-U2 [SHARED]

Create Sidebar Navigation.

Links

```text
Dashboard

Placement Updates

Eligibility Simulator

Placement Calendar

Discussion Hub

Interview Resources
```

Acceptance Criteria

* Active route highlighted
* Navigation works

---

### [ ] P0.5-U3 [SHARED]

Create Route Structure.

Routes

```text
/

/dashboard

/placement-updates

/eligibility-simulator

/placement-calendar

/discussion

/resources

/company/:slug
```

Acceptance Criteria

* Every route renders page

---

## Dashboard

### [ ] P0.5-D1 [DASHBOARD]

Create Dashboard Page.

Reference

```text
docs/images/dashboard.png
```

Acceptance Criteria

* Page structure complete

---

### [ ] P0.5-D2 [DASHBOARD]

Create Statistics Cards.

Mock Data

```text
Total Companies
```

Acceptance Criteria

* Matches image

---

### [ ] P0.5-D3 [DASHBOARD]

Create Latest Placement Updates Table.

Mock Data Only.

Acceptance Criteria

* Column structure complete

---

### [ ] P0.5-D4 [DASHBOARD]

Create Notices Widget.

Mock Data Only.

Acceptance Criteria

* Matches image

---

### [ ] P0.5-D5 [DASHBOARD]

Create Mini Eligibility Widget.

Mock Data Only.

Acceptance Criteria

* Matches image

---

## Placement Updates

### [ ] P0.5-P1 [COMPANY]

Create Placement Updates Page.

Reference

```text
docs/images/placement-updates.png
```

Acceptance Criteria

* Layout complete

---

### [ ] P0.5-P2 [COMPANY]

Create Search Bar.

Mock Data.

Acceptance Criteria

* UI only

---

### [ ] P0.5-P3 [COMPANY]

Create Filters Section.

Mock Data.

Filters

```text
Role

Type

Branch
```

Acceptance Criteria

* Layout complete

---

### [ ] P0.5-P4 [COMPANY]

Create Placement Table.

Mock Rows.

Acceptance Criteria

* Matches image

---

## Eligibility Simulator

### [ ] P0.5-E1 [ELIGIBILITY]

Create Eligibility Page.

Reference

```text
docs/images/eligibility-simulator.png
```

Acceptance Criteria

* Layout complete

---

### [ ] P0.5-E2 [ELIGIBILITY]

Create Input Section.

Fields

```text
Internal CGPA

Branch
```

Acceptance Criteria

* Inputs visible

---

### [ ] P0.5-E3 [ELIGIBILITY]

Create Results Section.

Sections

```text
Eligible

Near Eligible

Not Eligible
```

Acceptance Criteria

* Mock cards rendered

---

## Placement Calendar

### [ ] P0.5-C1 [CALENDAR]

Create Calendar Page.

Reference

```text
docs/images/placement-calendar.png
```

Acceptance Criteria

* Layout complete

---

### [ ] P0.5-C2 [CALENDAR]

Create Calendar Grid.

Mock Events.

Acceptance Criteria

* Month view visible

---

## Discussion Hub

### [ ] P0.5-H1 [DISCUSSION]

Create Discussion Hub Page.

Reference

```text
docs/images/discussion-hub.png
```

Acceptance Criteria

* Layout complete

---

### [ ] P0.5-H2 [DISCUSSION]

Create Company Sidebar.

Mock Companies.

Acceptance Criteria

* Sidebar visible

---

### [ ] P0.5-H3 [DISCUSSION]

Create Chat Window.

Mock Messages.

Acceptance Criteria

* Chat UI complete

---

### [ ] P0.5-H4 [DISCUSSION]

Create Message Input.

Acceptance Criteria

* Input visible

---

## Interview Resources

### [ ] P0.5-R1 [RESOURCE]

Create Resources Page.

Reference

```text
docs/images/resources.png
```

Acceptance Criteria

* Layout complete

---

### [ ] P0.5-R2 [RESOURCE]

Create Resources Table.

Mock Data.

Columns

```text
Company

Role

Interview Questions
```

Acceptance Criteria

* Table complete

---

### [ ] P0.5-R3 [RESOURCE]

Create View Questions Button.

Mock Action.

Acceptance Criteria

* Button visible

---

## UI Validation

### [ ] P0.5-V1 [SHARED]

Desktop Audit.

Acceptance Criteria

* Matches all images

---

### [ ] P0.5-V2 [SHARED]

Tablet Audit.

Acceptance Criteria

* No broken layouts

---

### [ ] P0.5-V3 [SHARED]

Mobile Audit.

Acceptance Criteria

* Sidebar collapses correctly

---

Deliverable

Complete frontend prototype.

Every page accessible.

Every layout implemented.

All images reproduced.

No backend required.

---

# Phase 1 — Database Layer

Goal

Define all schemas before building APIs.

---

## Users

### [ ] P1-U1 [AUTH]

Create User Schema.

Fields

```js
name
email
password
role
createdAt
```

Validation

* Email required
* Password required
* Role default user

Acceptance Criteria

* User document saves successfully

---

## Companies

### [ ] P1-C1 [COMPANY]

Create Company Schema.

Fields

```js
name
slug
role
type
stipend
package
normalCutoff
internalCutoff
branches
createdAt
```

Acceptance Criteria

* Company document saves successfully

---

### [ ] P1-C2 [COMPANY]

Create slug generation middleware.

Example

```text
Adobe
```

becomes

```text
adobe
```

Acceptance Criteria

* Unique slug generated

---

## Notices

### [ ] P1-N1 [CALENDAR]

Create Notice Schema.

Fields

```js
companyId
noticeDate
createdAt
```

Acceptance Criteria

* Notice saved successfully

---

## Resources

### [ ] P1-R1 [RESOURCE]

Create Resource Schema.

Fields

```js
companyId
role
interviewLink
```

Acceptance Criteria

* Resource saved successfully

---

## Discussions

### [ ] P1-D1 [DISCUSSION]

Create Discussion Schema.

Fields

```js
companyId
type
```

Allowed Types

```text
oa
interview
```

Acceptance Criteria

* Invalid types rejected

---

### [ ] P1-D2 [DISCUSSION]

Create Message Schema.

Fields

```js
discussionId
senderId
message
createdAt
```

Acceptance Criteria

* Message stored successfully

---

# Phase 2 — Authentication

Goal

Protect Discussion and Resource modules.

---

### [ ] P2-A1 [AUTH]

Create password hashing utility.

Use bcrypt.

Acceptance Criteria

* Password never stored in plain text

---

### [ ] P2-A2 [AUTH]

Create Register API.

Route

```text
POST /auth/register
```

Request

```json
{
"name":"Krishan",
"email":"abc@thapar.edu",
"password":"password"
}
```

Validation

* Must end with @thapar.edu

Acceptance Criteria

* User created successfully

---

### [ ] P2-A3 [AUTH]

Create Login API.

Route

```text
POST /auth/login
```

Acceptance Criteria

* JWT generated
* HTTP Only cookie set

---

### [ ] P2-A4 [AUTH]

Create Current User API.

Route

```text
GET /auth/me
```

Acceptance Criteria

* Returns logged-in user

---

### [ ] P2-A5 [AUTH]

Create Logout API.

Route

```text
POST /auth/logout
```

Acceptance Criteria

* Cookie removed

---

### [ ] P2-A6 [AUTH]

Create Auth Middleware.

Responsibilities

* Verify JWT
* Attach user to request

Acceptance Criteria

* Protected routes inaccessible without token

---

# Phase 3 — Company Module

Goal

Build company management APIs.

---

### [ ] P3-C1 [COMPANY]

Create Company Service Layer.

Functions

```text
createCompany
updateCompany
deleteCompany
getCompany
getCompanies
```

Acceptance Criteria

* Business logic isolated from routes

---

### [ ] P3-C2 [COMPANY]

Create Create Company API.

Route

```text
POST /companies
```

Admin Only.

Acceptance Criteria

* Company inserted into database

---

### [ ] P3-C3 [COMPANY]

Create Update Company API.

Route

```text
PUT /companies/:id
```

Acceptance Criteria

* Existing company updated

---

### [ ] P3-C4 [COMPANY]

Create Delete Company API.

Route

```text
DELETE /companies/:id
```

Acceptance Criteria

* Company removed

---

### [ ] P3-C5 [COMPANY]

Create Get All Companies API.

Route

```text
GET /companies
```

Acceptance Criteria

* Paginated results returned

---

### [ ] P3-C6 [COMPANY]

Implement Search.

Query Params

```text
?search=adobe
```

Acceptance Criteria

* Partial matches work

---

### [ ] P3-C7 [COMPANY]

Implement Filters.

Supported

```text
role
type
branch
```

Acceptance Criteria

* Filters combine correctly

---

# Phase 4 — Dashboard

Goal

Build homepage.

---

### [ ] P4-D1 [DASHBOARD]

Create Dashboard Layout.

Sections

* Statistics
* Placement Updates
* Notices
* Eligibility Widget

Acceptance Criteria

* Responsive layout complete

---

### [ ] P4-D2 [DASHBOARD]

Create Total Companies Card.

Source

Companies Collection

Acceptance Criteria

* Count displayed correctly

---

### [ ] P4-D3 [DASHBOARD]

Create Latest Placement Updates Table.

Columns

```text
Company
Role
Type
Stipend
Package
Normal Cutoff
Internal Cutoff
Branches
Discussion
```

Acceptance Criteria

* Data fetched dynamically

---

### [ ] P4-D4 [DASHBOARD]

Create Discussion Link Column.

Behavior

Redirect

```text
/discussion/:companySlug
```

Acceptance Criteria

* Redirect works correctly

---

### [ ] P4-D5 [DASHBOARD]

Create Upcoming Notices Widget.

Display

```text
Company
Notice Released
Date
```

Acceptance Criteria

* Sorted by newest notice

---

### [ ] P4-D6 [DASHBOARD]

Create Mini Eligibility Widget.

Inputs

```text
Internal CGPA
Branch
```

Acceptance Criteria

* Preview eligibility count shown

This is already much closer to the engineering-task style of your NexGen repo. The next half (Phases 5–10) should cover:

Eligibility Engine
Placement Calendar
Discussion Hub (Socket.io)
Interview Resources
Admin Panel
Deployment & Hardening

with another ~30–40 atomic tasks.