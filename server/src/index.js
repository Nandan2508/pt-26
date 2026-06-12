require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Verify required environment variables
const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'CLIENT_URL', 'NODE_ENV'];
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error(`FATAL ERROR: Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const eligibilityRoutes = require('./routes/eligibilityRoutes');
const noticeRoutes = require('./routes/noticeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Security Middlewares
app.use(cors({
  origin: function (origin, callback) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    // Allow if no origin (e.g. mobile apps, curl), exactly matches clientUrl, or is any vercel.app domain
    if (!origin || origin === clientUrl || origin.endsWith('.vercel.app') || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per window
  message: 'Too many requests from this IP, please try again later.'
});

app.use(apiLimiter);

// Routes
app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/eligibility', eligibilityRoutes);
app.use('/notices', noticeRoutes);

app.get('/', (req, res) => {
  res.send('Thapar Placement Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
