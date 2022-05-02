<template>
  <router-view id="page"/>
  <div id="nav" v-if="userProfile">
    <router-link to="/">Dashboard</router-link>
    <router-link to="/exercises">Exercises</router-link>
    <router-link to="/workouts">Start workout</router-link>
    <router-link to="/completed-workouts">History</router-link>
    <a target="_blank" rel="noopener noreferrer" @click="$store.dispatch('logout')">Logout</a>
  </div>
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
  },
  methods: {

  }
}
</script>

<style lang="scss">
html{
  height: 100%;
}
body{
  margin: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  max-width: 900px;
  margin: auto;
  box-sizing: border-box;
  overflow: hidden;
}
ul{
  padding: 0;
}
#nav {
  width: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 3.5rem;
  border-top: 1px solid #eee;
  background: #fff;
  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 12px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#page{
  height: calc(100vh - 5rem);
  padding: 1.5rem;
  overflow: scroll;
}
h1{
  text-align: left;
}
button{
  height: fit-content;
  margin: .25rem;
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
  box-sizing: border-box;
  border-radius: .5rem;
  justify-content: space-between;
  img{
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1.5rem;
  }
}
.log-exercise-card{
  display: block;
  form{
    display: flex;
    width: 100%;
    max-width: none;
    padding: 0;
    justify-content: space-between;
    input{
      max-width: 3rem;
    }
  }
}
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
  align-items: flex-end;
}
.workout-card{
  width: 40rem;
  background: #fff;
  height: 85vh;
  overflow-y: scroll;
  border-radius: 1rem 1rem 0 0;
  text-align: left;
  padding: 2rem;
  z-index: 100;
}
.hide{
  display: none;
}
.show{
  display: block;
}
</style>
