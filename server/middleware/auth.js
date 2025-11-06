const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authMiddleware = async (req, res, next) => {
    // For development: check if we want to bypass auth
    if (process.env.NODE_ENV !== 'production') {
        console.log('Auth middleware: Development mode - bypassing authentication');
        return next();
    }

    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({ error: 'Authentication required.' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-development-secret');
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).send({ error: 'Authentication required.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).send({ error: 'Authentication required.' });
    }
};

module.exports = authMiddleware;