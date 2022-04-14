import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import('../views/Exercises.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: () => import('../views/Workouts.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logged-workouts',
    name: 'LoggedWorkouts',
    component: () => import('../views/LoggedWorkouts.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/log-workout/:workoutId',
    name: 'LogWorkout',
    component: () => import('../views/LogWorkout.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  mode: 'hash',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }

})

export default router