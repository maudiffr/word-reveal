import express from 'express'
import { getUserProfile } from '../controllers/user.js'
import auth from '../middleware/auth.js'

// express.Router() creates a modular, mountable route handler — plugged into app.js via app.use()
const router = express.Router();

// Auth middleware is applied per route — only protected routes require a valid JWT
router.get('/profile', auth, getUserProfile);

export default router;