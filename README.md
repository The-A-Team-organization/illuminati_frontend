# README

## Illuminati Frontend

Illuminati Frontend is the client-side application of the multi-service Illuminati system, developed by The A-Team.
It provides an interactive map, authentication, voting, backup, and user management with distinct role-based access.

## Overview

The frontend is a React Single Page Application (SPA) that communicates with the backend via REST API.

The system represents an internal hierarchy-themed community where users have different roles — from regular Mason to Architect — each with specific permissions to interact with records, votes, and invitations.

## Core Technologies:

The frontend is built using React 18 and styled with CSS Modules and a custom theme.
Routing is managed with React Router DOM, while all HTTP communication is handled through Axios.
The interactive map relies on React Leaflet, and user authentication uses JWT tokens stored in localStorage.
The application runs in a Dockerized environment using docker-compose for container orchestration.

## Main Pages
- /entry → EntryPassword — Entry password screen for system access.

- /login / /register → Login, Register — User authentication and registration pages.

- /protected-home → ProtectedHome — Interactive map displaying all records.

- /vote → Vote — Page where users can participate in internal voting.

- /records → RecordsBackupRestore — Interface for backup and restore operations.

- /hall_of_fame → HallOfFame — Displays notable users in the Hall of Fame.

- /invite → Invite — Email-based user invitation system.

## Role System
Users have four access levels:

- Architect: Highest rank. Can manage records, invite new members, vote and try to communicate with retired architects.
- GoldenMason: Extended privileges. Can manage records, invite new members, vote.
- SilverMason: Can create and view records, vote.
- Mason (Regular):	Basic viewing and participation in votes.

## Interactive Map

The ProtectedHome component implements the main interactive experience using React Leaflet:

- Displays all records as map markers.

- Allows record creation with description, image, and type (UFO, Ghost, Bigfoot, etc.).

- Handles likes and updates via REST endpoints.

- Access to actions depends on the user’s role.

## Voting System

The /vote page provides the internal voting mechanism:

- Users can vote AGREE or DISAGREE on ongoing polls.

- Results are processed and stored via /api/votes/....

## Backup & Restore

The RecordsBackupRestore component provides:

- Download of record archives from the backend.

- Restore from previously saved backups.

## API Integration

Main backend endpoints used by the frontend:

- /api/authentific/entry/     → Entry password validation
- /api/authentific/login/     → User login
- /api/authentific/register/  → User registration
- /api/records/all            → Retrieve all records
- /api/records/create         → Create new record
- /api/records/{id}           → Record details
- /api/votes/...              → Voting system
- /api/hall_of_fame/...       → Hall of Fame
- /api/users/invite/          → User invitation

## Infrastructure Context

Illuminati Frontend is part of a multi-service ecosystem managed with Terraform.

- [illuminati_backend](https://github.com/The-A-Team-organization/illuminati_backend)	→ REST API & business logic (Python)
- [illuminati_email_service](https://github.com/The-A-Team-organization/illuminati_email_service)	→ Email delivery and password reset microservice (Go)
- [illuminati_scheduler_service](https://github.com/The-A-Team-organization/illuminati_scheduler_service)	→ Scheduled automation service (Go)
- [illuminati_iac](https://github.com/The-A-Team-organization/illuminati_iac) → Infrastructure (Terraform, Docker)
- [illuminati_frontend](https://github.com/The-A-Team-organization/illuminati_frontend)(This repository)  →	 the user interface (React)
