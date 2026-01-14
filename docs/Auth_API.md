# Authentication API – NepXpress

## Register
POST /api/auth/register
- name
- email
- password

## Login
POST /api/auth/login
- email
- password

Returns JWT token for authenticated requests.

## Courier APIs

### Create Courier
POST /api/couriers
Auth: Required

### Get My Couriers
GET /api/couriers/my
Auth: Required

