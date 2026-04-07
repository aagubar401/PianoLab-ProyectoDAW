type Plan = "BASIC" | "PREMIUM";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  plan: Plan;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  setPlan: (plan: Plan) => void;
};

export type {Plan, User, AuthContextType}