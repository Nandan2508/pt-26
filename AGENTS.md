# AGENTS.md — Thapar Placement Tracker (Unofficial)

> Read this file first.
>
> Every contributor, AI coding agent, and developer must follow the contracts, rules, and architecture defined in this document.
>
> TASKS.md extends this document and must not contradict it.

---

# 1. Project Vision

Thapar Placement Tracker is an unofficial placement intelligence platform built specifically for students of Thapar Institute of Engineering and Technology (TIET).

The goal is to provide a centralized platform where students can:

* Track placement opportunities
* View company eligibility requirements
* Explore company-specific placement information
* View placement notice history
* Participate in company discussions
* Access interview question resources

The platform is not intended to replace existing preparation platforms such as TietPrep.

Instead, it acts as a central hub for:

* Placement updates
* Eligibility analysis
* Placement notice tracking
* Student discussions
* Interview resource aggregation

---

# 2. User Types

## Guest User

No authentication required.

Can:

* View Dashboard
* View Placement Updates
* View Company Details
* View Placement Calendar
* Use Eligibility Simulator

Cannot:

* Join Discussions
* Send Messages
* Access Interview Resources

---

## Authenticated User

Must register using a valid TIET email.

Can:

* Join Discussions
* Send Messages
* Access Interview Resources
* Edit own profile

Cannot:

* Manage Companies
* Manage Resources
* Manage Notices

---

## Admin

Full platform access.

Can:

* Create Company Records
* Edit Company Records
* Delete Company Records
* Create Notices
* Manage Resources
* Moderate Discussions
* Remove Messages

---

# 3. Product Scope

The platform contains six primary modules.

| Module                | Purpose                  |
| --------------------- | ------------------------ |
| Dashboard             | Placement overview       |
| Placement Updates     | Company database         |
| Eligibility Simulator | Eligibility calculation  |
| Placement Calendar    | Notice history           |
| Discussion Hub        | Student discussions      |
| Interview Resources   | External interview links |

---

# 4. High Level Architecture

Frontend

React
TailwindCSS
React Router
Axios
Socket.io Client

Backend

Node.js
Express.js
Socket.io
JWT Authentication

Database

MongoDB Atlas

Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

---

# 5. Core Business Rules

## Rule 1

Placement data is maintained manually by admins.

The system does not scrape placement information.

---

## Rule 2

Interview questions are not hosted locally.

The platform only stores external links.

---

## Rule 3

Only authenticated users can access:

* Discussion Hub
* Interview Resources

All other modules remain public.

---

## Rule 4

Eligibility calculations are based on:

* Internal CGPA
* Branch

Normal cutoff is informational only.

---

## Rule 5

Calendar events represent:

Notice Released Dates

Only.

The platform does not track:

* OA Dates
* Interview Dates
* Result Dates

---

# 6. Application Routes

## Public Routes

```text
/
 /dashboard
 /placement-updates
 /placement-calendar
 /eligibility-simulator
 /company/:slug
```

## Protected Routes

```text
/discussion
/discussion/:companySlug
/resources
```

## Admin Routes

```text
/admin
/admin/companies
/admin/notices
/admin/resources
```

## Backend API Routes

```text
/auth/register
/auth/login
/auth/me
/auth/logout
/companies
/companies/:id
```

---

# 7. Database Contracts

## User

```json
{
  "_id": "ObjectId",
  "name": "Krishan Malhotra",
  "email": "abc@thapar.edu",
  "password": "hashed",
  "role": "user",
  "createdAt": "date"
}
```

role:

```text
user
admin
```

---

## Company

```json
{
  "_id": "ObjectId",
  "name": "Adobe",
  "slug": "adobe",
  "role": "SDE",
  "type": "Internship + FTE",
  "stipend": "100000",
  "package": "2400000",
  "normalCutoff": 8.0,
  "internalCutoff": 8.3,
  "branches": [
    "COE",
    "COPC",
    "ENC",
    "ECE"
  ],
  "createdAt": "date"
}
```

