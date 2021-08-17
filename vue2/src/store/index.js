import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth'
import { viewing } from './viewing'
import { loading } from './loading'
import { error } from './error'
import { dashboard } from './dashboard'
import { notifications } from './notifications'

Vue.use(Vuex)
export const store = new Vuex.Store({
    // split into modules:
    modules: {
        auth,
        viewing,
        loading,
        error,
        dashboard,
        notifications
    }
});
