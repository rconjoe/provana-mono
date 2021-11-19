import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 1400,
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#D41458',
        secondary: '#FB4B6A'
      }
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
