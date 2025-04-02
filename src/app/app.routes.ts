import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    data: { title: 'Inlingua | Login' },
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent),

  },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: 'dashboard',
        data: { title: 'Inlingua | Dashboard' },
        loadComponent: () => import('./home/dashboard/dashboard.component').then(m => m.DashboardComponent),

      },
      {
        path: 'leads',
        data: { title: 'Inlingua | Leads' },
        loadComponent: () => import('./home/leads/leads.component').then(m => m.LeadsComponent),

      },
      {
        path: 'studens',
        data: { title: 'Inlingua | Studens' },
        loadComponent: () => import('./home/students/students.component').then(m => m.StudentsComponent),

      },
      {
        path: 'trainers',
        data: { title: 'Inlingua | Trainers' },
        loadComponent: () => import('./home/trainers/trainers.component').then(m => m.TrainersComponent),

      },
      {
        path: 'setting',
        data: { title: 'Inlingua | Setting' },
        loadComponent: () => import('./home/setting/setting.component').then(m => m.SettingComponent),

      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent),
  }
];
