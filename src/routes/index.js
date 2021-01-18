import { Router } from "express";
import AuthRoutes from "./auth-routes";

const routes = new Router();

routes.use("/auth", AuthRoutes);

export default routes;
