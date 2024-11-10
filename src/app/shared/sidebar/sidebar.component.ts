import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  selectedSection: string = '';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.selectedSection = route;
    this.router.navigate([`/${route}`]);
  }
}
