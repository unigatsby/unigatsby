import { SignInParam, SignUpParam, SignOutParam } from "./types";

export interface User {}

export async function signIn(param: SignInParam) {}

export async function signUp(param: SignUpParam) {}

export async function signOut(param?: SignOutParam) {}

export function onAuthStateChanged(fn: (user: User) => void) {
  return () => {};
}
