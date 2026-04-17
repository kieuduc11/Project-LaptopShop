import { Request, Response, NextFunction } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
        res.redirect("/");
    } else {
        next();
    }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // apply only to admin
    if (req.path.startsWith("/admin/")) {
        const user = req.user;
        if (user?.role?.name === "ADMIN") {
            return next();
        }
        return res.render("status/403.ejs");
    }

    // client route
    return next();
};

export { isLogin, isAdmin }