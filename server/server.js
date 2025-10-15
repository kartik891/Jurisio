import express from 'express';
import cors from 'cors';
import router from './routes/expressRoutes.js';

const PORT = 8000;
const app = express();
const corsOptions = {
    origin : ['http://localhost:5173']
}

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors(corsOptions));

app.use('/', router);

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
})