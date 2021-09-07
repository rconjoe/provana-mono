import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import vuetify from './plugins/vuetify';
import { routes } from './router/index'
import { store } from './store/index'
import { auth } from './plugins/firebase'
import { db } from './plugins/firebase'

// turn off development mode warning
Vue.config.productionTip = false

// initialize router:
Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  mode: "history",
});

// these guards turn the loading bar on and off on route loads
router.afterEach(async (to, from) => {
    await store.dispatch('loading/setLoading', false)
})

router.beforeEach(async (to, from, next) => {
    await store.dispatch('loading/setLoading', true)
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!auth.currentUser) {
        next({
          path: '/login',
        })
      } else {
        next()
      }
    } else {
      next()
    }
})

// instantiate vue app, but don't mount it:
const app = new Vue({
  router: router,
  store,
  vuetify,
  render: h => h(App),
})

// global error handling mixin
Vue.mixin({
  methods: {
    setError(show, message, color, icon) {
      this.$store.commit('error/SET_ERROR', {
        show: show,
        message: message,
        color: color,
        icon: icon
      })
    }
  }
})

auth.onAuthStateChanged(async (user) => {
  const isAuthed = Boolean(user);
  const { meta } = router.history.current;
  store.commit('loading/SET_LOADING', true)

  if (isAuthed) {
    await auth.currentUser.getIdTokenResult()
      .then(async (idTokenResult) => {
        store.commit('auth/SET_CLAIMS', idTokenResult.claims)
        await store.dispatch('auth/bindProfile', user.uid)
        Vue.prototype.$user = user
        Vue.prototype.$user.type = idTokenResult.claims.type
      })
    }

    await store.dispatch('auth/setTimezone')
    store.commit('loading/SET_LOADING', false)
    if (isAuthed && meta.isPublicOnly) {
      router.push('/dashboard')
    }
    else if (!isAuthed && meta.isPrivate) {
      router.push('/login')
    }
    app.$mount('#app')
})
