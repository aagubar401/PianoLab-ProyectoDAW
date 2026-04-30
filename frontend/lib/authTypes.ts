type Plan = "BASIC" | "PREMIUM";

type User = {
  id: number;
  fullname: string;
  username: string;
  email: string;
  premium: boolean; // equivale a tu plan
};

type AuthContextType = {
  user: User | null;
  loadingUser: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    fullname: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

export type { Plan, User, AuthContextType };
