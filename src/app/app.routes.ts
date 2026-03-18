import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Dashboard } from './layout/dashboard/dashboard';
import { Customers } from './layout/customers/customers';
import { Addcustomers } from './layout/customers/addcustomers/addcustomers';
import { Updatecustomers } from './layout/customers/updatecustomers/updatecustomers';
import { Creditcards } from './layout/creditcards/creditcards';
import { Addcards } from './layout/creditcards/addcards/addcards';
import { Updatecards } from './layout/creditcards/updatecards/updatecards';
import { About } from './layout/about/about';
import { Login } from './auth/login/login';

import { AuthGuard } from './auth/auth-guard';
import { RoleGuard } from './auth/role-guard';

export const routes: Routes = [

  
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  
  { path: 'login', component: Login },

  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [

      { path: 'dashboard', component: Dashboard },

      {
        path: 'customers',
        component: Customers,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'EMPLOYEE'] }
      },
      {
        path: 'customers/add',
        component: Addcustomers,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'EMPLOYEE'] }
      },
      {
        path: 'customers/update/:id',
        component: Updatecustomers,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'EMPLOYEE'] }
      },

      {
        path: 'creditcards',
        component: Creditcards,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'creditcards/add',
        component: Addcards,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'creditcards/update/:id',
        component: Updatecards,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },

      { path: 'about', component: About }

    ]
  },

  { path: '**', redirectTo: 'login' }
];