---

## Notice

```json
{
  "_id": "ObjectId",
  "companyId": "ObjectId",
  "noticeDate": "2026-07-20",
  "createdAt": "date"
}
```

---

## Resource

```json
{
  "_id": "ObjectId",
  "companyId": "ObjectId",
  "role": "SDE",
  "interviewLink": "https://..."
}
```

---

## Discussion Room

```json
{
  "_id": "ObjectId",
  "companyId": "ObjectId",
  "type": "oa"
}
```

type values:

```text
oa
interview
```

---

## Message

```json
{
  "_id": "ObjectId",
  "discussionId": "ObjectId",
  "senderId": "ObjectId",
  "message": "Anyone shortlisted?",
  "createdAt": "date"
}
```

---

# 8. Eligibility Engine

Input

```json
{
  "internalCGPA": 8.24,
  "branch": "COE"
}
```

---

Eligible

Conditions:

```text
internalCGPA >= internalCutoff

AND

branch exists in company.branches
```

---

Near Eligible

Conditions:

```text
difference <= 0.30
```

Example

Required:

8.50

Student:

8.25

Result:

Near Eligible

---

Not Eligible

Conditions

```text
difference > 0.30

OR

branch not allowed
```

---

# 9. Dashboard Requirements

Dashboard contains:

## Statistics Section

Cards

```text
Total Companies
```

Only.

No package analytics.

No offer analytics.

No placement statistics.

---

## Latest Placement Updates

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

Discussion redirects to:

```text
/discussion/:companySlug
```

---

## Upcoming Notices

Show recently released notices.

---

## Mini Eligibility Widget

Quick eligibility checker.

---

# 10. Placement Updates Module

Purpose

Master database of companies.

Features

* Search
* Pagination
* Sorting

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

---

# 11. Placement Calendar Module

Purpose

Track notice release dates.

Each event contains:

```text
Company
Notice Released
Date
```

No deadlines.

No OA schedules.

No interview schedules.

---

# 12. Discussion Hub

Authentication Required

Yes.

---

Every company contains:

```text
OA Discussion
Interview Discussion
```

Example Routes

```text
/discussion/adobe/oa

/discussion/adobe/interview
```

---

Realtime Messaging

Implemented using Socket.io.

Events

```text
join-room

send-message

receive-message

leave-room
```

Messages persist in MongoDB.

---

# 13. Interview Resources Module

Authentication Required

Yes.

Purpose

Store external interview resource links.

No content is hosted locally.

Table Columns

```text
Company
Role
Interview Questions
```

Button

```text
View Questions
```

Opens external resource in a new tab.

---

# 14. Authentication Rules

Registration requires:

```text
Name
Email
Password
```

Email validation:

```text
@thapar.edu
```

Only.

Admin accounts cannot be registered publicly. The first admin must be created using a database seeder script.

---

Authentication Method

JWT

Stored in HTTP Only Cookie.

---

Protected Routes

```text
/discussion

/resources
```

Only.

---

# 15. Security Rules

Passwords:

bcrypt hashed

---

Never store:

* Plain passwords
* JWT secrets
* Database credentials

inside source code.

Use environment variables.

---

# 16. Repository Layout

```text
placement-tracker/

AGENTS.md
TASKS.md

client/
server/

client/src
pages/
components/
layouts/
hooks/
services/
contexts/

server/src
controllers/
models/
routes/
middlewares/
services/
sockets/
utils/

config/
```

---

# 17. Development Rules For AI Coding Agents

1. Read AGENTS.md before TASKS.md.

2. Complete exactly one task at a time.

3. Mark completed tasks inside TASKS.md.

4. Do not start the next task automatically.

5. Every API must include validation.

6. Every database model requires validation.

7. Every public function must contain a docstring.

8. No business logic inside routes.

9. Use service layers for business logic.

10. Follow existing folder structure.

11. Do not introduce new database fields without updating AGENTS.md.

12. Do not introduce new routes without updating AGENTS.md.

