import { Request, Response } from "express";
import { handleCreateProduct, handleDeleteProduct, handleUpdateProduct, handleViewProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const factoryOptions = [
    { name: "Apple (MacBook)", value: "APPLE" },
    { name: "Asus", value: "ASUS" },
    { name: "Lenovo", value: "LENOVO" },
    { name: "Dell", value: "DELL" },
    { name: "LG", value: "LG" },
    { name: "Acer", value: "ACER" },
];

const targetOptions = [
    { name: "Gaming", value: "GAMING" },
    { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
    { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
    { name: "Mỏng nhẹ", value: "MONG-NHE" },
    { name: "Doanh nhân", value: "DOANH-NHAN" },
];

const getCreateProductPage = async (req: Request, res: Response) => {
    const errors: string[] = [];
    const oldInput = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
    };

    return res.render("admin/product/create.ejs", {
        errors,
        oldInput,
        factoryOptions,
        targetOptions,
    });
};

const postCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const oldInput = {
        name,
        price,
        detailDesc,
        shortDesc,
        quantity,
        factory,
        target,
    };

    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        // error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map((issue) => `${issue.message} (${issue.path[0]})`);
        return res.render("admin/product/create.ejs", { errors, oldInput, factoryOptions, targetOptions });
    }

    const file = req.file;
    const image = file?.filename ?? null;
    await handleCreateProduct(
        name,
        Number(price),
        image,
        detailDesc,
        shortDesc,
        Number(quantity),
        factory,
        target
    );

    return res.redirect("/admin/product");
};

const postDeleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await handleDeleteProduct(id);
    return res.redirect("/admin/product");
};

const getViewProduct = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const product = await handleViewProduct(id);
    const errors: string[] = [];

    return res.render("admin/product/detail.ejs", {
        id,
        product,
        errors,
        factoryOptions,
        targetOptions,
    });
};

const postUpdateProduct = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const product = await handleViewProduct(id);
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        // error
        const errorZod = validate.error.issues;
        const errors = errorZod?.map((issue) => `${issue.message} (${issue.path[0]})`);
        return res.render("admin/product/detail.ejs", { errors, product, factoryOptions, targetOptions });
    }

    const file = req.file;
    const image = file?.filename ?? null;
    await handleUpdateProduct(
        id,
        name,
        Number(price),
        image,
        detailDesc,
        shortDesc,
        Number(quantity),
        factory,
        target
    );

    return res.redirect("/admin/product");
};

export { getCreateProductPage, postCreateProduct, postDeleteProduct, getViewProduct, postUpdateProduct };

