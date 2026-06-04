import { ResponseUserType } from "./responseUserType";
import { Size } from "./tallasTypes";

export interface ProductoType {
  id: number;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: string;
  tags: string[];
  images: string[];
  user: ResponseUserType;
}

export interface ResponseProductoType {
  count: number;
  page: number;
  products: ProductoType[];
}