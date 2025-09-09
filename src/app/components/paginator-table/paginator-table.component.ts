import { Component, EventEmitter, Input, Output } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { Pagination } from 'app/models/Pagination.model';

@Component({
  selector: 'app-paginator-table',
  imports: [ MatPaginatorModule],
  templateUrl: './paginator-table.component.html',
  styleUrl: './paginator-table.component.css'
})
export class PaginatorTableComponent {
  private _pagination!: Pagination;
  @Input() 
  set pagination(value: Pagination) {
    if (value) {
      this._pagination = value;
      this.length = value.length;
      this.pageSize = value.pageSize;
      this.pageIndex = value.pageIndex;
    }
  }

  get pagination(): Pagination {
    return this._pagination;
  }


 @Output() paginationEvent = new EventEmitter<Pagination>();
 length!: number;
 pageSize!: number;
 pageIndex!: number;
 pageSizeOptions = [5, 10, 25];


  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.paginationEvent.emit(e)
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }



}
