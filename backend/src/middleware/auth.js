const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * Middleware to verify JWT token
 */
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Failed to authenticate token' });
    }
};

/**
 * Middleware to check user roles
 * @param {string[]} allowedRoles - List of roles permitted to access the route
 */
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied: insufficient permissions' });
        }
        next();
    };
};

const isAdmin = checkRole(['admin']);

module.exports = { verifyToken, checkRole, isAdmin };
