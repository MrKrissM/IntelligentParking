import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionamientoInteligenteComponent } from './estacionamiento-inteligente.component';

describe('EstacionamientoInteligenteComponent', () => {
  let component: EstacionamientoInteligenteComponent;
  let fixture: ComponentFixture<EstacionamientoInteligenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstacionamientoInteligenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstacionamientoInteligenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
