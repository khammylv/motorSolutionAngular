import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblBodyComponent } from './tbl-body.component';

describe('TblBodyComponent', () => {
  let component: TblBodyComponent;
  let fixture: ComponentFixture<TblBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
