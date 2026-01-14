import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { sequelize } from './models';
import authRoutes from './routes/authRoutes';
import testRoutes from './routes/testRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

app.get('/', (req, res) => {
  res.send('NepXpress Backend Running');
});

// Socket.io example
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch((err) => console.error('DB connection error:', err));

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});
