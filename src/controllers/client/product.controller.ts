import { Request, Response } from "express";
import { addProductToCart, deleteProductInCart, getProductById, getProductInCart, handlePlaceOrder, updateCartDetailBeforeCheckout } from "services/client/product.service";

const getDetailProduct = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const product = await getProductById(id);
    res.render("client/product/detail.ejs", { product });
};

const postAddProductToCart = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const user = req.user;
    if (user) {
        await addProductToCart(1, Number(id), user);
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
        const userId = user.id;
        const cartDetails = await getProductInCart(userId);
        const arrayOfPrice = cartDetails.map((product) => product.price * product.quantity);
        const totalPrice = arrayOfPrice.reduce((sum, currentPrice) => {
            sum += currentPrice;
            return sum;
        }, 0);
        return res.render("client/product/cart.ejs", { cartDetails, totalPrice });
    }
    return res.redirect("/login");
};

const postDeleteProductInCart = async (req: Request, res: Response) => {
    const cartDetailId = req.params.id as string;
    const user = req.user;
    const sumCart = user?.sumCart;
    await deleteProductInCart(Number(cartDetailId), Number(sumCart));
    return res.redirect("/cart");
};

const getCheckoutPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
        const userId = user.id;
        const cartDetails = await getProductInCart(userId);
        const arrayOfPrice = cartDetails.map((product) => product.price * product.quantity);
        const totalPrice = arrayOfPrice.reduce((sum, currentPrice) => {
            sum += currentPrice;
            return sum;
        }, 0);
        return res.render("client/product/checkout.ejs", { cartDetails, totalPrice });
    }
    return res.redirect("/login");
};

const postHandleCartToCheckOut = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");

    const userId = user.id;

    const currentCartDetail: { id: string, quantity: string }[] = req.body.cartDetails ?? [];

    await updateCartDetailBeforeCheckout(currentCartDetail, userId);
    return res.redirect("/check-out");
};

const postPlaceOrder = async (req: Request, res: Response) => {
    const user = req.user;
    if(!user) return res.redirect("/login");

    const {receiverName, receiverAddress, receiverPhone, totalPrice} = req.body;
    const message =  await handlePlaceOrder(user.id, receiverName, receiverAddress, receiverPhone, Number(totalPrice));

    if(!message) return res.redirect("/thanks"); 
    return res.redirect("/check-out");
};

const getThanksPage = async (req: Request, res: Response) => {
    const user = req.user;
    if(!user) return res.redirect("/login");

    return res.render("client/product/thanks.ejs");
};

const postAddToCartFromDetailPage = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {quantity} = req.body;
    const user = req.user;
    if(!user) return res.redirect("/login");

    addProductToCart(Number(quantity), Number(id), user);
    return res.redirect(`/product/${id}`);
};

export {
    getDetailProduct,
    postAddProductToCart,
    getCartPage,
    postDeleteProductInCart,
    getCheckoutPage,
    postHandleCartToCheckOut,
    postPlaceOrder,
    getThanksPage,
    postAddToCartFromDetailPage
};