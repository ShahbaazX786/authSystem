import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized - No Token Was Provided" })
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) return res.status(401).json({ success: false, message: 'Unauthorized - Invalid Token Found' })
        req.userId = decodedToken.userId;
        next()
    } catch (error) {
        console.log('Error in Verifying Token', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
    next()
}