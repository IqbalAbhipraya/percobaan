const authorize = (requiredRoles = []) => {
    return (req, res, next) => {
        const role = req.user?.role;

        if (!role) {
            return res.status(401).json({
                status: "fail",
                statusCode: 401,
                message: "Unauthorized",
            });
        }

        if (requiredRoles.length === 0) return next();

        const hasAccess = requiredRoles.includes(role);
        if (!hasAccess) {
            return res.status(403).json({
                status: "fail",
                statusCode: 403,
                message: "Akses ditolak. Anda tidak memiliki izin.",
            });
        }
        
        return next();
    }
}

module.exports = authorize;