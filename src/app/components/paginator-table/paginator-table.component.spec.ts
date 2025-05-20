import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorTableComponent } from './paginator-table.component';

describe('PaginatorTableComponent', () => {
  let component: PaginatorTableComponent;
  let fixture: ComponentFixture<PaginatorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
