import { prisma } from "config/client";

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
};

export { getAllProducts };