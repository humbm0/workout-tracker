<template>
  <div>

    <div class="active-workout" v-if="!workoutComplete && workout">
      <h1>{{workout.name}}</h1>
      <p>Exercises: {{workout.exercises.length}}</p>

      <div v-for="(workoutExercise, exerciseIndex) in workout.exercises" :key="exerciseIndex" class="exercise-card log-exercise-card">
        <h3>{{exerciseIndex+1}}.{{workoutExercise.name}}</h3>
        <p>Sets: {{workoutExercise.sets}} | Reps: {{workoutExercise.minReps}}-{{workoutExercise.maxReps}} | Rest: {{workoutExercise.rest}}secs</p>
        <form @submit.prevent v-for="(set, setIndex) in workoutExercise.sets" :key="setIndex" >
          <p>Set {{setIndex+1}}</p>
          <input 
            type="number" 
            placeholder="Weight"
            v-model="sets.weight[workoutExercise.exerciseId + setIndex]" />
          <input 
            type="number" 
            placeholder="Reps"
            v-model="sets.reps[workoutExercise.exerciseId + setIndex]" />
          <button v-if="!sets.status[workoutExercise.exerciseId + setIndex] || sets.status[workoutExercise.exerciseId + setIndex] == 'empty'" @click="saveSet(workoutExercise, exerciseIndex, setIndex)">Save</button>
          <button v-if="sets.status[workoutExercise.exerciseId + setIndex] == 'completed'" @click="editSet(workoutExercise, exerciseIndex, setIndex)">Edit</button>
        </form>
      </div>
      <button @click="finishWorkout">Finish</button>
    </div>

    <div class="complete-workout" v-if="workoutComplete">
      <h1>Well done! Workout complete!</h1>
      <div class="exercises-list">
          <ul>
            <li v-for="(exercise, i) in completedWorkoutExercises" :key="i">
              <div class="exercise-card">
                <div class="content">
                  <h3>{{exercise.name}}</h3>
                  <p>Set: {{exercise.setIndex + 1}}</p>
                  <p>Weight: {{exercise.weight}}kg | Reps: {{exercise.reps}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapState } from 'vuex'

export default {
  name: 'LogWorkout',
  components: {
    
  },
  data() { 
    return {
      currentWorkout: {
        exercises: [],
      },
      currentSet: {
        weight: '',
        reps: '',
      },
      sets: {
        weight: {},
        reps: {},
        status:{}
      },
      completedExercises: [],
      workoutComplete: false,
    }; 
  },
  computed: {
    ...mapState(['userProfile', 'exercises', 'userWorkouts', 'workout', 'completedWorkoutExercises']),
  },
  async mounted(){
    this.$store.dispatch('getWorkout', { id: this.$route.params.workoutId });
    await this.$store.dispatch('getCompletedWorkoutExercises', this.$route.params.completedWorkoutId);
    this.mapCompletedExercises(); 
  },
  methods: {
    mapCompletedExercises(){
      console.log(this.completedWorkoutExercises);
    },
    editSet(exercise, setIndex){
      this.sets.status[exercise.exerciseId + setIndex] = "empty";
      console.log(this.sets.status);
    },
    saveSet(exercise, exerciseIndex, setIndex){
      const set = {
        completedWorkoutId: this.$route.params.completedWorkoutId ,
        exerciseId: exercise.exerciseId,
        name: exercise.name,
        exerciseIndex: exerciseIndex,
        setIndex: setIndex,
        weight: this.sets.weight[exercise.exerciseId + setIndex],
        reps: this.sets.reps[exercise.exerciseId + setIndex],
      }
      console.log(set);

      // save set to completed exercises database
      // this.$store.dispatch('saveSet', set)

      this.sets.status[exercise.exerciseId + setIndex] = "completed";

      this.completedExercises.push(set);
      console.log(this.completedExercises);
    },
    finishWorkout(){
      // this.workoutComplete = true;
      console.log(this.sets);
      this.$store.dispatch('getCompletedWorkoutExercises', this.$route.params.completedWorkoutId)
    }
  },  
}
</script>

<style lang="scss">

</style>