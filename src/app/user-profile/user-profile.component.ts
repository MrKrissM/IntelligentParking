import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ErrorHandlingService } from '../services/error-handling.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `./user-profile.component.html`,
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private errorService: ErrorHandlingService
  ) {
    this.profileForm = this.fb.group({});
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.authService.getUserProfile().subscribe({
      next: (user) => this.profileForm.patchValue(user),
      error: (err) => this.errorService.handleError(err)
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateUserProfile(this.profileForm.value).subscribe({
        next: (response) => {
          console.log('Perfil actualizado', response);
          // Aquí podrías mostrar un mensaje de éxito
        },
        error: (err) => this.errorService.handleError(err)
      });
    }
  }
}
