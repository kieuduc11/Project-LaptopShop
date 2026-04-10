import { Request, Response } from "express";

const getProductClientPage = (req: Request, res: Response) => {
    res.render("client/product/detail.ejs");
};

export { getProductClientPage };