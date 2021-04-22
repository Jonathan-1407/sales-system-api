import routerx from "express-promise-router";
import categoryController from "../../controllers/Category/category";
import auth from "../../middlewares/Auth/authenticate";

const router = routerx();

router.post("/add", auth.verifyGrocer, categoryController.add);
router.get("/query", auth.verifyGrocer, categoryController.query);
router.get("/list", auth.verifyGrocer, categoryController.list);
router.put("/update", auth.verifyGrocer, categoryController.update);
router.delete("/remove", auth.verifyGrocer, categoryController.remove);
router.put("/enable", auth.verifyGrocer, categoryController.enable);
router.put("/disable", auth.verifyGrocer, categoryController.disable);

export default router;
