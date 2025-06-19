import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmailComponent } from './form-email.component';

describe('FormEmailComponent', () => {
  let component: FormEmailComponent;
  let fixture: ComponentFixture<FormEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
