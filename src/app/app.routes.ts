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
      import('./home/students/students-register-form/students-register-form.component').then((m) => m.StudentsRegisterFormComponent),
  },
  {
    path: 'reset-password',
    data: { title: 'Inlingua | Set Password' },
    loadComponent: () =>
      import('./set-password/set-password.component').then((m) => m.SetPasswordComponent),
  },
  {
    path: 'student-account-verification',
    data: { title: 'Inlingua | Lead OTP Verification' },
    loadComponent: () =>
      import('./home/students/student-account-verify/student-account-verify.component').then((m) => m.StudentAccountVerifyComponent),
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
      // Leads
      {
        path: '',
        data: { title: 'Inlingua | Leads' },
        loadComponent: () =>
          import('./home/leads/leads.component').then(
            (m) => m.LeadsComponent
          ),
        children: [
          {
            path: 'leads',
            data: { title: 'Inlingua | All Leads list' },
            loadComponent: () =>
              import('./home/leads/all-leads/all-leads.component').then(
                (m) => m.AllLeadsComponent
              ),
          },
          {
            path: 'leads/details/:id',
            data: { title: 'Inlingua | Leads Details' },
            loadComponent: () =>
              import('./home/leads/leads-profile/leads-profile.component').then(
                (m) => m.LeadsProfileComponent
              ),
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
              )
          },
          {
            path: 'leads/import/:filename',
            data: { title: 'Inlingua | Import Leads result' },
            loadComponent: () =>
              import('./home/leads/leads-result/leads-result.component').then(
                (m) => m.LeadsResultComponent
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
        ]
      },
      // Students
      {
        path: '',
        data: { title: 'Inlingua | Students' },
        loadComponent: () =>
          import('./home/students/students.component').then(
            (m) => m.StudentsComponent
          ),
        children: [
          {
            path: 'students',
            data: { title: 'Inlingua | Students Details' },
            loadComponent: () =>
              import('./home/students/all-students/all-students.component').then(
                (m) => m.AllStudentsComponent
              ),
          },
          {
            path: 'students/details/:id',
            data: { title: 'Inlingua | Students Details' },
            loadComponent: () =>
              import('./home/students/students-details/students-details.component').then(
                (m) => m.StudentsDetailsComponent
              ),
          }
        ]
      },
      // Trainer
      {
        path: '',
        data: { title: 'Inlingua | Trainers' },
        loadComponent: () =>
          import('./home/trainers/trainers.component').then(
            (m) => m.TrainersComponent
          ),
        children: [
          {
            path: 'trainers',
            data: { title: 'Inlingua | Trainer Details' },
            loadComponent: () => import('./home/trainers/all-trainers/all-trainers.component').then(m => m.AllTrainersComponent)
          },
          {
            path: 'trainers/create',
            data: { title: 'Inlingua | Create Trainer' },
            loadComponent: () => import('./home/trainers/create-trainer/create-trainer.component').then(m => m.CreateTrainerComponent)
          },
          {
            path: 'trainers/details/:trainerid',
            data: { title: 'Inlingua | Trainer Details' },
            loadComponent: () => import('./home/trainers/trainer-details/trainer-details.component').then(m => m.TrainerDetailsComponent)
          },
        ]
      },
      // Batchs
      {
        path: '',
        data: { title: 'Inlingua | Batch List' },
        loadComponent: () =>
          import('./home/batchs/batchs.component').then(
            (m) => m.BatchsComponent
          ),
        children: [
          {
            path: 'batchs',
            data: { title: 'Inlingua | Batch List' },
            loadComponent: () =>
              import('./home/batchs/all-batchs/all-batchs.component').then(
                (m) => m.AllBatchsComponent
              ),
          },
          {
            path: 'batchs/create-batchs',
            data: { title: 'Inlingua | Create Batch' },
            loadComponent: () =>
              import('./home/batchs/create-batchs/create-batchs.component').then(
                (m) => m.CreateBatchsComponent
              ),
          },
          {
            path: 'batchs/details/:id',
            data: { title: 'Inlingua | Batch Details' },
            loadComponent: () =>
              import('./home/batchs/batch-details/batch-details.component').then(
                (m) => m.BatchDetailsComponent
              ),
          }
        ]
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
