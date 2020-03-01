import { User as ProviderUser } from "./provider";

export interface SignInParam {
  username?: string;
  email?: string;
  password?: string;
  provider?: any;
}

export interface SignUpParam {
  username?: string;
  email?: string;
  password?: string;
}

export interface SignOutParam {
  username?: string;
  email?: string;
}

export type User = ProviderUser;

export interface AuthContextValue {
  status: "idle" | "loading" | "error";
  error: any;
  user: User | null;
  signIn: (param: SignInParam) => Promise<void>;
  signUp: (param: SignUpParam) => Promise<void>;
  signOut: (param?: SignOutParam) => Promise<void>;
}
