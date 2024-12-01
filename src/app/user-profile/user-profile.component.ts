import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [RouterOutlet,CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
    // Agregar variable para mostrar/ocultar el formulario de registro
    showRegistrationForm = false;
    // Agregar formulario de registro
    registrationForm: FormGroup;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private toast: ToastService,
    private fb: FormBuilder
  ) {
      // Inicializar el formulario de registro
      this.registrationForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['user', Validators.required]
      });
  }

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
          console.log('Usuarios cargados:', this.users); // Agrega este log
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


  deleteUser(userId: string) {
    console.log('ID de usuario a eliminar:', userId);
  
    if (!userId) {
      console.error('ID de usuario no válido');
      this.toast.showError('No se proporcionó un ID de usuario válido');
      return;
    }
  
    const confirmDelete = confirm(`¿Estás seguro de eliminar este usuario?`);
    
    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe({
        next: (response) => {
          console.log('Respuesta de eliminación:', response);
          this.toast.showSuccess('Usuario eliminado exitosamente');
          this.loadUsers(); // Recargar la lista de usuarios
        },
        error: (error) => {
          console.error('Error detallado al eliminar:', error);
          this.toast.showError(error.error?.message || 'Error al eliminar usuario');
        }
      });
    }
  }

  // Método para mostrar/ocultar el formulario de registro
  toggleRegistrationForm() {
    this.showRegistrationForm = !this.showRegistrationForm;
  }
    // Método para registrar usuario
    registerUser() {
      if (this.registrationForm.valid) {
        this.userService.registerUser(this.registrationForm.value).subscribe({
          next: (response) => {
            this.toast.showSuccess('Usuario registrado exitosamente');
            // Recargar la lista de usuarios
            this.loadUsers();
            // Ocultar el formulario de registro
            this.showRegistrationForm = false;
            // Resetear el formulario
            this.registrationForm.reset({ role: 'user' });
          },
          error: (error) => {
            this.toast.showError(error.error.message || 'Error al registrar usuario');
          }
        });
      }
    }
  
    // Método para cancelar el registro
    cancelRegistration() {
      this.showRegistrationForm = false;
      this.registrationForm.reset({ role: 'user' });
    }


}
