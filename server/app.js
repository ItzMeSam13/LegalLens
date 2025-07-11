import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import upload from "./routes/upload.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to API");
});

app.use("/file", upload);

app.listen(PORT, () =>
	console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`)
);
