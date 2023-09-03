import 'dotenv/config';
import express from "express";
import http from "http";
import routes from "./routes/routes";
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('hasUpdated', () => {
    io.emit('update');
  });
});

app.use(cors({
  origin: '*'
}));
app.use(express.json({ limit: '50mb' }));
app.use(routes);

httpServer.listen(process.env.PORT || 3333);