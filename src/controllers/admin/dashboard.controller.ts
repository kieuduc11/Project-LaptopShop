import { Request, Response } from "express";
import { getAllUsers, getAllRoles } from "services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
    return res.render("admin/dashboard/show.ejs");
};

const getUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render("admin/user/show.ejs", {
        users
    });
}

const getProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/show.ejs");
}

const getOrderPage = async (req: Request, res: Response) => {
    return res.render("admin/order/show.ejs");
}

export { getDashboardPage, getUserPage, getProductPage, getOrderPage };