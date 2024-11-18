// src/interfaces/IFileService.ts
export interface IFileService {
  upload(file: Express.Multer.File, userId: string): Promise<any>;
  getById(fileId: string, userId: string): Promise<any>;
  delete(fileId: string, userId: string): Promise<void>;
  list(userId: string): Promise<any[]>;
}
