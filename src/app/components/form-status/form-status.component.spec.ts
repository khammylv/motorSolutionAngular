import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStatusComponent } from './form-status.component';

describe('FormStatusComponent', () => {
  let component: FormStatusComponent;
  let fixture: ComponentFixture<FormStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
