import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import vuetify from './plugins/vuetify';
import { routes } from './router/index'
import { store } from './store/index'
import { auth } from './plugins/firebase'

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

// mount the app inside this auth state watcher.
// onAuthStateChanged returns the new user object every time there is a change in auth state.
// we put the user object everywhere it needs to be in the vue app BEFORE we mount the app:

// when our auth state changes, take the new user object (or null on logout) and do the following:
auth.onAuthStateChanged(async (user) => {

  const isAuthed = Boolean(user);
  const { meta } = router.history.current;


  // turn on loading bar
  store.commit('loading/SET_LOADING', true)

  if (isAuthed) {
    // set username, email, and UID to vuex store
    store.commit('auth/SET_USER', {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL
    })

    // other than the above three fields, our JWT's contain custom claims that must be fetched from the server:
    await auth.currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        store.commit('auth/SET_CLAIMS', {
          type: idTokenResult.claims.type,
          isPartner: idTokenResult.claims.isPartner
        })
      })
    }

    store.dispatch('tz/setTimezone')

    // turn off loading bar
    store.commit('loading/SET_LOADING', false)

    // set the user object to a vue prototype, enabling this.$user globally
    Vue.prototype.$user = user;

    if (isAuthed && meta.isPublicOnly) {
      router.push('/dashboard')
    } else if (!isAuthed && meta.isPrivate) {
      router.push('/login')
    }

    // mount the vue app to the DOM, beginning component lifecycles
    app.$mount('#app')
})
