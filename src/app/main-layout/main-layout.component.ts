import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
  

    toggleDropdown(event: MouseEvent): void {
      event.preventDefault(); 
      const userDropdown = document.getElementById('dropdownUser1');
      if (userDropdown) {
        userDropdown.click(); 
      }
    }
}
