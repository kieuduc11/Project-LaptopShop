import { log } from "console";
import { Request, Response } from "express";
import { getDashboardInfo } from "services/admin/dashboard.service";
import { countTotalOrderPages, getAllOrders } from "services/admin/order.service";
import { countTotalProductPages, getAllProducts } from "services/admin/product.service";
import { getAllUsers, getAllRoles, countTotalUserPages } from "services/admin/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
    const info = await getDashboardInfo();
    return res.render("admin/dashboard/show.ejs", { info });
};

const getUserPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPageNumber = Number(page);
    if (!currentPageNumber || currentPageNumber <= 0) currentPageNumber = 1;
    const users = await getAllUsers(currentPageNumber);

    const totalUserPages = await countTotalUserPages();

    return res.render("admin/user/show.ejs", {
        users,
        totalUserPages,
        page: Number(page) || 1
    });
}

const getProductPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPageNumber = Number(page);
    if (!currentPageNumber || currentPageNumber <= 0) currentPageNumber = 1;
    const products = await getAllProducts(currentPageNumber);

    const totalProductPages = await countTotalProductPages();

    return res.render("admin/product/show.ejs", {
        products,
        totalProductPages,
        page: Number(page) || 1
    });
}

const getOrderPage = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPageNumber = Number(page);
    if (!currentPageNumber || currentPageNumber <= 0) currentPageNumber = 1;

    const totalOrderPages = await countTotalOrderPages();

    const orders = await getAllOrders(currentPageNumber);
    return res.render("admin/order/show.ejs", {
        orders, 
        totalOrderPages,
        page: Number(page) || 1
    });
}

export { getDashboardPage, getUserPage, getProductPage, getOrderPage };