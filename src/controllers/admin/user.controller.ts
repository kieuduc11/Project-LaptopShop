import { Request, Response } from "express";
import { getAllRoles, handleCreateUser, handleDeleteUser, handleUpdateUser, handleViewUser } from "../../services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    return res.render("client/home/show.ejs");
};

const getCreateUserPage = async(req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create.ejs", {
        roles
    });
};

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    await handleCreateUser(fullName, username, address, phone, avatar, role);
    return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await handleDeleteUser(id);
    return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const user = await handleViewUser(id);
    const roles = await getAllRoles();
    return res.render("admin/user/detail.ejs", {
        id,
        user,
        roles
    });
};

const postUpdateUser = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    const id = req.params.id as string;
    await handleUpdateUser(id, fullName, phone, role, address, avatar);
    return res.redirect("/admin/user");
};

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };