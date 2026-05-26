import { LucideCloud, LucideSparkles, LucideStar, LucideTrendingUp, LucideTruck, LucideUndo2, LucideWind } from "@lucide/angular"
import { CardGeneral } from "../types/cardGeneral"

export const DatosCardGeneral: CardGeneral[] = [
  {
    id: 1,
    icono: LucideSparkles,
    nombre: 'Recien llegado',
    descripcion: '150+ itens nuevos por semana',
    color: 'from-primary/15 to-accent/15 cursor-pointer',
  },
  {
    id: 2,
    icono: LucideTrendingUp,
    nombre: 'Los mas vendidas',
    descripcion: 'Los favoritos de nuestra comunidad',
    color: 'from-primary/15 to-accent/15 cursor-pointer',
  },
  {
    id: 3,
    icono: LucideWind,
    nombre: 'Tendencias del momento',
    descripcion: 'Nuevos estilos para la temporada',
    color: 'from-primary/15 to-accent/15 cursor-pointer',
  }
]

export const DatosCardSecundario: CardGeneral[] = [
  {
    icono: LucideTruck,
    nombre: 'Envío gratis',
    descripcion: 'En pedidos superiores a $50',
    color: 'bg-[#e2e2e2]',
  },
  {
    icono: LucideUndo2,
    nombre: 'Devoluciones fáciles',
    descripcion: 'Política de devolución de 30 días',
    color: 'bg-[#e2e2e2]',
  },
  {
    icono: LucideStar,
    nombre: 'Calidad premium',
    descripcion: 'Solo una selección exclusiva',
    color: 'bg-[#e2e2e2]',
  },
  {
    icono: LucideCloud,
    nombre: 'Soporte 24/7',
    descripcion: 'Siempre estamos para ayudarte',
    color: 'bg-[#e2e2e2]',
  }
]