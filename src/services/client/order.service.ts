import { prisma } from "config/client";

const getOrderHistory = async (userId: number) => {
    const orders = await prisma.order.findMany({
        where: { userId },
        include: {
            orderDetails: {
                include: {
                    product: true
                }
            }
        }
    });

    return orders ?? [];
};

export { getOrderHistory };