// src/repositories/user.repository.ts
import { IUserRepository } from '../interfaces/IUserRepository';
import prisma from '../config/database';

export class UserRepository implements IUserRepository {
    async create(data: UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }
}