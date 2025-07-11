import upload from "../middleware/multer.js";
import { Router } from "express";

const route = Router();

route.post("/upload", upload.single("file"), (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded");
	}

	console.log("Uploaded file:", req.file.originalname);
	res.send(`File "${req.file.originalname}" uploaded successfully`);
});

export default route;
