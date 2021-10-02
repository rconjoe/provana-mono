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
import onboardRetry from '../views/onboardRetry.vue'

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
    path: "/onboardSuccess",
    name: "StripeOnboardSuccess",
    component: StripeOnboardSuccess
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
  {
    path: "/onboardRetry",
    name: "onboardRetry",
    component: onboardRetry
  }
];
