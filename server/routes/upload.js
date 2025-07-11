import upload from "../middleware/multer.js";
import { Router } from "express";
import { runOCR } from "../controllers/ocr.js";
import { extractTextFromPDF } from "../controllers/pdfparsser.js";

const route = Router();


route.post("/upload", upload.single("file"), runOCR);

route.post("/upload-pdf", upload.single("file"), extractTextFromPDF);
export default route;

