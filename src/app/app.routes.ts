import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { OccupationFormComponent } from './occupation-form/occupation-form.component';
import { OccupationHistoryComponent } from './occupation-history/occupation-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ToastComponent } from './toast/toast.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, 
    canActivate: [AuthGuard] },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'new-occupation', component: OccupationFormComponent },
  { path: 'occupation-history', component: OccupationHistoryComponent},
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'toast', component: ToastComponent },

  { path: '**', redirectTo: '' }
];