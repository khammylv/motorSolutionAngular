import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsTabComponent } from './repairs-tab.component';

describe('RepairsTabComponent', () => {
  let component: RepairsTabComponent;
  let fixture: ComponentFixture<RepairsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
