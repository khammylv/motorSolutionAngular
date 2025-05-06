import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblActionComponent } from './tbl-action.component';

describe('TblActionComponent', () => {
  let component: TblActionComponent;
  let fixture: ComponentFixture<TblActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
