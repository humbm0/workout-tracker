// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv9ZSk9pyotUVmJcFdPGakVy42FDFfSxI",
  authDomain: "workout-tracker-2.firebaseapp.com",
  projectId: "workout-tracker-2",
  storageBucket: "workout-tracker-2.appspot.com",
  messagingSenderId: "27467637976",
  appId: "1:27467637976:web:71bc994a0809907aea63ad",
  measurementId: "G-ZVTJPG0TB0"
};

/*eslint-disable */
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore()

const usersCollection = "users";
const exercisesCollection = "exercises";
const userWorkoutsCollection = "userWorkouts";
const completedWorkoutsCollection = "completedWorkouts";
const completedExercisesCollection = "completedExercises";

export { 
  db,
  auth,
  usersCollection,
  exercisesCollection,
  userWorkoutsCollection,
  completedWorkoutsCollection,
  completedExercisesCollection
}
/*eslint-enable */