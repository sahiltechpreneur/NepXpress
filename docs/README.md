# NepXpress Documentation

This folder contains all technical documentation for the NepXpress
Courier Management System.

## Contents
- Database setup
- User model
- Authentication & authorization
- Email service
- Folder structure
- ER diagram
- Authentication flow

This documentation is maintained alongside the codebase.

## Real-Time Events (Socket.io)

Event: courier-status-updated  
Payload:
- courierId
- status

## Frontend Real-Time Integration

- Socket.io client
- Global listener via layout
- Event: courier-status-updated

## Courier Tracking

- Public tracking page: /track
- Track by tracking number
- Real-time status updates using Socket.io

## Payment System

- Payment Gateway: eSewa
- Payment per courier
- Status updated on success callback

## Reports

- Admin payment reports
- Excel (.xlsx)
- PDF (.pdf)
- Secure admin-only access

## Admin Dashboard

- URL: /admin/dashboard
- Shows courier & payment stats
- Download Excel and PDF reports

## Authentication & Roles

- JWT-based auth
- Role-based route protection
- Admin & Customer layouts
- Login page: /login
- JWT stored in localStorage