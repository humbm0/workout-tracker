<template>
  <div>

    <h1>History</h1>

    <div class="exercises-list">
      <ul>
        <li v-for="(workout, i) in completedWorkouts" :key="i">
          <div class="exercise-card">
            <div class="content">
              <h3>{{workout.name}}</h3>
              <p>{{formatDate(workout.createdDate) }}</p>
            </div>
            <div>
              <button @click="viewWorkout(workout)">View</button>   
              <button @click="deleteWorkout(workout)">Delete</button>  
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
            <li v-for="(exercise, i) in sortedExercises" :key="i">
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

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'CompleteWorkouts',
  components: {
    
  },
  data() { 
    return {
      showWorkout: false,
    }; 
  },
  computed: {
    sortedExercises() {
      const exercises = this.completedWorkoutExercises;
      return exercises.sort((a, b) => a.exerciseIndex - b.exerciseIndex || a.setIndex - b.setIndex );
    },
    ...mapState(['userProfile', 'completedWorkouts', 'completedWorkoutExercises'])
  },
  mounted(){
    this.$store.dispatch('getCompletedWorkouts');
  },
  methods: {
    formatDate(value) {
      return moment(value).format("MMM Do YY"); 
    },
    viewWorkout(workout){
      this.showWorkout = workout;
      this.$store.dispatch('getCompletedWorkoutExercises', workout.id);
    },
    deleteWorkout(workout){
      this.$store.dispatch('deleteCompletedWorkout', workout.id);
    },
  },  
}
</script>

<style lang="scss">

</style>