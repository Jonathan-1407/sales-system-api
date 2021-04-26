import routerx from "express-promise-router";
import saleController from "../../../controllers/Sales/Sale/sale";
import auth from "../../../middlewares/Auth/authenticate";

const router = routerx();

router.post("/add", auth.verifySeller, saleController.add);
router.get("/query", auth.verifySeller, saleController.query);
router.get("/list", auth.verifySeller, saleController.list);
router.get("/last-year-chart", auth.verifyUser, saleController.last_year_chart);
router.put("/approve", auth.verifySeller, saleController.approve);
router.put("/cancel", auth.verifySeller, saleController.cancel);

export default router;
