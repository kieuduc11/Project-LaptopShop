import { Request, Response } from "express";
import { getOrderHistory } from "services/client/order.service";

const getOrderHistoryPage = async(req: Request, res: Response) => {
    const user = req.user;
    if(!user) return res.redirect("/login");

    const userId = user.id;
    const orders = await getOrderHistory(userId);
    return res.render("client/order/order.history.ejs", {orders})
};

export {getOrderHistoryPage}