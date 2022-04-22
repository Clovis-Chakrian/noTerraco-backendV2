import 'dotenv/config';
import express from "express";
import routes from "./routes/routes";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(routes);
app.listen(process.env.PORT);