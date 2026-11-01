import express from 'express';
import { connectDB } from './src/config/mongo.config.js';
import dotenv from 'dotenv';
import shortUrlRoutes from './src/routes/shortUrl.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

dotenv.config();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/health', (_req, res) => {
  res.status(200).json({message:"Server is Healthy"});
});

app.use('/api/shortUrl/', shortUrlRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})