<template>
  <div>   
    <h1 v-if="userProfile">Welcome back {{userProfile.firstName}}</h1>
    <div>
      <h4>Completed workouts</h4>
      <h1 v-if="loggedWorkouts">{{loggedWorkouts.length}}</h1>
    </div>
    <div>
      <h4>Completed exercises</h4>
      <h1 v-if="loggedExercises">{{loggedExercises.length}}</h1>
      <div class="exercises-list">
        <ul>
          <li v-for="(exercise, i) in loggedExercises" :key="i">
            <div class="exercise-card">
              <div class="content">
                <h3>{{exercise.name}}</h3>
                <p>{{exercise.description}}</p>
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
  name: 'Home',
  components: {
    
  },
  data() { 
    return { 
      completedExercises: null
    }; 
  },
  computed: {
    ...mapState(['userProfile', 'loggedWorkouts', 'loggedExercises']),
  },
  mounted(){
    this.$store.dispatch('getLoggedWorkouts');
  },
  methods: { 
  
  },  
}
</script>
