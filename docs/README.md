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
