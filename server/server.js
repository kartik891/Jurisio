import express from 'express';
import cors from 'cors';
import axios from 'axios';

const PORT = 8000;
const app = express();
const corsOptions = {
    origin : ['http://localhost:5173']
}
app.use(express.json());
app.use(cors(corsOptions));


app.post('/api', (req, res)=>{
    const {data} = req.body;

    console.log("Text from the frontend", req.body);
    const response = `The text sent via the frontend: ${data}`;
    res.json({response});
})

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
})