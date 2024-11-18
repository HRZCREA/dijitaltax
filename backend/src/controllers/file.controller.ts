// src/controllers/file.controller.ts
import { Request, Response } from "express";
import { FileService } from "../services/file.service";
import path from "path";
import { UPLOAD_DIR } from "../config/constants";
import fs from "fs";

interface CustomError {
  message: string;
}

export class FileController {
  constructor(private fileService: FileService) {}

  upload = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      if (!req.user?.userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const file = await this.fileService.upload(req.file, req.user.userId);

      res.status(201).json(file);
    } catch (error) {
      const err = error as CustomError;
      res.status(400).json({ message: err.message || "Error uploading file" });
    }
  };

  getFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!req.user?.userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const file = await this.fileService.getById(id, req.user.userId);
      const absoluteFilePath = path.resolve(
        process.cwd(),
        UPLOAD_DIR,
        file.path
      );

      if (!fs.existsSync(absoluteFilePath)) {
        return res.status(404).json({ message: "File not found on disk" });
      }

      res.setHeader("Content-Type", file.type);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file.name}"`
      );

      res.sendFile(absoluteFilePath);
    } catch (error) {
      const err = error as CustomError;
      console.error("File download error:", err);
      res
        .status(404)
        .json({ message: err.message || "Error downloading file" });
    }
  };

  listFiles = async (req: Request, res: Response) => {
    try {
      if (!req.user?.userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const files = await this.fileService.list(req.user.userId);

      res.json(files);
    } catch (error) {
      const err = error as CustomError;
      res.status(400).json({ message: err.message || "Error listing files" });
    }
  };

  deleteFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!req.user?.userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      await this.fileService.delete(id, req.user.userId);

      res.status(204).send();
    } catch (error) {
      const err = error as CustomError;
      res.status(400).json({ message: err.message || "Error deleting file" });
    }
  };
}
