import { Component, Output, EventEmitter } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [MatPaginatorModule, MatLabel, MatFormField],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }
}
