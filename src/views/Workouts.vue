<template>
  <div>

    <h1>Workouts</h1>

    <div class="exercises-list">
      <ul>
        <li v-for="(workout, i) in userWorkouts" :key="i">
          <div class="exercise-card">
            <div class="content">
              <h3>{{workout.name}}</h3>
              <p>{{workout.exercises.length}} exercises</p>
              <p>{{formatDate(workout.createdDate)}}</p>
            </div>
            <div>
              <button @click="viewWorkout(workout)">View</button>
              <button @click="startWorkout(workout)">Start workout</button>
              <button @click="deleteWorkout(workout)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>


    <h2>Add workouts</h2>

    <input 
      type="name" 
      placeholder="Name"
      v-model="workout.name" />
    
   <div class="exercises-list">
      <ul>
        <li v-for="(workoutExercise, i) in workout.exercises" :key="i">
          <div class="exercise-card">
            <div class="content">
              <h3>{{workoutExercise.name}}</h3>
              <p>Sets: {{workoutExercise.sets}} | Reps: {{workoutExercise.minReps}} - {{workoutExercise.maxReps}} | Rest: {{workoutExercise.rest}}secs</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="showWorkout" class="overlay" @click="showWorkout = false">
      <div class="workout-card">
        <h2>{{showWorkout.name}}</h2>
        <p>{{formatDate(showWorkout.createdDate) }}</p>
        <div class="exercises-list">
          <ul>
            <li v-for="(exercise, i) in showWorkout.exercises" :key="i">
              <div class="exercise-card">
                <div class="content">
                  <h3>{{exercise.name}}</h3>
                  <p>Sets: {{exercise.sets}}</p>
                  <p>Reps: {{exercise.minReps}} - {{exercise.maxReps}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button @click="startWorkout(showWorkout)">Start workout</button>
        <button @click="deleteWorkout(showWorkout)">Delete</button>
      </div>
    </div>
      
    <button @click="addExerciseForm = true">Add exercise</button>
    <div v-if="addExerciseForm">
      <form  @submit.prevent="addExercise">
        <label for="cars">Choose exercise:</label>
        <select name="exercises" id="exercises" v-model="selectedExercise">
          <option v-for="(exercise, i) in exercises" :key="i" :value="exercise">{{exercise.name}}</option>
        </select>
        <input 
          type="number" 
          placeholder="Sets"
          v-model="exercise.sets" />
        <input 
          type="number" 
          placeholder="Min reps"
          v-model="exercise.minReps" />
        <input 
          type="number" 
          placeholder="Max reps"
          v-model="exercise.maxReps" />
          <input 
          type="number" 
          placeholder="Rest between sets in seconds"
          v-model="exercise.rest" />
          <input 
          type="submit" 
          value="addExercise" />
            
      </form>
    </div>

    <button @click="createWorkout">Create workout</button>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Workouts',
  components: {
    
  },
  data() { 
    return {
      addExerciseForm: false,
      selectedExercise: null, 
      exercise: {
        exerciseId: '',
        name: '',
        sets: '',
        minReps: '',
        maxReps: '',
        rest: '',
      },
      workout: {
        name: '',
        exercises: [],
      },
      showWorkout: false,
    }; 
  },
  computed: {
    ...mapState(['userProfile', 'exercises', 'userWorkouts']),
  },
  mounted(){
    this.$store.dispatch('getExercises');
    this.$store.dispatch('getUserWorkouts');
  },
  methods: {
    formatDate(value) {
        return moment(value).format("MMM Do YY"); 
    },
    viewWorkout(workout){
      console.log(workout);
      this.showWorkout = workout;
    },
    async startWorkout(workout){
      console.log(workout);
      // create initial instance if completed workout
      this.$store.dispatch('createCompletedWorkout', {
          workoutId: workout.id,
          name: workout.name
      })
      // this.$router.push({name:'LogWorkout',params:{workoutId:workout.id, completedWorkoutId:this.completedWorkoutId}});
    },
    addExercise() {
      const workoutExercise = {
        exerciseId: this.selectedExercise.id,
        name: this.selectedExercise.name,
        sets: this.exercise.sets,
        minReps: this.exercise.minReps,
        maxReps: this.exercise.maxReps,
        rest: this.exercise.rest
      }

			this.workout.exercises.push(workoutExercise);
		},
    createWorkout(){
      this.$store.dispatch('createWorkout', {
				name: this.workout.name,
        exercises: this.workout.exercises,
			})
      this.$store.dispatch('getUserWorkouts');

      this.workout.name = '';
			this.workout.exercises = [];
    },
    deleteWorkout(workout){
      this.$store.dispatch('deleteWorkout', workout.id);
    },
  },  
}
</script>

<style lang="scss">

</style>