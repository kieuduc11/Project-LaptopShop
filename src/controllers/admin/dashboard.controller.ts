import { log } from "console";
import { Request, Response } from "express";
import { getDashboardInfo } from "services/admin/dashboard.service";
import { getAllOrders } from "services/admin/order.service";
import { getAllProducts } from "services/admin/product.service";
import { getAllUsers, getAllRoles } from "services/admin/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
    const info = await getDashboardInfo();
    return res.render("admin/dashboard/show.ejs", { info });
};

const getUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render("admin/user/show.ejs", {
        users
    });
}

const getProductPage = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    return res.render("admin/product/show.ejs", {
        products
    });
}

const getOrderPage = async (req: Request, res: Response) => {
    const orders = await getAllOrders();
    return res.render("admin/order/show.ejs", { orders });
}

export { getDashboardPage, getUserPage, getProductPage, getOrderPage };