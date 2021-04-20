import routerx from "express-promise-router";
import userController from "../../controllers/User/user";

const router = routerx();

router.post("/add", userController.add);
router.get("/query", userController.query);
router.get("/list", userController.list);
router.put("/update", userController.update);
router.delete("/remove", userController.remove);
router.put("/enable", userController.enable);
router.put("/disable", userController.disable);

export default router;
