import { Producto } from "../types/productoType";

export const productos: Producto[] = [
    {
        id: 1,
        imagen: "https://tiendabackend-w5h6.onrender.com/api/files/product/5645680-00-A_0_2000.jpg",
        nombre: "Camiseta",
        categoria: "Women",
        tallas: [
            { id: "xs", label: "XS" },
            { id: "s", label: "S" },
            { id: "m", label: "M" },
            { id: "l", label: "L" },
            { id: "xl", label: "XL" },
            { id: "xxl", label: "XXL" },
        ],
        precio: 10,
    },
    {
        id: 2,
        imagen: "https://tiendabackend-w5h6.onrender.com/api/files/product/1740051-00-A_0_2000.jpg",
        nombre: "Pantalon",
        categoria: "men",
        tallas: [
            { id: "xs", label: "XS" },
            { id: "s", label: "S" },
            { id: "m", label: "M" },
            { id: "l", label: "L" },
            { id: "xl", label: "XL" },
            { id: "xxl", label: "XXL" },
        ],
        precio: 10,
    },
    {
        id: 3,
        imagen: "https://tiendabackend-w5h6.onrender.com/api/files/product/5645680-00-A_0_2000.jpg",
        nombre: "Camiseta",
        categoria: "unisex",
        tallas: [
            { id: "xs", label: "XS" },
            { id: "s", label: "S" },
            { id: "m", label: "M" },
            { id: "l", label: "L" },
            { id: "xl", label: "XL" },
            { id: "xxl", label: "XXL" },
        ],
        precio: 10,
    },
    {
        id: 4,
        imagen: "https://tiendabackend-w5h6.onrender.com/api/files/product/1740051-00-A_0_2000.jpg",
        nombre: "Camiseta",
        categoria: "kid",
        tallas: [
            { id: "xs", label: "XS" },
            { id: "s", label: "S" },
            { id: "m", label: "M" },
            { id: "l", label: "L" },
            { id: "xl", label: "XL" },
            { id: "xxl", label: "XXL" },
        ],
        precio: 10,
    }
];