import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
import axios from 'axios';
=======
import router from './routes/expressRoutes.js';
>>>>>>> 574a468b6829ea08bc1280dc904ef7240e344ec0

const PORT = 8000;
const app = express();
const corsOptions = {
    origin : ['http://localhost:5173']
}
<<<<<<< HEAD
app.use(express.json());
app.use(cors(corsOptions));


app.post('/api', (req, res)=>{
    const {data} = req.body;

    console.log("Text from the frontend", req.body);
    const response = `The text sent via the frontend: ${data}`;
    res.json({response});
})
=======

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors(corsOptions));

app.use('/', router);
>>>>>>> 574a468b6829ea08bc1280dc904ef7240e344ec0

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
})