import express from 'express';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

// Create an Express application instance
// `app` will handle routes, middlewares, and all incoming HTTP requests
const app = express();

// List of allowed origins for CORS
// Only these frontends will be able to make requests to this API from a browser
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean);

// Global middleware to handle CORS headers
// This runs on every incoming request before reaching any route
// It dynamically checks the request origin and allows it only if it's in the whitelist
// The browser will use these headers to decide whether to allow or block the request
// 
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Built-in middleware to parse incoming JSON request bodies
// This allows to access request data via `req.body`
app.use(express.json());

// Health check
// Simple route to verify that the API is running correctly
// Useful for testing, monitoring, or deployment platforms
app.get('/', (req, res) => {
    res.json({ status: 'OK' });
});

// All auth routes are prefixed with /api/auth
// e.g. POST /api/auth/signup, POST /api/auth/login
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Global error handler middleware
// Catches any errors thrown in the app and returns a generic 500 response
// Prevents the server from crashing and avoids leaking sensitive details
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;