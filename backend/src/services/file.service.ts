// src/services/file.service.ts
import fs from "fs/promises";
import path from "path";
import prisma from "../config/database";
import { IFileService } from "../interfaces/IFileService";
import { UPLOAD_DIR } from "../config/constants";

export class FileService implements IFileService {
  async upload(file: Express.Multer.File, userId: string) {
    const fileData = await prisma.file.create({
      data: {
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        path: file.filename,
        userId: userId,
      },
    });

    return fileData;
  }

  async getById(fileId: string, userId: string) {
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId: userId,
      },
    });

    if (!file) {
      throw new Error("File not found");
    }

    return file;
  }

  async delete(fileId: string, userId: string) {
    const file = await this.getById(fileId, userId);

    // Veritabanından dosyayı sil
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });

    // Fiziksel dosyayı sil
    const filePath = path.join(UPLOAD_DIR, file.path);
    await fs.unlink(filePath);
  }

  async list(userId: string) {
    const files = await prisma.file.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return files;
  }
}
