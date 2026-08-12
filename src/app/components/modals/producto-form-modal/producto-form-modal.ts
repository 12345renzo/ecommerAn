import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideX } from '@lucide/angular';
import { ProductoType } from '../../../types/responseProductoTypes';

export interface ProductoFormData {
  modo: 'create' | 'edit';
  producto?: ProductoType;
}

@Component({
  selector: 'app-producto-form-modal',
  imports: [ReactiveFormsModule, LucideX],
  templateUrl: './producto-form-modal.html',
  styleUrl: './producto-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductoFormModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductoFormModal>);
  private data = inject<ProductoFormData>(MAT_DIALOG_DATA);

  modo = this.data.modo;
  producto = this.data.producto;

  form: FormGroup = this.fb.group({
    title: [this.producto?.title ?? '', Validators.required],
    price: [this.producto?.price ?? 0, [Validators.required, Validators.min(0)]],
    stock: [this.producto?.stock ?? 0, [Validators.required, Validators.min(0)]],
    gender: [this.producto?.gender ?? ''],
    description: [this.producto?.description ?? '', Validators.required],
    sizes: [this.producto?.sizes?.join(', ') ?? ''],
    tags: [this.producto?.tags?.join(', ') ?? ''],
    image: [this.producto?.images?.[0] ?? ''],
  });

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.getRawValue());
  }
}
