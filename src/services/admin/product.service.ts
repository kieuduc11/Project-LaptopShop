import { prisma } from "config/client";
import { ITEM_PER_PAGE } from "config/constant";

const getAllProducts = async (pageNumber: number) => {
    const take = ITEM_PER_PAGE
    const products = await prisma.product.findMany({
        skip: (pageNumber - 1) * take,
        take
    });
    return products;
};

const countTotalProductPages = async () => {
    const totalProduct = await prisma.product.count();
    return Math.ceil(totalProduct / ITEM_PER_PAGE);
};

const handleCreateProduct = async (
    name: string,
    price: number,
    image: string | null,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string
) => {
    return await prisma.product.create({
        data: {
            name: name,
            price,
            ...(image && { image }),
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target
        }
    });
};

const handleDeleteProduct = async (id: string) => {
    await prisma.product.delete({
        where: { id: Number(id) },
    });
};

const handleViewProduct = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });
    return product;
}

const handleUpdateProduct = async (
    id: string,
    name: string,
    price: number,
    image: string | null,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string
) => {
    await prisma.product.update({
        where: { id: Number(id) },
        data: {
            name,
            price,
            ...(image && { image }),
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target
        }
    });
};

export {
    handleCreateProduct,
    getAllProducts,
    handleDeleteProduct,
    handleViewProduct,
    handleUpdateProduct,
    countTotalProductPages
};