import routerx from "express-promise-router";
import entrySchema from "../../../controllers/Purchases/Entry/entry";
import auth from "../../../middlewares/Auth/authenticate";

const router = routerx();

router.post("/add", auth.verifyGrocer, entrySchema.add);
router.get("/query", auth.verifyGrocer, entrySchema.query);
router.get("/list", auth.verifyGrocer, entrySchema.list);
router.put("/approve", auth.verifyGrocer, entrySchema.approve);
router.put("/cancel", auth.verifyGrocer, entrySchema.cancel);

export default router;
