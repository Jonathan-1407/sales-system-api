import routerx from "express-promise-router";
import categoryController from "../../controllers/Category/category";

const router = routerx();

router.post("/add", categoryController.add);
router.get("/query", categoryController.query);
router.get("/list", categoryController.list);
router.put("/update", categoryController.update);
router.delete("/remove", categoryController.remove);
router.put("/enable", categoryController.enable);
router.put("/disable", categoryController.disable);

export default router;
