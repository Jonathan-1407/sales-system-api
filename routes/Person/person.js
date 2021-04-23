import routerx from "express-promise-router";
import personController from "../../controllers/Person/person";
import auth from "../../middlewares/Auth/authenticate";

const router = routerx();

router.post("/add", auth.verifyUser, personController.add);
router.get("/query", auth.verifyUser, personController.query);
router.get("/list", auth.verifyUser, personController.list);
router.put("/update", auth.verifyUser, personController.update);
router.delete("/remove", auth.verifyUser, personController.remove);
router.put("/enable", auth.verifyUser, personController.enable);
router.put("/disable", auth.verifyUser, personController.disable);

export default router;
