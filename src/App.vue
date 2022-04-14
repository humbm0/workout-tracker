<template>
  <div id="nav" v-if="userProfile">
    <router-link to="/">Home</router-link> |
    <router-link to="/exercises">Exercises</router-link>
    <router-link to="/workouts">Workouts</router-link>
    <router-link to="/logged-workouts">Logged workouts</router-link>
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view/>
</template>

<script>
import { mapState } from 'vuex'
// import { onBeforeMount } from 'vue'
// import { useStore } from 'vuex'
// export default {
//   setup() {
//     const store = useStore()
//     onBeforeMount(() => {
//       store.dispatch('fetchUser')
//     })
//   }
// }
export default {
  components: {
  },
  computed: {
    ...mapState(['userProfile']),
    // showNav() {
    //   return Object.keys(this.userProfile).length > 0
    // }
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 900px;
  margin: auto;
  box-sizing: border-box;
}
ul{
  padding: 0;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 1rem;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
button{
  height: fit-content;
}
.exercises-list{
  li{
    list-style: none;
  }
}
.exercise-card{
  display: flex;
  width: 100%;
  text-align: left;
  margin-bottom: 1.5rem;
  border: 1px solid #eee;
  padding: 1rem;
  align-items: center;
  box-sizing: border-box;
  border-radius: .5rem;
  img{
    width: 150px;
    height: 150px;
    margin-right: 1.5rem;
  }
}
</style>
