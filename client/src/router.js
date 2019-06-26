import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import ViewPost from './views/ViewPost.vue';
import CreatePost from './views/Create.vue';
import editPost from './views/Edit.vue';
import pageNotFound from './views/pageNotFound.vue';

Vue.use(Router);

let routes = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/viewPost/:id',
      name: 'viewPost',
      component: ViewPost
    },
    {
      path: '/create',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: '/editPost/:id',
      name: 'editPost',
      component: editPost
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: pageNotFound
    }
  ]
});

routes.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.fullPath === '/dashboard') {
    if (token !== null) {
      next();
    } else {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    if (token !== null) {
      next('/dashboard');
    }
  }
  // if (to.fullPath === '/viewPost/:id') {
  //   if (token === null) {
  //     next('/login');
  //   }
  // },
  next();
});

export default routes;
