import React from "react";
import * as provider from "./provider";
import { AuthContextValue, SignInParam } from "./types";

export const AuthContext = React.createContext<AuthContextValue>({
  ...provider,
  status: "idle",
  error: null,
  user: null,
});

interface AuthState {
  status: "idle" | "loading" | "error";
  action: AuthAction;
  error: any;
  user: any;
}

type AuthAction =
  | { type: "SIGN_IN"; payload: object }
  | { type: "SIGN_UP"; payload: object }
  | { type: "SIGN_OUT"; payload: object }
  | null;

const initialState: AuthState = {
  status: "idle",
  action: null,
  error: null,
  user: null,
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = React.useState<AuthState>(initialState);

  // Subscribe to auth state
  React.useEffect(() => {
    const unsubscribe = provider.onAuthStateChanged(user => {
      setState({ status: "idle", action: null, error: null, user });
    });

    return () => unsubscribe();
  }, []);

  // Perform action
  React.useEffect(() => {
    if (state.status === "loading") {
      (async () => {
        try {
          switch (state.action?.type) {
            case "SIGN_IN":
              await provider.signIn(state.action?.payload);
              return;
            case "SIGN_UP":
              await provider.signUp(state.action?.payload);
              return;
            case "SIGN_OUT":
              await provider.signOut(state.action?.payload);
              return;
            default:
              return console.error("@unigatsby/auth unknown action");
          }
        } catch (error) {
          setState(prevState => ({ status: "error", action: null, user: prevState.user, error }));
        }
      })();
    }
  }, [state.status]);

  async function signIn(param: SignInParam) {
    setState(prevState => ({
      status: "loading",
      action: { type: "SIGN_IN", payload: param },
      error: prevState.error,
      user: prevState.user,
    }));
  }
  async function signUp(param: any) {
    setState(prevState => ({
      status: "loading",
      action: { type: "SIGN_UP", payload: param },
      error: prevState.error,
      user: prevState.user,
    }));
  }
  async function signOut(param: any) {
    setState(prevState => ({
      status: "loading",
      action: { type: "SIGN_OUT", payload: param },
      error: prevState.error,
      user: prevState.user,
    }));
  }

  return (
    <AuthContext.Provider
      value={{
        status: state.status,
        error: state.error,
        user: state.user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return React.useContext(AuthContext);
}
