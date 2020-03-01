import firebase from "gatsby-plugin-firebase";
import { SignInParam, SignUpParam, SignOutParam } from "@unigatsby/auth";

export type User = firebase.User;

export async function signIn(param: SignInParam) {
  if (param.email && param.password) {
    await firebase.auth().signInWithEmailAndPassword(param.email, param.password);
  }
}

export async function signUp(param: SignUpParam) {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(param.email as string, param.password as string);
}

export async function signOut(param?: SignOutParam) {
  await firebase.auth().signOut();
}

export function onAuthStateChanged(fn: (user: User) => void) {
  return firebase.auth().onAuthStateChanged(user => fn(user as User));
}
