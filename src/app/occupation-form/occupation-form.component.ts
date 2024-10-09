import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParkingService } from '../services/parking.service';
import { ErrorHandlingService } from '../services/error-handling.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-occupation-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: `./occupation-form.component.html`,
  styleUrls: ['./occupation-form.component.css']
})
export class OccupationFormComponent implements OnInit {
  occupationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parkingService: ParkingService,
    private errorService: ErrorHandlingService
  ) {
    // Inicializar occupationForm en el constructor
  this.occupationForm = this.fb.group({
    parkingLotName: ['', Validators.required],
    parkingSpotNumber: ['', Validators.required],
    vehiclePlate: ['', [Validators.required, this.validatePlate]]
  });
  }

  ngOnInit() {
    this.occupationForm = this.fb.group({
      parkingLotName: ['', Validators.required],
      parkingSpotNumber: ['', Validators.required],
      vehiclePlate: ['', [Validators.required, this.validatePlate]]
    });
  }

  validatePlate(control: AbstractControl): {[key: string]: any} | null {
    const platePattern = /^[A-Z]{3}-\d{3}$/; // Ejemplo: ABC-123
    const valid = platePattern.test(control.value);
    return valid ? null : { invalidPlate: true };
  }

  onSubmit() {
    if (this.occupationForm.valid) {
      this.parkingService.createOccupation(this.occupationForm.value).subscribe({
        next: (response) => {
          console.log('Ocupación registrada', response);
          // Aquí podrías mostrar un mensaje de éxito
        },
        error: (err) => this.errorService.handleError(err)
      });
    }
  }
}