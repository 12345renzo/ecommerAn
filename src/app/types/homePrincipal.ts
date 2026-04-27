export interface HomePrincipal {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

export const DatosCarrusel: HomePrincipal[] = [
  {
    id: 1,
    nombre: 'Coleccion de Verano 2026',
    descripcion: 'Disfruta del calor con nuestros básicos de verano seleccionados',
    imagen: '/coleccion1.avif',
  },
  {
    id: 2,
    nombre: 'Minimalismo Urbano',
    descripcion: 'Líneas limpias, confianza audaz, estilo atemporal',
    imagen: '/coleccion2.jpg',
  },
  {
    id: 3,
    nombre: 'Clasicos vibrantes',
    descripcion: 'El color se une a la elegancia en cada pieza',
    imagen: '/coleccion3.webp',
  },
  {
    id: 4,
    nombre: 'Elegancia Nocturna',
    descripcion: 'Piezas sofisticadas para noches memorables',
    imagen: '/coleccion4.avif',
  },
];