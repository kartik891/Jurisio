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

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.use('/', router);
// Global error handler to return JSON errors


app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
})