# PostgreSQL Setup for NepXpress

1. Install PostgreSQL
2. Create database: nepxpress
3. Configure `.env` in server folder:
   - DB_HOST
   - DB_USER
   - DB_PASSWORD
   - DB_NAME
   - DB_PORT
4. Sequelize connects to PostgreSQL via `src/models/index.ts`
