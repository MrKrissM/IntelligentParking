import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleComponent } from "./vehicle/vehicle.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, LoginComponent, RegisterComponent, UserProfileComponent, VehicleListComponent, RouterModule, HeaderComponent, FooterComponent, VehicleComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-parking-app';
}
