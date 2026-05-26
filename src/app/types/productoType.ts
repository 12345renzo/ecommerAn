import { Size } from "./tallasTypes";

export interface Producto {
    id: number;
    imagen: string;
    nombre: string;
    categoria: string;
    tallas: Size[];
    precio: number;
}