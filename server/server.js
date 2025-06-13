import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

connectDB();
connectCloudinary();

const app=express();
app.use(cors({
  origin: "https://regal-retreat-solving.vercel.app", // 👈 your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));  //Enable Cross-Origin Resourse Sharing

// API to listen to Stripe Webhooks
app.post('/api/stripe',express.raw({type:"application/json"}),stripeWebhooks)

app.use(express.json()); //Parse JSON bodies
app.use(clerkMiddleware()) //Middleware to authenticate Clerk users

app.use("/api/clerk",clerkWebhooks)


app.get('/',(req,res)=>res.send("API is working fine"))
app.use('/api/user',userRouter);
app.use('/api/hotels',hotelRouter);
app.use('/api/rooms',roomRouter);
app.use('/api/bookings',bookingRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`))