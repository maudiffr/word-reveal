import { prisma } from '../lib/prisma.js'
import { updateStatsSchema } from '../lib/schemas.js'

// Fetches the authenticated user's profile from the database
// Uses req.auth.userId injected by the auth middleware, no need for URL params
// Explicitly selects only safe fields, never expose the password hash
// Returns 404 if the user no longer exists, 500 for unexpected errors
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.auth.userId },
            select: {
                id: true,
                username: true,
                createdAt: true,
                gamesPlayed: true,
                gamesWon: true,
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User does not exist '});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Fetches all users ordered by gamesWon descending for the leaderboard
// Public routes, no auth required
// Returns 500 for unexpected errors
export const getLeaderboard = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                username: true,
                gamesPlayed: true,
                gamesWon: true,
            },
            orderBy: { gamesWon: 'desc' },
        })
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// Updates the authenticated user's stats at the end of a game
// Increments gamesPlayed always, gamesWon only if won is true
// Returns 400 if won is not a boolean, 500 for unexpected errors
export const updateStats = async (req, res, next) => {
    try {
        const result = updateStatsSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues[0].message })
        }
        const { won } = result.data
        await prisma.user.update({
            where: { id: req.auth.userId },
            data: {
                gamesPlayed: { increment: 1 },
                ...(won && { gamesWon: { increment: 1 }}),
            },
        })
        res.sendStatus(200)
    } catch (error) {
        next(error);
    }
}