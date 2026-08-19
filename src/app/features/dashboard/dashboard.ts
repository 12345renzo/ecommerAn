import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { LucidePencil, LucidePlus, LucideTrash2 } from '@lucide/angular';
import { ToastrService } from 'ngx-toastr';
import { UseProductoService } from '../../service/useProducto/use-producto';
import { ProductoType } from '../../types/responseProductoTypes';
import { ProductoFormModal } from '../../components/modals/producto-form-modal/producto-form-modal';
import { Paginator } from '../../components/paginator/paginator';

@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule, LucidePencil, LucidePlus, LucideTrash2, Paginator],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  getAllProduct = inject(UseProductoService);
  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'id',
    'images',
    'title',
    'price',
    'stock',
    'description',
    'acciones',
  ];

  productos = computed(() => this.getAllProduct.query.data()?.products ?? []);
  pageTotal = computed(() => this.getAllProduct.query.data()?.pages ?? 1);
  isLoading = computed(() => this.getAllProduct.query.isPending());
  isError = computed(() => this.getAllProduct.query.isError());

  agregarProducto() {
    const dialogRef = this.dialog.open(ProductoFormModal, {
      panelClass: 'producto-form-panel',
      data: { modo: 'create' },
      width: '720px',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.getAllProduct.mutatePrducto.mutateAsync(result);
          this.toastr.success('Producto creado correctamente', 'Éxito');
        } catch {
          this.toastr.error('No se pudo crear el producto', 'Error');
        }
      }
    });
  }

  editarProducto(producto: ProductoType) {
    const dialogRef = this.dialog.open(ProductoFormModal, {
      panelClass: 'producto-form-panel',
      data: { modo: 'edit', producto },
      width: '720px',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.getAllProduct.mutateEditar.mutateAsync(result);
          this.toastr.success(`Producto "${result.title}" actualizado`, 'Éxito');
        } catch {
          this.toastr.error('No se pudo actualizar el producto', 'Error');
        }
      }
    });
  }

  eliminarProducto(producto: ProductoType) {
    this.toastr.info(`Eliminar producto "${producto.title}"`, 'Info');
  }
}
