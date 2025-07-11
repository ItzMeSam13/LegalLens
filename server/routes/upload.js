import upload from "../middleware/multer.js";
import { Router } from "express";
import { runOCR } from "../controllers/ocr.js";

const route = Router();


route.post("/upload", upload.single("file"), runOCR);

export default route;
