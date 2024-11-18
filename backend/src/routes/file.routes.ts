// src/routes/file.routes.ts
import { Router } from "express";
import { FileController } from "../controllers/file.controller";
import { FileService } from "../services/file.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../config/multer";

const router = Router();
const fileService = new FileService();
const fileController = new FileController(fileService);

// Tüm route'lar için auth middleware'ini uygula
router.use(authMiddleware);

// File routes
router.post("/upload", upload.single("file"), fileController.upload);
router.get("/list", fileController.listFiles);
router.get("/:id", fileController.getFile);
router.delete("/:id", fileController.deleteFile);

export default router;
