// src/config/multer.ts
import multer from 'multer';
import path from 'path';
import { UPLOAD_DIR, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from './constants';
import fs from 'fs';

// Upload dizinini oluştur (yoksa)
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, JPEG and PNG are allowed.'));
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE // 5MB
    },
    fileFilter: fileFilter
});