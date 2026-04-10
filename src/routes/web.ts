import express, { Express } from "express";
import { getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser, getCreateUserPage } from "../controllers/admin/user.controller";
import { getDashboardPage, getOrderPage, getProductPage, getUserPage } from "../controllers/admin/dashboard.controller";
import fileUploadMiddleware from "../middleware/multer";
import { getProductClientPage } from "../controllers/client/product.controller";
import { getCreateProductPage, postCreateProduct } from "../controllers/admin/product.controller";

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

    route.get("/admin/order", getOrderPage);

    // product routes
    route.get("/product/:id", getProductClientPage);

    app.use("/", route);
};

export default webRoutes;