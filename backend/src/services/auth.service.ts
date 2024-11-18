// src/services/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IAuthService } from "../interfaces/IAuthService";
import { JWT_SECRET } from "../config/constants";
import { UserRepository } from "../repositories/user.repository";

export class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });
  }

  async register(userData: UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async validateToken(token: string): Promise<any> {
    return jwt.verify(token, JWT_SECRET);
  }
}
