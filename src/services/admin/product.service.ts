import { prisma } from "config/client";

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
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

export { handleCreateProduct, getAllProducts, handleDeleteProduct, handleViewProduct, handleUpdateProduct };