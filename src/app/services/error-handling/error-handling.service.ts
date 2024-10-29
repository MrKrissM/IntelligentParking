import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service'; 

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private toastService: ToastService) {}

  handleError(error: any) {
    console.error('Se produjo un error:', error);
    
    let errorMessage = 'Se produjo un error inesperado';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      // El servidor devolvió un código de estado de error
      errorMessage = `El servidor devolvió el código ${error.status}: ${error.error.message}`;
    }

    this.toastService.showError(errorMessage);
  }
}
