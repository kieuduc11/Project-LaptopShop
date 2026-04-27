import { Request, Response } from "express";
import { countTotalProductClientPage, getAllProducts } from "services/client/home.service";
import { getProductWithFilter } from "services/client/product.filter";

const getHomePage = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPageNumber = Number(page);
    if (!currentPageNumber || currentPageNumber <= 0) currentPageNumber = 1;

    const totalPages = await countTotalProductClientPage();

    const products = await getAllProducts(currentPageNumber);
    return res.render("client/home/show.ejs", {
        products,
        totalPages,
        page: Number(page) || 1
    });
};

const getFilterPage = async (req: Request, res: Response) => {
    const { page, factory = "", target = "", price = "", sort = "" } 
    = req.query as {
        page?: string,
        factory: string,
        target: string,
        price: string,
        sort: string
    };
    let currentPageNumber = Number(page);
    if (!currentPageNumber || currentPageNumber <= 0) currentPageNumber = 1;

    // const totalPages = await countTotalProductClientPage();
    // const products = await getAllProducts(currentPageNumber);

    const {products, totalPages} = await getProductWithFilter(currentPageNumber, factory, target, price, sort)
    
    return res.render("client/product/filter.ejs", {
        products,
        totalPages,
        page: Number(page) || 1
    });
};


export { getHomePage, getFilterPage };