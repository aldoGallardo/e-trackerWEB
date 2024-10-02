import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  searchQuery: string = '';

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchQuery); // Emitimos el valor ingresado
  }
}
