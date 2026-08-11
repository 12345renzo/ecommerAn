import { ResponseUserType } from "./responseUserType";

export interface ResponseUsuarioType {
  user: ResponseUserType;
  token: string;
  status: boolean;
}