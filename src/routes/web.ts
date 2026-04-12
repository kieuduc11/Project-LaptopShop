import express, { Express } from "express";
import { postCreateUser, postDeleteUser, getViewUser, postUpdateUser, getCreateUserPage } from "../controllers/admin/user.controller";
import { getDashboardPage, getOrderPage, getProductPage, getUserPage } from "../controllers/admin/dashboard.controller";
import fileUploadMiddleware from "../middleware/multer";
import { getDetailProduct } from "../controllers/client/product.controller";
import { getCreateProductPage, getViewProduct, postCreateProduct, postDeleteProduct, postUpdateProduct } from "../controllers/admin/product.controller";
import { getHomePage } from "controllers/client/home.controller";

const route = express.Router();

const webRoutes = (app: Express) => {
    route.get("/", getHomePage);

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

    // product routes
    route.get("/product/:id", getDetailProduct);

    app.use("/", route);
};

export default webRoutes;