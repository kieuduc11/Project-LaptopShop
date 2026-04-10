import { Request, Response } from "express";

const getCreateProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/create.ejs");
};

const postCreateProduct = async (req: Request, res: Response) => {
    const { name, price, description } = req.body;
    return res.redirect("/admin/product");
};

export { getCreateProductPage, postCreateProduct };