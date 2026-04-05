import express from 'express'
import { signup, login } from '../controllers/auth.js'

// express.Router() creates a modular, mountable route handler — plugged into app.js via app.use()
const router = express.Router();

// Auth routes — all public, no middleware required
// signup and login are the entry points that generate JWT tokens
router.post('/signup', signup);
router.post('/login', login);

export default router;