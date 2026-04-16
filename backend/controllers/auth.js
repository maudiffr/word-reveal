import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { signupSchema, loginSchema } from '../lib/schemas.js'

// Hashes the password and creates a new user in the database
// Returns 400 if the username is already taken (Prisma P2002 unique constraint)
// Returns 500 for any other server error
export const signup = async (req, res, next) => {
    try {
        const result = signupSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues[0].message })
        }
        const { username, password } = result.data
        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                password: hash,
                username: username,
            }
        });
        res.status(201).json({
            userId: user.id,
            username: user.username,
            token: jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'User already taken' });
        }
        next(error);
    }
};

// Looks up the user by username, verifies the password with bcrypt
// Returns the same error message whether the user doesn't exist or the password is wrong
// This avoids leaking information about which usernames exist in the database
// If valid, returns the userId and a signed JWT token (24h expiry)
export const login = async (req, res, next) => {
    try {
        const result = loginSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues[0].message })
        }
        const user = await prisma.user.findUnique({
            where: { username: result.data.username }
        });
        if (user === null) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const valid = await bcrypt.compare(result.data.password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({
            userId: user.id,
            username: user.username,
            token: jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        next(error);
    }
};