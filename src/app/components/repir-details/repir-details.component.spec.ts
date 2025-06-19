import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepirDetailsComponent } from './repir-details.component';

describe('RepirDetailsComponent', () => {
  let component: RepirDetailsComponent;
  let fixture: ComponentFixture<RepirDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepirDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepirDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
