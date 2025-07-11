import { Router } from "express";
import { summarizeHandler } from "../controllers/summarizer.js";

const router = Router();

router.post("/summarize", summarizeHandler);

export default router;