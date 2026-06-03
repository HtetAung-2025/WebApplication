import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveTestData = async () => {
  try {
    await addDoc(collection(db, "users"), {
      name: "Aung",
      createdAt: new Date(),
    });

    alert("Saved!");
  } catch (error) {
    console.error("Firestore error:", error);
    alert(error.message);
  }
};