import express, { Express } from "express";
import { postCreateUser, postDeleteUser, getViewUser, postUpdateUser, getCreateUserPage } from "../controllers/admin/user.controller";
import { getDashboardPage, getOrderPage, getProductPage, getUserPage } from "../controllers/admin/dashboard.controller";
import fileUploadMiddleware from "../middleware/multer";
import { getCartPage, getCheckoutPage, getDetailProduct, getThanksPage, postAddProductToCart, postAddToCartFromDetailPage, postDeleteProductInCart, postHandleCartToCheckOut, postPlaceOrder } from "../controllers/client/product.controller";
import { getCreateProductPage, getViewProduct, postCreateProduct, postDeleteProduct, postUpdateProduct } from "../controllers/admin/product.controller";
import { getFilterPage, getHomePage } from "controllers/client/home.controller";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
import { getOrderDetailPage } from "controllers/admin/order.controller";
import { getOrderHistoryPage } from "controllers/client/order.controller";

const route = express.Router();

const webRoutes = (app: Express) => {
    route.get("/", getHomePage);
    route.get("/products", getFilterPage);
    route.get("/success-redirect", getSuccessRedirectPage);
    route.get("/product/:id", getDetailProduct);
    route.get("/login", isLogin, getLoginPage);
    // route.post("/login", passport.authenticate("local", {
    //     successRedirect: "/success-redirect",
    //     failureRedirect: "/login",
    //     failureMessage: true,
    // }));
    route.post("/login", (req, res, next) => {
        passport.authenticate("local", (err: any, user: any, info: any) => {
            if (err) return next(err);

            if (!user) {
                (req.session as any).messages = [info.message];

                return req.session.save(() => {
                    res.redirect("/login");
                });
            }

            req.logIn(user, (err) => {
                if (err) return next(err);

                req.session.save(() => {
                    res.redirect("/success-redirect");
                });
            });
        })(req, res, next);
    });
    route.post("/logout", postLogout);

    route.get("/register", isLogin, getRegisterPage);
    route.post("/register", postRegister);

    route.post("/add-product-to-cart/:id", postAddProductToCart);
    route.get("/cart", getCartPage);
    route.post("/delete-product-in-cart/:id", postDeleteProductInCart);
    route.post("/handle-cart-to-checkout", postHandleCartToCheckOut)
    route.get("/check-out", getCheckoutPage);
    route.post("/place-order", postPlaceOrder);
    route.get("/thanks", getThanksPage);
    route.get("/order-history", getOrderHistoryPage);
    route.post("/add-to-cart-from-detail-page/:id", postAddToCartFromDetailPage);

    // admin routes
    route.get("/admin", getDashboardPage);
    route.get("/admin/user", getUserPage);
    route.get("/admin/create-user", getCreateUserPage);
    route.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser);
    route.post("/admin/handle-delete-user/:id", postDeleteUser);
    route.get("/admin/handle-view-user/:id", getViewUser);
    route.post("/admin/handle-update-user/:id", fileUploadMiddleware("avatar"), postUpdateUser);

    route.get("/admin/product", getProductPage);
    route.get("/admin/create-product", getCreateProductPage);
    route.post("/admin/handle-create-product", fileUploadMiddleware("image", "images/products"), postCreateProduct);
    route.post("/admin/handle-delete-product/:id", postDeleteProduct);
    route.get("/admin/handle-view-product/:id", getViewProduct);
    route.post("/admin/handle-update-product/:id", fileUploadMiddleware("image", "images/products"), postUpdateProduct);

    route.get("/admin/order", getOrderPage);
    route.get("/admin/handle-view-order/:id", getOrderDetailPage);

    app.use("/", isAdmin, route);
};

export default webRoutes;