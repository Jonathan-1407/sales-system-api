import routerx from "express-promise-router";
import entryController from "../../../controllers/Purchases/Entry/entry";
import auth from "../../../middlewares/Auth/authenticate";

const router = routerx();

router.post("/add", auth.verifyGrocer, entryController.add);
router.get("/query", auth.verifyGrocer, entryController.query);
router.get("/list", auth.verifyGrocer, entryController.list);
router.get("/last-year-chart", auth.verifyUser, entryController.last_year_chart);
router.post("/search-between-dates", auth.verifyUser, entryController.search_between_dates);
router.put("/approve", auth.verifyGrocer, entryController.approve);
router.put("/cancel", auth.verifyGrocer, entryController.cancel);

export default router;
