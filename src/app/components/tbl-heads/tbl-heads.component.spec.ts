import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblHeadsComponent } from './tbl-heads.component';

describe('TblHeadsComponent', () => {
  let component: TblHeadsComponent;
  let fixture: ComponentFixture<TblHeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblHeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblHeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
