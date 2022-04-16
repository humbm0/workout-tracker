<template>
  <div>

    <div class="active-workout" v-if="!workoutComplete">
      <h1 v-if="workout">{{workout.name}}</h1>
      <p v-if="workout.exercises">Exercises: {{workout.exercises.length}}</p>

      <div v-for="(workoutExercise, i) in workout.exercises" :key="i" v-show="i==exerciseIndex" class="exercise-card">
        <h3>{{i+1}}.{{workoutExercise.name}}</h3>
        <p>Sets: {{workoutExercise.sets}} | Rest: {{workoutExercise.rest}}secs</p>
        <form @submit.prevent v-for="(set, i) in workoutExercise.sets" :key="i" v-show="i==setIndex">
          <h4>Set {{i+1}}</h4>
          <input 
            type="number" 
            placeholder="Weight"
            v-model="currentSet.weight" />
          <input 
            type="number" 
            placeholder="Reps"
            v-model="currentSet.reps" />
          <button @click="saveSet(workoutExercise)">Log set</button>
        </form>
      </div>
    </div>

    <div class="complete-workout" v-if="workoutComplete">
      <h1>Well done! Workout complete!</h1>
      
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
      exerciseIndex: 0,
      setIndex: 0,
      currentWorkout: {
        exercises: [],
      },
      currentSet: {
        weight: '',
        reps: '',
      },
      workoutComplete: false,
    }; 
  },
  computed: {
    ...mapState(['userProfile', 'exercises', 'userWorkouts', 'workout', 'completedWorkout']),
  },
  created(){
    this.$store.dispatch('getWorkout', { id: this.$route.params.workoutId })
  },
  methods: {
    saveSet(exercise){
      console.log(exercise);

      // save set to completed exercises database
      this.$store.dispatch('saveCompletedExercise', {
          completedWorkoutId: this.completedWorkout.id,
          exerciseId: exercise.exerciseId,
          exerciseIndex: this.exerciseIndex,
          setIndex: this.setIndex,
          weight: this.currentSet.weight,
          reps: this.currentSet.reps,
      })

      if (this.exerciseIndex == this.workout.exercises.length - 1 && this.setIndex == exercise.sets - 1) {
        // workout complete
        this.workoutComplete = true;
        this.$store.dispatch('getWorkoutExercises', this.completedWorkout.id)
      } else if (this.setIndex < exercise.sets - 1) {
        // move to next set
        this.setIndex ++; 
      } else {
        // sets complete move to next workout
        this.exerciseIndex ++;
        this.setIndex = 0;
      }

    },
    // logSet(exercise){
    //   const set = {
    //     exerciseId: exercise.exerciseId,
    //     name: exercise.name,
    //     weight: this.currentSet.weight,
    //     reps: this.currentSet.reps,
    //   }

		// 	this.currentWorkout.exercises.push(set);

    //   if (this.exerciseIndex == this.workout.exercises.length - 1 && this.setIndex == exercise.sets - 1) {
    //     console.log(this.setIndex);
    //     console.log("workout complete!");
    //     this.$store.dispatch('logWorkout', {
    //       workoutId: this.workout.id,
    //       name: this.workout.name,
    //       exercises: this.currentWorkout.exercises
    //     })
    //     this.workoutComplete = true;
    //   } else if (this.setIndex < exercise.sets - 1) {
    //     this.setIndex ++; 
    //   } else {
    //     this.exerciseIndex ++;
    //     this.setIndex = 0;
    //   }
    // }
  },  
}
</script>

<style lang="scss">

</style>