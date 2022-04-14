<template>
  <div>

    <h1>Logged workouts</h1>

    <div class="exercises-list">
      <ul>
        <li v-for="(workout, i) in loggedWorkouts" :key="i">
          <div class="exercise-card" @click="showWorkout = workout">
            <div class="content">
              <h3>{{workout.name}}</h3>
              <p>{{formatDate(workout.createdDate) }}</p>
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
                  <p>{{exercise.description}}</p>
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
  name: 'LoggedWorkouts',
  components: {
    
  },
  data() { 
    return {
      showWorkout: false,
    }; 
  },
  computed: {
    ...mapState(['userProfile', 'loggedWorkouts']),
  },
  mounted(){
    this.$store.dispatch('getLoggedWorkouts');
  },
  methods: {
    formatDate(value) {
      return moment(value).format("MMM Do YY"); 
    },
  },  
}
</script>

<style lang="scss">
.overlay{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.4);
  display: flex;
  z-index: 99;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
}
.workout-card{
  width: 40rem;
  background: #fff;
  max-height: 80vh;
  overflow-y: scroll;
  border-radius: 1rem;
  text-align: left;
  padding: 2rem;
  z-index: 100;
}
</style>