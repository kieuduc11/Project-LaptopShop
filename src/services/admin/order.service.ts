import { prisma } from "config/client";

const getAllOrders = async () => {
    const orders = await prisma.order.findMany({
        include: {user: true}
    });

    return orders;
};

const getOrderDetail = async (orderId: number) => {
    const orderDetail = await prisma.orderDetail.findMany({
        where: {orderId},
        include: {product: true}
    });

    return orderDetail;
}
export {getAllOrders, getOrderDetail};