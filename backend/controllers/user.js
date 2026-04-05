import { prisma } from '../lib/prisma.js'

// Fetches the authenticated user's profile from the database
// Uses req.auth.userId injected by the auth middleware — no need for URL params
// Explicitly selects only safe fields — never expose the password hash
// Returns 404 if the user no longer exists, 500 for unexpected errors
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.auth.userId },
            select: {
                id: true,
                username: true,
                createdAt: true,
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User does not exist '});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};