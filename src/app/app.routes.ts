import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    data: { title: 'Inlingua | Login' },
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'register-form',
    data: { title: 'Inlingua | Lead Sheet' },
    loadComponent: () =>
      import('./home/leads/leadsheet/leadsheet.component').then((m) => m.LeadsheetComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'dashboard',
        data: { title: 'Inlingua | Dashboard' },
        loadComponent: () =>
          import('./home/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'chating',
        data: { title: 'Inlingua | Chating' },
        loadComponent: () =>
          import('./home/chating/chating.component').then(
            (m) => m.ChatingComponent
          ),
      },
      {
        path: 'leads',
        data: { title: 'Inlingua | Leads' },
        loadComponent: () =>
          import('./home/leads/leads.component').then((m) => m.LeadsComponent),
      },
      {
        path: 'leads/addleads',
        data: { title: 'Inlingua | Add Leads' },
        loadComponent: () =>
          import('./home/leads/add-leads/add-leads.component').then(
            (m) => m.AddLeadsComponent
          ),
      },
      {
        path: 'leads/import',
        data: { title: 'Inlingua | Import Leads' },
        loadComponent: () =>
          import('./home/leads/import-leads/import-leads.component').then(
            (m) => m.ImportLeadsComponent
          ),
      },
      {
        path: 'leads/export',
        data: { title: 'Inlingua | Export Leads' },
        loadComponent: () =>
          import('./home/leads/export-leads/export-leads.component').then(
            (m) => m.ExportLeadsComponent
          ),
      },

      {
        path: 'studens',
        data: { title: 'Inlingua | Studens' },
        loadComponent: () =>
          import('./home/students/students.component').then(
            (m) => m.StudentsComponent
          ),
      },
      {
        path: 'trainers',
        data: { title: 'Inlingua | Trainers' },
        loadComponent: () =>
          import('./home/trainers/trainers.component').then(
            (m) => m.TrainersComponent
          ),
      },
      {
        path: 'setting',
        data: { title: 'Inlingua | Setting' },
        loadComponent: () =>
          import('./home/setting/setting.component').then(
            (m) => m.SettingComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
