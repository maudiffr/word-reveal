import jwt from 'jsonwebtoken'

// Middleware that checks for a valid JWT in the Authorization header ("Bearer <token>")
// It extracts and verifies the token using the secret key
// If valid, the userId is attached to req.auth for use in protected routes
// If not, the request is rejected with a 401 Unauthorized response
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token missing or malformed' });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = { userId: decodedToken.userId };
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
             return res.status(401).json({ error: 'Token expired' });
        }
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default auth;