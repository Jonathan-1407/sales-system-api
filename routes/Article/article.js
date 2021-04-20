import routerx from "express-promise-router";
import articleController from "../../controllers/Article/article";

const router = routerx();

router.post("/add", articleController.add);
router.get("/query", articleController.query);
router.get("/list", articleController.list);
router.put("/update", articleController.update);
router.delete("/remove", articleController.remove);
router.put("/enable", articleController.enable);
router.put("/disable", articleController.disable);

export default router;
