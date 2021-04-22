import routerx from "express-promise-router";
import userController from "../../controllers/User/user";
import auth from "../../middlewares/Auth/authenticate";

const router = routerx();

router.post("/add", auth.verifyAdministrator, userController.add);
router.get("/query", auth.verifyAdministrator, userController.query);
router.get("/list", auth.verifyAdministrator, userController.list);
router.put("/update", auth.verifyAdministrator, userController.update);
router.delete("/remove", auth.verifyAdministrator, userController.remove);
router.put("/enable", auth.verifyAdministrator, userController.enable);
router.put("/disable", auth.verifyAdministrator, userController.disable);
router.post("/login", userController.login);

export default router;
