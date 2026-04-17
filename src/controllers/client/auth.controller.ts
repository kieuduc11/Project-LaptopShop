import { NextFunction, Request, Response } from "express";
import { createUser } from "services/client/auth.service";
import { registerSchema } from "src/validation/auth.scheme";

const getLoginPage = (req: Request, res: Response) => {
    const { session } = req as any;
    const messages = session.messages || [];
    session.messages = [];
    res.render("client/auth/login.ejs", { messages });
};

const getRegisterPage = (req: Request, res: Response) => {
    const errors: string[] = [];
    const oldInput = {
        fullName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    };
    res.render("client/auth/register.ejs", { errors, oldInput });
};

const postRegister = async (req: Request, res: Response) => {
    const { fullName, email, password, passwordConfirm } = req.body;
    const validate = await registerSchema.safeParseAsync(req.body);
    if (!validate.success) {
        // error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map((issue) => `${issue.message} (${issue.path[0]})`);
        const oldInput = {
            fullName,
            email,
            password,
            passwordConfirm
        };
        return res.render("client/auth/register.ejs", { errors, oldInput });
    }

    await createUser(fullName, email, password);
    return res.redirect("/login");
};

const getSuccessRedirectPage = (req: Request, res: Response) => {
    const user = req.user as any;
    if (user?.role?.name === "ADMIN") {
        return res.redirect("/admin");
    }

    return res.redirect("/");
};

const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};

export { getLoginPage, getRegisterPage, postRegister, getSuccessRedirectPage, postLogout };