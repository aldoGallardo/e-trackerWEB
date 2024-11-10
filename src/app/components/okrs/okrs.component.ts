import { Component } from '@angular/core';
import { OkrChipsComponent } from './okr-chips/okr-chips.component';

@Component({
  selector: 'app-okrs',
  standalone: true,
  templateUrl: './okrs.component.html',
  imports: [OkrChipsComponent],
})
export class OkrsComponent {}
