import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EspacioEstacionamiento {
  id: number;
  ocupado: boolean;
}

@Component({
  selector: 'app-estacionamiento-inteligente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estacionamiento-inteligente.component.html',
  styleUrls: ['./estacionamiento-inteligente.component.css']
})
export class EstacionamientoInteligenteComponent {
  espacios: EspacioEstacionamiento[] = [
    { id: 1, ocupado: false },
    { id: 2, ocupado: true },
    { id: 3, ocupado: false },
    { id: 4, ocupado: false },
    { id: 5, ocupado: true }
  ];

  toggleOcupacion(espacio: EspacioEstacionamiento) {
    espacio.ocupado = !espacio.ocupado;
  }

  get espaciosDisponibles(): number {
    return this.espacios.filter(e => !e.ocupado).length;
  }
}