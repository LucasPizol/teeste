import { api } from "@/api/api";
import { User } from "@/interfaces/user";

export class UserService {
  async getUser(): Promise<User> {
    return await api.get("/users");
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    token: string;
    user: User;
  }> {
    return await api.post("/login", { email, password });
  }
}

export const userService = new UserService();
