import { asyncHandler } from "../utilities/asyncHandler.utility.js"
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.replace('Bearer ', '') : null);

    if (!token) {
        return next(new errorHandler("Unauthorized access, no token provided", 401));
    }
    
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenData;
        next();
    } catch (error) {
        return next(new errorHandler("Invalid or expired token", 401));
    }
})