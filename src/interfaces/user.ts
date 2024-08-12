export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticateUser {
  email: string;
  password: string;
}
