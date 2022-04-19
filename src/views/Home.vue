<template>
  <div>   
    <h1 v-if="userProfile">Welcome back {{userProfile.firstName}}</h1>
    <div v-if="completedWorkouts">
      <h4>Completed workouts</h4>
      <h1>{{completedWorkouts.length}}</h1>
    </div>
    <div v-if="completedExercises">
      <h4>Completed exercises</h4>
      <h1>{{completedExercises.length}}</h1>
      <div class="exercises-list">
        <ul>
          <li v-for="(exercise, i) in groupedExercises" :key="i">
            <div class="exercise-card">
              <div class="content">
                <h3>{{exercise[0].name}}</h3>
                <p>Sets: {{exercise.length}}</p>
                <span>Best weight: {{exercise[0].weight}}</span> | <span> Reps: {{exercise[0].reps}}</span>
              </div>
              <div>
                <button @click="deleteExercise(exercise)">Delete</button>
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
var _ = require('lodash');

export default {
  name: 'Home',
  components: {
    
  },
  data() { 
    return { 

    }; 
  },
  computed: {
    groupedExercises(){
      const exercises = this.completedExercises;
      const groupedExercises = _.groupBy(exercises, exercise => exercise.exerciseIndex);

      // const groupedExercises = _(exercises)
      //   .groupBy(exercises, exercise => exercise.exerciseIndex)
      //   .orderBy(exercises, ['weight'], ['desc'])
      //   .value()
      return groupedExercises
    },
    ...mapState(['userProfile', 'completedWorkouts', 'completedExercises']),
  },
  mounted(){
    this.$store.dispatch('getCompletedWorkouts');
    this.$store.dispatch('getCompletedExercises');
  },
  methods: { 
    deleteExercise(exercise){
      this.$store.dispatch('deleteCompletedExercise', exercise.id);
    },
  },  
}
</script>
