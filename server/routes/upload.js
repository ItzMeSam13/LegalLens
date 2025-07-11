import upload from "../middleware/multer.js";
import { Router } from "express";
import { runOCR } from "../controllers/ocr.js";
import { handleupload } from "../controllers/handleupload.js";


const route = Router();

route.post("/upload", upload.single("file"), handleupload);

export default route;
