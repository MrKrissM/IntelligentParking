import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterOutlet,CommonModule,RouterModule,DashboardComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {}
