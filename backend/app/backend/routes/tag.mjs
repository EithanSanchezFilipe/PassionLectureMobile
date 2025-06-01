import { Router } from "express";
import { All, GetBooks } from "../controller/tag.mjs";

const router = Router();

router.get("/", All);
router.get("/:id", GetBooks);

export default router;
