import routerx from "express-promise-router";
import categoryRouter from "./Category/category";
import articleRouter from "./Article/article";

const router = routerx();

router.use("/category", categoryRouter);
router.use("/article", articleRouter);

export default router;
