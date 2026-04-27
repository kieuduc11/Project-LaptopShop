import { prisma } from "config/client";
import { ITEM_PER_CLIENT_PAGE } from "config/constant";

const getAllProducts = async (pageNumber: number) => {
    const take = ITEM_PER_CLIENT_PAGE;
    const products = await prisma.product.findMany({
        skip: (pageNumber - 1) * take,
        take,
    });
    return products;
};

const countTotalProductClientPage = async () => {
    const totalProduct = await prisma.product.count();
    return Math.ceil(totalProduct / ITEM_PER_CLIENT_PAGE);
};

export { getAllProducts, countTotalProductClientPage };