import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'

// createApp(App).use(store).use(router).mount('#app')

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})