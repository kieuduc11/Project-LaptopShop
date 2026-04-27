import { prisma } from "config/client";
import { ITEM_PER_PAGE } from "config/constant";

const getAllOrders = async (pageNumber: number) => {
    const take: number = ITEM_PER_PAGE;
    const orders = await prisma.order.findMany({
        include: {user: true},
        take,
        skip: (pageNumber - 1)* take
    });

    return orders;
};

const countTotalOrderPages = async () => {
    const totalOrder = await prisma.order.count();
    return Math.ceil(totalOrder / ITEM_PER_PAGE);
};


const getOrderDetail = async (orderId: number) => {
    const orderDetail = await prisma.orderDetail.findMany({
        where: {orderId},
        include: {product: true}
    });

    return orderDetail;
}
export {getAllOrders, getOrderDetail, countTotalOrderPages};