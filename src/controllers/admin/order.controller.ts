import { Request, Response } from "express";
import { getOrderDetail } from "services/admin/order.service";

const getOrderDetailPage = async (req: Request, res: Response) => {
    const orderId = req.params.id as string;
    const orderDetail = await getOrderDetail(Number(orderId));

    return res.render("admin/order/detail.ejs", {orderDetail})
};

export {getOrderDetailPage}