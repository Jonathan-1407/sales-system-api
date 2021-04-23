import routerx from "express-promise-router";
import userRouter from "./User/user";
import personRouter from "./Person/person";
import categoryRouter from "./Category/category";
import articleRouter from "./Article/article";

const router = routerx();

router.use("/user", userRouter);
router.use("/person", personRouter);
router.use("/category", categoryRouter);
router.use("/article", articleRouter);

export default router;
