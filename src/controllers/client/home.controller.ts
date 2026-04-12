import { Request, Response } from "express";
import { getAllProducts } from "services/client/home.service";

const getHomePage = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    return res.render("client/home/show.ejs", {
        products
    });
};


export { getHomePage };