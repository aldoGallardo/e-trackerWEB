import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiSuppliesService } from 'src/app/core/services/api-supplies.service';
import { Supply } from 'src/app/core/models/supply.model';

@Component({
  selector: 'app-add-supply-dialog',
  templateUrl: './add-supply-dialog.component.html',
  styleUrls: ['./add-supply-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOption,
    MatButtonModule,
    MatDialogTitle,
    MatSelect,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class AddSupplyDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddSupplyDialogComponent>);
  readonly data = inject<Supply>(MAT_DIALOG_DATA);
  readonly name = this.data ? this.data.name : ''; // Para evitar error si no hay datos iniciales
  supplies: any[] = [];
  selectedSupply: string = '';
  unit: string = '';
  description: string = '';

  constructor(private apiSuppliesService: ApiSuppliesService) {}

  ngOnInit(): void {
    // Obtener los suministros disponibles (si es necesario para algún dropdown)
    this.apiSuppliesService.getTotalSupplies().subscribe((data: any[]) => {
      this.supplies = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addSupply(name: string, unit: string): void {
    const supply: Supply = {
      name: name,
      unit: unit,
    };
    this.apiSuppliesService.addSupply(supply).subscribe({
      next: (data: any) => {
        console.log('Suministro añadido correctamente');
        this.dialogRef.close(); // Cerrar el diálogo al añadir correctamente
      },
      error: (error) => {
        console.log('Error al añadir suministro', error);
      },
    });
  }
}
