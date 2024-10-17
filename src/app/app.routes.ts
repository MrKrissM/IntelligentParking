import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'vehicle', component: VehicleComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'about', component: AboutComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];
