// src/interfaces/IFileService.ts
export interface IFileService {
    upload(file: Express.Multer.File, userId: string): Promise<File>;
    getById(fileId: string, userId: string): Promise<File | null>;
    delete(fileId: string, userId: string): Promise<void>;
    list(userId: string): Promise<File[]>;
}