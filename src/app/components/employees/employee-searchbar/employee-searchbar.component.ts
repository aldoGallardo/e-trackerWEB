import { Component, Output, EventEmitter } from '@angular/core';
import { SearchbarComponent } from 'src/app/shared/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-searchbar',
  standalone: true,
  imports: [SearchbarComponent, FormsModule],
  templateUrl: './employee-searchbar.component.html',
  styleUrl: './employee-searchbar.component.css',
})
export class EmployeeSearchbarComponent {
  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
