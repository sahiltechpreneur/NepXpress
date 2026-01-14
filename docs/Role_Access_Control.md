# Role-Based Access Control (RBAC)

Roles:
- Admin
- Customer
- Staff

Middleware:
- verifyToken → checks JWT
- allowRoles → restricts routes

Usage:
allowRoles('admin')
allowRoles('admin', 'staff')

## Admin Permissions

- View all couriers
- Update courier status
- Monitor system operations
