import routerx from "express-promise-router";
import categoryRouter from "./Category/category";

const router = routerx();

router.use("/category", categoryRouter);

export default router;
