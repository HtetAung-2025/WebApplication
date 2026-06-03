import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  const users = [];

  querySnapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return users;
};

export const updateUserRole = async (userId) => {
  await updateDoc(doc(db, "users", userId), {
    role: "admin",
  });
};

export const deleteUser = async (userId) => {
  await deleteDoc(doc(db, "users", userId));
};