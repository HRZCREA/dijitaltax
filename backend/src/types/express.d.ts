// src/types/express.d.ts
import { Express } from 'express-serve-static-core';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                // diğer user özellikleri buraya eklenebilir
            };
        }
    }
}