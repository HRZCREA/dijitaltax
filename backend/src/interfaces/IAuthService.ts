// src/interfaces/IAuthService.ts
export interface IAuthService {
    login(email: string, password: string): Promise<string>;
    register(userData: UserCreateInput): Promise<User>;
    validateToken(token: string): Promise<any>;
}