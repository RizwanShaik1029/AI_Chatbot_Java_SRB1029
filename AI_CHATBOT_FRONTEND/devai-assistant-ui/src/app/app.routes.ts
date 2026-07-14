import { Routes } from '@angular/router';

import { Landing } from './pages/landing/landing';
import { Signup } from './pages/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';

export const routes: Routes = [

  {
    path: '',
    component: Landing
  },


  {
    path: 'login',
    component: Login
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'dashboard',
    component: Dashboard
  }

];
