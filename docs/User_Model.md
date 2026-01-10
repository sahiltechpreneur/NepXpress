# User Model – NepXpress

Table: users
Columns:
- id: Primary Key
- name: string
- email: unique string
- password: hashed string
- role: enum('admin', 'customer', 'staff')
- createdAt, updatedAt: timestamps

Initial Admin:
- email: admin@nepxpress.com
- password: Admin@123
