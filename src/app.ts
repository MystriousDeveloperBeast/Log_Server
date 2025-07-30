import express from 'express';
import logRoutes from './routes/log.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import './database/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/logs', logRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
