import { AuthenticateUser, User } from "@/interfaces/user";
import { userService } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
  user: User | null;
  login: (data: AuthenticateUser) => Promise<void>;
  logout: () => void;
  loading: boolean;
  loadingPage: boolean;
}

const AuthContext = createContext<AuthProviderProps>(null as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
  }

  async function login({ email, password }: AuthenticateUser) {
    try {
      setLoading(true);
      const { token, user } = await userService.login(email, password);
      localStorage.setItem("token", token);
      router.push("/posts");
      setUser(user);
      setLoading(false);
    } catch (error) {
      logout();
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userService
        .getUser()
        .then(setUser)
        .catch(logout)
        .finally(() => setLoadingPage(false));
    } else setLoadingPage(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loadingPage,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
