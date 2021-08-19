import Home from '../views/Home.vue'
import About from '../views/About.vue'
import User from '../views/User.vue'
import Register from "../views/Register.vue"
import Dashboard from "../views/Dashboard.vue"
import StripeOnboardSuccess from "../views/StripeOnboardSuccess.vue"
import Login from "../views/Login.vue"
import Support from "../views/Support.vue"
import Contact from '../views/Contact.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import PaymentFailure from '../views/PaymentFailure.vue'

import { store } from '../store/index'


export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/about',
    name:'About',
    component: About
  },
  {
    path:'/user/:username',
    name:'User',
    component: User,
    props: true,
    async beforeEnter (to, from, next) {
        await store.dispatch('viewing/name2data', to.params.username);
        next();
    }
  },
  {
    path:'/dashboard',
    name:'dashboard',
    component: Dashboard,
    meta: {
      isPrivate: true
      },
    },
  {
    path:"/Register",
    name:"Register",
    component: Register,
    meta: {
      isPublicOnly: true
    }
  },
  {
    path: "/onboardSuccess",
    name: "StripeOnboardSuccess",
    component: StripeOnboardSuccess
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      isPublicOnly: true
    }
  },
  {
    path: "/Support",
    name: "support",
    component: Support,
  },
  {
    path: "/Contact",
    name: "contact",
    component: Contact,
  },
  {
    // TODO: [PRV-229] add dynamic segment to this to accept session_id
    // https://stripe.com/docs/payments/checkout/custom-success-page#create-success-page
    path: "/paymentSuccess",
    name: "paymentSuccess",
    component: PaymentSuccess,
    props: route => ({ checkoutSessionId: route.query.session_id })
  },
  {
    path: "/cancelTransaction",
    name: "cancelTransaction",
    component: PaymentFailure,
  },
  {
    path: "/paymentFailure",
    name: "paymentFailure",
    component: PaymentFailure
  },
];
