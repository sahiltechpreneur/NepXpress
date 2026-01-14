# Authentication Flow – NepXpress

1. User registers via `/api/auth/register`
2. Password is hashed using bcrypt
3. User data stored in PostgreSQL
4. Welcome email sent
5. User logs in via `/api/auth/login`
6. JWT token generated
7. Token sent to client
8. Client sends token in Authorization header
9. Backend verifies token via middleware
