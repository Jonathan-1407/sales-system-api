import routerx from "express-promise-router";
import userRouter from "./User/user";
import personRouter from "./Person/person";
import categoryRouter from "./Category/category";
import articleRouter from "./Article/article";
import entryRouter from "./Purchases/Entry/entry";
import saleRouter from "./Sales/Sale/sale";

const router = routerx();

router.use("/user", userRouter);
router.use("/person", personRouter);
router.use("/category", categoryRouter);
router.use("/article", articleRouter);
router.use("/purchases/entry", entryRouter);
router.use("/sales/sale", saleRouter);

export default router;
