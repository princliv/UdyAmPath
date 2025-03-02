import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-r2ry7VRBZt-NkhhEIzHDE8c7IcR4kZ4",
  authDomain: "udyampath.firebaseapp.com",
  projectId: "udyampath",
  storageBucket: "udyampath.appspot.com",
  messagingSenderId: "747756276086",
  appId: "1:747756276086:web:19a397d6e64557ada41257"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Ensure users stay signed in
setPersistence(auth, browserLocalPersistence);

// ✅ Google Sign-In with User Data Saving
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Save user data to Realtime Database
    const userRef = ref(database, `users/${user.uid}`);
    await set(userRef, {
      firstName: user.displayName.split(" ")[0] || "",
      lastName: user.displayName.split(" ")[1] || "",
      email: user.email,
      profilePicture: user.photoURL || "",
      userType: "Candidate",
    });

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    throw error;
  }
};

// ✅ Email & Password Login
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

// ✅ Email & Password Signup (Optional)
export const signUpWithEmail = async (email, password, firstName, lastName, phone, userType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user info in the Realtime Database
    await set(ref(database, `users/${user.uid}`), {
      firstName,
      lastName,
      email,
      phone,
      userType,
    });

    return user;
  } catch (error) {
    console.error("Signup Error:", error.message);
    throw error;
  }
};

export { auth, database, firestore, storage, googleProvider };
export default app;
