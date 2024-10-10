import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyListComponent } from './supply-list/supply-list.component';

@Component({
  selector: 'app-supplies',
  standalone: true,
  imports: [CommonModule, SupplyListComponent],
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css'],
})
export class SuppliesComponent {}
