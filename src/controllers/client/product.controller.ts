import { Request, Response } from "express";
import { getProductById } from "services/client/product.service";

const getDetailProduct = async(req: Request, res: Response) => {
    const id = req.params.id as string;
    const product = await getProductById(id);
    res.render("client/product/detail.ejs", { product });
};

export { getDetailProduct };