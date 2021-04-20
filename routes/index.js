import routerx from "express-promise-router";
import userRouter from "./User/user";
import categoryRouter from "./Category/category";
import articleRouter from "./Article/article";

const router = routerx();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/article", articleRouter);

export default router;
