<template>
  <div>   
    <div class="body">
      <div class="menu">Menu</div>
      <div class="page">
        <div class="surfer-names">
          <div class="surfers"></div>
          <div class="activities-column">
            Surfer couverage
          </div>
        </div>
        <div class="timetable">
          <div class="surfers-list">
            <div class="list">
              Activities
            </div>
          </div>
          <div class="staffing-bar">Staffing</div>
        </div>
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
  computed: {
    ...mapState(['userProfile', 'exercises']),
  },
  created(){
    
  },
  mounted(){

  },
}
</script>

<style lang="scss">
.body{
  display: flex;
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: 100vw;
}
.menu{
  width: 216px;
  height: 100%;
  background: yellow;
}
.page{
    display: flex;
    margin: auto;
    font-size: 20px;
    width: 100%;
    position: relative;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
.surfer-names{
  height: 100%;
  width: 257px;
  background: green;
  display: flex;
  flex-direction: column;
  .surfers{
    flex-grow: 1;
  }
  .activities-column{
    height: 200px;
  }
}
.timetable{
  overflow-x: scroll;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.surfers-list{
    background: #eee;
    width: 2000px;
    flex-grow: 1;
    overflow-y: scroll;
    .list{
      height: 2000px;
    }
}
.staffing-bar{
    background: #C4C4C4;
    height: 200px;
    width: 2000px;
}



</style>
