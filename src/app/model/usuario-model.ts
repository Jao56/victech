import { MeiosDeTransporte } from '../enum/home-enum';
import { Item } from './item-model';

export class Usuario{
    id?: number;
    nome?: string;
    email: string = "";
    tipoTransporte?: MeiosDeTransporte;
    listaItens: Item[] = [];
}