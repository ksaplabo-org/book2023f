import Vue from 'vue';
import Router from 'vue-router';

import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import SignUpConfirm from './views/SignUpConfirm.vue';
import SignOut from './views/SignOut.vue';
import Sorry from './views/Sorry.vue';
import Menu from './views/Menu.vue';
import RentalBook from './views/RentalBook.vue';
import MainteBook from './views/MainteBook.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'signin',
      props: true,
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'signup',
      props: true,
      component: SignUp,
    },
    {
      path: '/signupconfirm',
      name: 'signupconfirm',
      props: true,
      component: SignUpConfirm,
    },
    {
      path: '/signout',
      name: 'signout',
      component: SignOut,
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
    },
    {
      path: '/rentalbook',
      name: 'rentalbook',
      component: RentalBook,
    },
    {
      path: '/maintebook',
      name: 'maintebook',
      component: MainteBook,
    },
    {
      path: '*',
      name: 'sorry',
      component: Sorry,
    }
  ],
});
