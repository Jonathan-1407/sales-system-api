import routerx from "express-promise-router";
import articleController from "../../controllers/Article/article";
import auth from "../../middlewares/Auth/authenticate";

const router = routerx();

router.post("/add", auth.verifyGrocer, articleController.add);
router.get("/query", auth.verifyGrocer, articleController.query);
router.get("/search", auth.verifyUser, articleController.search);
router.get("/list", auth.verifyGrocer, articleController.list);
router.put("/update", auth.verifyGrocer, articleController.update);
router.delete("/remove", auth.verifyGrocer, articleController.remove);
router.put("/enable", auth.verifyGrocer, articleController.enable);
router.put("/disable", auth.verifyGrocer, articleController.disable);

export default router;
