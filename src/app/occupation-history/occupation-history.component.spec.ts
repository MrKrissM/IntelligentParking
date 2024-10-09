import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationHistoryComponent } from './occupation-history.component';

describe('OccupationHistoryComponent', () => {
  let component: OccupationHistoryComponent;
  let fixture: ComponentFixture<OccupationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
