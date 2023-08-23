import jwt from 'jsonwebtoken';
import utils from '../utils/utils.js'

const secret_token = process.env.JWT_SECRET;

export const validateToken = () => {
    return (req, res, next) => {
        const token = utils.getBearerToken(req);
        if (token) {
            jwt.verify(token, secret_token, (err, data) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).json({ message: 'No token provided' });
        }
    }
}