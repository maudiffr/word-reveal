import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// Hashes the password and creates a new user in the database
// Returns 400 if the username is already taken (Prisma P2002 unique constraint)
// Returns 500 for any other server error
export const signup = async (req, res, next) => {
    try {
        const username = req.body.username?.trim();
        const password = req.body.password?.trim();
        if (!username || !password) {
            return res.status(400).json({ error: 'Missing username or password' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        await prisma.user.create({
            data: {
                password: hash,
                username: req.body.username,
            }
        });
        res.status(201).json({ message: 'User created successfully!' })
    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'User already taken' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Looks up the user by username, verifies the password with bcrypt
// Returns the same error message whether the user doesn't exist or the password is wrong
// This avoids leaking information about which usernames exist in the database
// If valid, returns the userId and a signed JWT token (24h expiry)
export const login = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: req.body.username }
        });
        if (user === null) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({
            userId: user.id,
            token: jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};