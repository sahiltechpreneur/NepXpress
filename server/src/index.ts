import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { sequelize } from './models';
import authRoutes from './routes/authRoutes';
import testRoutes from './routes/testRoutes';
import courierRoutes from './routes/courierRoutes';
import paymentRoutes from './routes/paymentRoutes';
import reportRoutes from './routes/reportRoutes';
import { initSocket } from './socket';

dotenv.config();

const app = express();
const server = http.createServer(app);

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('NepXpress Backend Running');
});

/* Initialize Socket.io */
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* Database */
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch((err) => console.error('DB connection error:', err));

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});
