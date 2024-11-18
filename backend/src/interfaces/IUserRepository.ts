// src/interfaces/IUserRepository.ts
export interface IUserRepository {
  create(data: UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
