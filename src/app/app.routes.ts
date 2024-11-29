import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { ParkingComponent } from './parking/parking.component';
import { ReportsComponent } from './reports/reports.component';
import { ReservationsComponent } from './reservations/reservations.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'about', component: AboutComponent },
      { path: 'parking', component: ParkingComponent },
      { path: 'reservations', component: ReservationsComponent },
      
      // Rutas protegidas solo para administradores
      { 
        path: 'reports', 
        component: ReportsComponent,
        canActivate: [AdminGuard]
      },
      { 
        path: 'users', 
        component: UserProfileComponent,
        canActivate: [AdminGuard]
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];