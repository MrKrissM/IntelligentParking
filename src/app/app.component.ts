import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleComponent } from "./vehicle/vehicle.component";
import { OccupationFormComponent } from './occupation-form/occupation-form.component';
import { ParkingComponent } from './parking/parking.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReportsComponent } from './reports/reports.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, LoginComponent, UserRegistrationComponent, UserProfileComponent, VehicleListComponent, RouterModule, HeaderComponent, FooterComponent, VehicleComponent,OccupationFormComponent,ParkingComponent,ReservationsComponent,ReportsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-parking-app';
}
