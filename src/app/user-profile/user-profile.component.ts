import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [RouterOutlet,CommonModule,RouterModule,FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response.ok) {
          this.users = response.users;
        }
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
  }

  updateUser() {
    if (!this.selectedUser) return;

    this.userService.updateUser(this.selectedUser._id, {
      username: this.selectedUser.username,
      email: this.selectedUser.email,
      role: this.selectedUser.role
    }).subscribe({
      next: (response) => {
        // Actualizar la lista de usuarios
        const index = this.users.findIndex(u => u._id === response.user._id);
        if (index !== -1) {
          this.users[index] = response.user;
        }
        
        this.toast.showSuccess(response.message);
        this.selectedUser = null;
      },
      error: (error) => {
        this.toast.showError('Error al actualizar usuario');
      }
    });
  }

  cancelEdit() {
    this.selectedUser = null;
  }


// Cambia .filter(user => user.id !== userId)
// a .filter(user => user._id !== userId)
deleteUser(userId: string) {
  if (confirm('Are you sure you want to delete this user?')) {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        if (response.ok) {
          this.users = this.users.filter(user => user._id !== userId);
          this.toast.showSuccess(response.message);
        }
      },
      error: (err) => {
        this.toast.showError('Error deleting user');
        console.error('Error deleting user', err);
      }
    });
  }
}



}
