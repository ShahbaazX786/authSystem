import jwt from 'jsonwebtoken';
import { convertToReadableDateTime } from './dateHelpers.js';

export const refreshCurrentToken = (token, userId) => {
    jwt.verify(token, process.env.JWT_SECRET);

    const decoded = jwt.decode(token);
    if (!decoded || decoded.userId !== userId || !decoded.exp) {
        throw new Error("Invalid token payload");
    }

    const now = Math.floor(Date.now() / 1000);
    const tokenTimeLeft = decoded.exp - now;

    if (tokenTimeLeft <= 5 * 60) {
        const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        return { refreshed: true, token: newToken };
    }

    return { refreshed: false, token, tokenValidTill: convertToReadableDateTime(tokenTimeLeft) };
};