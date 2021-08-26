import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth'
import { loading } from './loading'
import { error } from './error'
import { dashboard } from './dashboard'
import { notifications } from './notifications'
import { tz } from './tz'

Vue.use(Vuex)
export const store = new Vuex.Store({
    // split into modules:
    modules: {
        auth,
        loading,
        error,
        dashboard,
        notifications,
        tz
    }
});
