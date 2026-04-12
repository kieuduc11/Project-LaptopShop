import { prisma } from "config/client";

const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    });
    return product;
};

export { getProductById };