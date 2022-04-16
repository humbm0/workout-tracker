import { createStore } from 'vuex'
import router from '../router'
import { collection, addDoc, setDoc, getDoc, getDocs, doc, query, where, Timestamp} from "firebase/firestore"
import { 
  auth,
  db,
  usersCollection,
  exercisesCollection,
  userWorkoutsCollection,
  completedWorkoutsCollection,
  completedExercisesCollection
} from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'


export default createStore({
  state: {
    user: null,
    userProfile: null,
    exercises: null,
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },

    setWorkout(state, val){
      state.workout = val
    },

    setExercises(state, val) {
      state.exercises = val
    },
    
    setUserWorkouts(state, val) {
      state.userWorkouts = val
    },

    setCompletedWorkouts(state, val) {
      state.completedWorkouts = val
    },

    setCompletedExercises(state, val) {
      state.completedExercises = val
    },

    setCurrentWorkout(state, val) {
      state.completedWorkout = val
    },

    setWorkoutExercises(state, val) {
      state.workoutExercises = val
    },

    setUserProfile(state, val) {
      state.userProfile = val
    },

    CLEAR_USER (state) {
      state.user = null
    }
  },
  actions: {

    // async getLoggedExercises ({ commit }) {

    //   const q = query(collection(db, completedWorkoutsCollection), where("userId", "==", auth.currentUser.uid));

    //   const querySnapshot = await getDocs(q);
    //   let workoutsArray = [];
    //   querySnapshot.forEach((doc) => {
    //     let workout = doc.data();
    //     workout.id = doc.id;
    //     workout.createdDate = workout.created.toDate();
    //     workoutsArray.push(workout);
    //   });

    //   console.log(workoutsArray);
      
    //   let exercisesArray = [];
    //   workoutsArray.forEach(workout => {
    //     workout.exercises.forEach(exercise => {
    //       exercisesArray.push(exercise);
    //     });
    //   });

    //   commit('setLoggedExercises', exercisesArray);
    // },

    async getWorkoutExercises ({ commit }, completedWorkoutId) {

      const q = query(collection(db, completedExercisesCollection), where("userId", "==", auth.currentUser.uid), where("completedWorkoutId", "==", completedWorkoutId));

      const querySnapshot = await getDocs(q);
      let exercisesArray = [];
      querySnapshot.forEach((doc) => {
        let exercise = doc.data();
        exercise.id = doc.id;
        exercise.createdDate = exercise.created.toDate();
        exercisesArray.push(exercise);
      });

      console.log(exercisesArray);

      commit('setWorkoutExercises', exercisesArray);
    },


    async saveCompletedExercise ({ state }, details) {

      console.log(details);

      // save set in completedExercises
      const docRef = await addDoc(collection(db, completedExercisesCollection), {
        userId: state.user.uid,
        completedWorkoutId: details.completedWorkoutId,
        exerciseId: details.exerciseId,
        created: Timestamp.now(),
        exerciseIndex: details.exerciseIndex,
        setIndex: details.setIndex,
        weight: details.weight,
        reps: details.reps
      });
      console.log("Document written with ID: ", docRef.id);

      return state
  
    },


    async createCompletedWorkout ({ state, commit }, workout) {

      const docRef = await addDoc(collection(db, completedWorkoutsCollection), {
        userId: state.user.uid,
        workoutId: workout.workoutId,
        name: workout.name,
        created: Timestamp.now()
      });
      console.log("Document written with ID: ", docRef.id);

      commit('setCurrentWorkout', docRef);
  
    },

    async getCompletedExercises ({ commit }) {

      const q = query(collection(db, completedExercisesCollection), where("userId", "==", auth.currentUser.uid));

      const querySnapshot = await getDocs(q);
      let exercisesArray = [];
      querySnapshot.forEach((doc) => {
        let exercise = doc.data();
        exercise.id = doc.id;
        exercise.createdDate = exercise.created.toDate();
        exercisesArray.push(exercise);
      });

      console.log(exercisesArray);

      commit('setCompletedExercises', exercisesArray);
    },

    async getCompletedWorkouts ({ commit }) {

      const q = query(collection(db, completedWorkoutsCollection), where("userId", "==", auth.currentUser.uid));

      const querySnapshot = await getDocs(q);
      let workoutsArray = [];
      querySnapshot.forEach((doc) => {
        let workout = doc.data();
        workout.id = doc.id;
        workout.createdDate = workout.created.toDate();
        workoutsArray.push(workout);
      });

      console.log(workoutsArray);

      commit('setCompletedWorkouts', workoutsArray);

      // let exercisesArray = [];
      // workoutsArray.forEach(workout => {
      //   workout.exercises.forEach(exercise => {
      //     exercisesArray.push(exercise);
      //   });
      // });

      // console.log(exercisesArray);

      // commit('setLoggedExercises', exercisesArray);
    },

    async logWorkout ({ state }, details) {

      const docRef = await addDoc(collection(db, completedWorkoutsCollection), {
        userId: state.user.uid,
        workoutId: details.workoutId,
        name: details.name,
        exercises: details.exercises,
        created: Timestamp.now()
      });
      console.log("Document written with ID: ", docRef.id);

      return state
  
    },


    async getWorkout ({ commit }, workout) {

      console.log(workout.id);

      const docRef = doc(db, userWorkoutsCollection, workout.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const workout = docSnap.data();
        workout.id = docSnap.id;
        workout.createdDate = workout.created.toDate();
        console.log("Document data:", workout);
        commit('setWorkout', workout);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    },

    async getUserWorkouts ({ commit }) {

      const q = query(collection(db, userWorkoutsCollection), where("userId", "==", auth.currentUser.uid));

      const querySnapshot = await getDocs(q);
      let workoutsArray = [];
      querySnapshot.forEach((doc) => {
        let workout = doc.data();
        workout.id = doc.id;
        workout.createdDate = workout.created.toDate();
        console.log("Document data:", workout);
        workoutsArray.push(workout);
      });
      commit('setUserWorkouts', workoutsArray);
    },

    async createWorkout ({ state }, details) {

      const docRef = await addDoc(collection(db, userWorkoutsCollection), {
        userId: state.user.uid,
        name: details.name,
        exercises: details.exercises,
        created: Timestamp.now()
      });
      console.log("Document written with ID: ", docRef.id);

      return state
  
    },

    async getExercises ({ commit }) {
      const querySnapshot = await getDocs(collection(db, exercisesCollection));
      let exerciseArray = [];
      querySnapshot.forEach((doc) => {
        let exercise = doc.data();
        exercise.id = doc.id;
        exerciseArray.push(exercise);
      });
      commit('setExercises', exerciseArray);
    },

    async addExercise ({ state }, details) {

      console.log(details);

      const docRef = await addDoc(collection(db, exercisesCollection), {
        name: details.name,
        description: details.description,
        bodyPosition: details.bodyPosition,
        muscleGroup: details.muscleGroup,
        created: Timestamp.now()
      });
      console.log("Document written with ID: ", docRef.id);

      return state
  
    },

  
    async login ({dispatch }, details) {

      console.log(details);

      try {
        const { user } = await signInWithEmailAndPassword(auth, details.email, details.password)
        console.log(user);
        dispatch('fetchUserProfile', user)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }
        return
      }
    },
  
    async register ({dispatch}, details) {
  
      try {
        // create user
        const { user } = await createUserWithEmailAndPassword(auth, details.email, details.password)
        await setDoc(doc(db, usersCollection, user.uid), {
          firstName: details.firstName,
          lastName: details.lastName
        });
        // create user profile in DB
        dispatch('fetchUserProfile', user)
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break
          case 'auth/invalid-email':
            alert("Invalid email")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }
  
        return
      }
    },
  
    async logout ({ commit }) {
      await signOut(auth)
  
      commit('CLEAR_USER')
  
      router.push('/login')
    },
  
    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)
          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },

    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const docRef = doc(db, usersCollection, user.uid);
      const userProfile = await getDoc(docRef);

      if (userProfile.exists()) {
        // set user profile in state
        commit('SET_USER', user)
        commit('setUserProfile', userProfile.data())
        if (router.isReady() && router.currentRoute.value.path === '/login') {
          router.push('/')
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No user found!");
      }
    }
  },
  modules: {
  }
})
