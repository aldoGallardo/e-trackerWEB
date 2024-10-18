import { Component } from '@angular/core';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [AssignmentListComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
})
export class AssignmentsComponent {}
