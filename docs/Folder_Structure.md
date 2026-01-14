# Project Folder Structure – NepXpress

## Root
nepxpress/
- client/ → Next.js frontend
- server/ → Node.js backend
- docs/ → Project documentation

## Client
client/
- app/ → Next.js app router
- components/ → Reusable UI components
- styles/ → Global styles
- utils/ → Helper functions

## Server
server/
- src/controllers/ → Business logic
- src/models/ → Sequelize models
- src/routes/ → API routes
- src/services/ → Email, payment, reports
- src/middlewares/ → Auth & role middleware
- src/index.ts → Server entry point
