import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './model/item-model';

@Pipe({
  name: 'listaItens',
})
export class ListaItensPipe implements PipeTransform {
  transform(itens: Item[]):string {
    return itens.reduce((stringFinal, item, indice) => stringFinal + item.nomeItem +(indice != (itens.length -1) ? ', ' : ''),
    ''
    );
  }

}
