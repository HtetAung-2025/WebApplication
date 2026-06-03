import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const SCHOOL_DOMAIN = "@jec.ac.jp";

export const register = async (email, password) => {
  if (!email.endsWith(SCHOOL_DOMAIN)) {
    throw new Error("学校メール（@jec.ac.jp）だけ登録できます。");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    uid: user.uid,
    role: "student",
    createdAt: new Date(),
  });

  return user;
};

export const login = async (email, password) => {
  if (!email.endsWith(SCHOOL_DOMAIN)) {
    throw new Error("学校メール（@jec.ac.jp）だけログインできます。");
  }

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};