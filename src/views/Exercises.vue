<template>
  <div>

    <h1>Exercises</h1>
    <div class="exercises-list">
      <ul>
        <li v-for="(exercise, i) in exercises" :key="i">
          <div class="exercise-card">
            <img src="" alt="">
            <div class="content">
              <h3>{{exercise.name}}</h3>
              <p>{{exercise.description}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div>
      <h2>Add exercise</h2>
      <form class="addExercise" @submit.prevent="addExercise">
        <input 
          type="name" 
          placeholder="Name"
          v-model="exercise.name" />
        <input 
          type="textarea" 
          placeholder="Description"
          v-model="exercise.description" />
        <div class="radio-buttons">
          <p>Upper or lower body?</p>
          <div class="button">
            <input type="radio" id="upper" value="Upper" v-model="exercise.bodyPosition">
            <label for="upper">Upper</label>
          </div>
          <div class="button">
            <input type="radio" id="lower" value="Lower" v-model="exercise.bodyPosition">
            <label for="lower">Lower</label>
          </div>
        </div>
        <input 
          type="text" 
          placeholder="Muscle group" 
          v-model="exercise.muscleGroup" />
        <input 
          type="submit" 
          value="addExercise" />
      </form>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapState } from 'vuex'

export default {
  name: 'Exercises',
  components: {
    
  },
  data() { 
    return { 
      exercise: {
        name: '',
        description: '',
        bodyPosition: '',
        muscleGroup: ''
      }
    }; 
  },
  computed: {
    ...mapState(['userProfile', 'exercises']),
  },
  mounted(){
    this.$store.dispatch('getExercises')
  },
  methods: {
    addExercise() {
			this.$store.dispatch('addExercise', {
				name: this.exercise.name,
				description: this.exercise.description,
        bodyPosition: this.exercise.bodyPosition,
        muscleGroup: this.exercise.muscleGroup,
			})

      this.$store.dispatch('getExercises')

      this.exercise.name = ''
			this.exercise.description = ''
      this.exercise.bodyPosition = ''
      this.exercise.muscleGroup = ''
		},
  },  
}
</script>

<style lang="scss">

</style>