<template>
  <div> 

    <h1 v-if="userProfile">Welcome back {{userProfile.firstName}}</h1>
    <div v-if="completedWorkouts">
      <h4>Completed workouts</h4>
      <h1>{{completedWorkouts.length}}</h1>
    </div>

    <div v-if="groupedExercises">
      <h4>Completed exercises</h4>
      <h1>{{Object.keys(groupedExercises).length}}</h1>
      <div class="exercises-list">
        <ul>
          <li v-for="(exercises, i) in groupedExercises" :key="i">
            <div class="exercise-card">
              <div class="content">
                <h3>{{exercises[0].name}}</h3>
                <p>Sets: {{exercises.length}}</p>
                <div v-for="(set, i) in sortByWeight(exercises)" :key="i">
                  <span>Best weight: {{set.weight}}</span> | <span> Reps: {{set.reps}}</span>
                </div>
              </div>
              <div>
                <button @click="viewSets(exercise)">View sets</button>
                <button @click="deleteExercise(exercise)">Delete</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

     <div v-if="showExercise" class="overlay" @click="showExercise = false">
      <div class="workout-card">
        <h2>{{showExercise[0].name}}</h2>
        <div class="exercises-list">
          <ul>
            <li v-for="(exercise, i) in orderExerciseByWeight" :key="i">
              <div class="exercise-card">
                <div class="content">
                  <p>Weight: {{exercise.weight}}</p>
                  <p>Reps: {{exercise.reps}}</p>
                  <p>Date: {{formatDate(exercise.createdDate) }}</p>
                  <p>Set: {{exercise.setIndex + 1}}</p>
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
var _ = require('lodash');
import moment from 'moment'

export default {
  name: 'Home',
  components: {
    
  },
  data() { 
    return { 
      showExercise: null,
    }; 
  },
  computed: {
    groupedExercises(){
      const exercises = this.completedExercises;
      const groupedExercises = _.groupBy(exercises, exercise => exercise.exerciseId);

      return groupedExercises
    },
    orderExerciseByDate(){
      const reps = this.showExercise;
      reps.sort( ( a, b) => {
          return new Date(a.created.seconds) - new Date(b.created.seconds);
      });

      return this.showExercise;
    },
    orderExerciseByWeight(){
      const reps = this.showExercise;
      reps.sort( ( a, b) => {
          return b.weight - a.weight;
      });

      return this.showExercise;
    },
    ...mapState(['userProfile', 'completedWorkouts', 'completedExercises']),
  },
  mounted(){
    this.$store.dispatch('getCompletedWorkouts');
    this.$store.dispatch('getCompletedExercises');
  },
  methods: { 
    sortByWeight(exercises){
      const sets = exercises;
      sets.sort( ( a, b) => {
          return b.weight - a.weight;
      });

      console.log(sets);

      return sets;
    },
    formatDate(value) {
        return moment(value).format("MMM Do YY"); 
    },
    viewSets(exercise){
      console.log(exercise);
      this.showExercise = exercise;
    },
    deleteExercise(exercise){
      this.$store.dispatch('deleteCompletedExercise', exercise.id);
    },
  },  
}
</script>
