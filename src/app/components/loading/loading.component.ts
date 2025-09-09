import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
constructor(public loadingService: LoadingService){}
}
