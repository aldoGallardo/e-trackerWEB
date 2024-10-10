import { Component, Output, EventEmitter } from '@angular/core';
import { SearchbarComponent } from 'src/app/shared/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-branch-searchbar',
  standalone: true,
  imports: [SearchbarComponent, FormsModule],
  templateUrl: './branch-searchbar.component.html',
  styleUrls: ['./branch-searchbar.component.css'],
})
export class BranchSearchbarComponent {
  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
