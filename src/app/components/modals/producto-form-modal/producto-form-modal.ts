import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideImagePlus, LucideX } from '@lucide/angular';
import { ToastrService } from 'ngx-toastr';
import { ProductoType } from '../../../types/responseProductoTypes';
import { Size } from '../../../types/tallasTypes';

export interface ProductoFormData {
  modo: 'create' | 'edit';
  producto?: ProductoType;
}

const MAX_IMAGENES = 5;
const MIN_IMAGENES = 2;

const GENEROS = ['men', 'women', 'kid', 'unisex'] as const;

type Genero = (typeof GENEROS)[number];

@Component({
  selector: 'app-producto-form-modal',
  imports: [ReactiveFormsModule, LucideImagePlus, LucideX],
  templateUrl: './producto-form-modal.html',
  styleUrl: './producto-form-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductoFormModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductoFormModal>);
  private toastr = inject(ToastrService);
  private data = inject<ProductoFormData>(MAT_DIALOG_DATA);

  modo = this.data.modo;
  producto = this.data.producto;
  generos = GENEROS;
  imagenes = signal<string[]>(this.data.producto?.images?.slice(0, MAX_IMAGENES) ?? []);

  form: FormGroup = this.fb.group({
    title: [this.producto?.title ?? '', Validators.required],
    price: [this.producto?.price ?? 0, [Validators.required, Validators.min(0)]],
    stock: [this.producto?.stock ?? 0, [Validators.required, Validators.min(0)]],
    gender: [this.producto?.gender ?? 'men' as Genero],
    slug: [this.producto?.slug ?? ''],
    description: [this.producto?.description ?? '', Validators.required],
    sizes: [this.producto?.sizes?.join(', ') ?? ''],
    tags: [this.producto?.tags?.join(', ') ?? ''],
  });

  onArchivosSeleccionados(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivos = input.files;
    if (!archivos?.length) {
      return;
    }

    const disponibles = MAX_IMAGENES - this.imagenes().length;
    if (disponibles <= 0) {
      this.toastr.warning(`Máximo ${MAX_IMAGENES} imágenes por producto`, 'Aviso');
      input.value = '';
      return;
    }

    Array.from(archivos)
      .slice(0, disponibles)
      .forEach((archivo) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenes.update((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(archivo);
      });

    input.value = '';
  }

  eliminarImagen(index: number) {
    this.imagenes.update((prev) => prev.filter((_, i) => i !== index));
  }

  guardar() {
    if (this.form.invalid) {
      return;
    }

    if (this.imagenes().length < MIN_IMAGENES) {
      this.toastr.warning(`Agrega mínimo ${MIN_IMAGENES} imágenes`, 'Aviso');
      return;
    }

    const datos = this.form.getRawValue();

    const separarLista = (valor: string) =>
      valor
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

    const payload = {
      title: datos.title,
      price: Number(datos.price),
      description: datos.description,
      slug: datos.slug,
      stock: Number(datos.stock),
      sizes: separarLista(datos.sizes) as Size[],
      gender: datos.gender,
      tags: separarLista(datos.tags),
      images: this.imagenes(),
    };

    if (this.modo === 'create') {
      console.log('CREAR PRODUCTO:', payload);
      this.dialogRef.close(payload);
    } else {
      const datosEditar = { id: this.producto?.id, ...payload };
      console.log('EDITAR PRODUCTO:', datosEditar);
      this.dialogRef.close(datosEditar);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
