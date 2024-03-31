import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage function for Firebase Storage

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const addProfileInformation = async (userId, passion, work, project, education) => {
  try {
    const userDocRef = doc(db, "users", userId);
    
    // Check if the user document exists
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      // If the user document doesn't exist, create it
      await setDoc(userDocRef, {});
    }
    
    // Add the project description under the user's document
    await setDoc(userDocRef, {
      passion: passion,
      workField: work,
      projectField: project,
      educationField: education
    }, { merge: true });

    console.log("Profile information added for user ID: ", userId);
  } catch (e) {
    console.error("Error adding profile information: ", e);
  }
};

const getAllEmployees = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "employee"));
    const employeeList = [];
    querySnapshot.forEach((doc) => {
      employeeList.push({ id: doc.id, ...doc.data() });
    });
    return employeeList;
  } catch (error) {
    console.error("Error retrieving employees:", error);
    return [];
  }
};

const getEducationInformation = async (userEmail) => {
  try {
    const userDocRef = doc(db, "users", userEmail); // Reference to the document corresponding to the user's email
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const educationData = userData.educationField; // Assuming 'education' is the key for the education field
      
      // If 'education' is a map field within the user document
      // You can directly return it
      return educationData;
    } else {
      console.error("User document does not exist");
      return null; // Or handle the case where user document doesn't exist
    }
  } catch (error) {
    console.error("Error retrieving education information:", error);
    return null; // Or handle the error accordingly
  }
};

const getJourneyInformation = async (userEmail) => {
  try {
    const userDocRef = doc(db, "users", userEmail); // Reference to the document corresponding to the user's email
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const educationData = userData.passion; // Assuming 'education' is the key for the education field
      
      // If 'education' is a map field within the user document
      // You can directly return it
      return educationData;
    } else {
      console.error("User document does not exist");
      return null; // Or handle the case where user document doesn't exist
    }
  } catch (error) {
    console.error("Error retrieving education information:", error);
    return null; // Or handle the error accordingly
  }
};

const getWorkInformation = async (userEmail) => {
  try {
    const userDocRef = doc(db, "users", userEmail); // Reference to the document corresponding to the user's email
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const educationData = userData.workField; // Assuming 'education' is the key for the education field
      
      // If 'education' is a map field within the user document
      // You can directly return it
      return educationData;
    } else {
      console.error("User document does not exist");
      return null; // Or handle the case where user document doesn't exist
    }
  } catch (error) {
    console.error("Error retrieving education information:", error);
    return null; // Or handle the error accordingly
  }
};

const getProjectInformation = async (userEmail) => {
  try {
    const userDocRef = doc(db, "users", userEmail); // Reference to the document corresponding to the user's email
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const educationData = userData.projectField; // Assuming 'education' is the key for the education field
      
      // If 'education' is a map field within the user document
      // You can directly return it
      return educationData;
    } else {
      console.error("User document does not exist");
      return null; // Or handle the case where user document doesn't exist
    }
  } catch (error) {
    console.error("Error retrieving education information:", error);
    return null; // Or handle the error accordingly
  }
};


export {
  auth,
  db,
  getEducationInformation,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  addProfileInformation, // Export the function to add project description
  getProjectInformation,
  getJourneyInformation,
  getWorkInformation,
  storage,
  getAllEmployees, // Export the function to retrieve all employees
};
