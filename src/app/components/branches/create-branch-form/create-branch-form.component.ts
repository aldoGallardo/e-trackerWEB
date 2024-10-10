import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiBranchesService } from '@core/services/api-branches.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; // IMPORTANTE

@Component({
  selector: 'app-create-branch-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule, // IMPORTAR CommonModule PARA NGIF
  ],
  templateUrl: './create-branch-form.component.html',
  styleUrls: ['./create-branch-form.component.css'],
})
export class CreateBranchFormComponent {
  branchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateBranchFormComponent>,
    private apiBranchesService: ApiBranchesService
  ) {
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      const newBranch = this.branchForm.value;
      this.apiBranchesService.addBranch(newBranch).subscribe(() => {
        this.dialogRef.close('success');
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
