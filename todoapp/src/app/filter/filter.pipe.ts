import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/model/todo.model';
import { filtrosValidos } from './filter.actions';
import { filter } from 'minimatch';

@Pipe({
  name: 'filterTodos'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filtro: filtrosValidos): Todo[] {
    switch(filtro){
      case 'completado':
        return todos.filter(todo => todo.completado);
      case 'pendiente':
        return todos.filter(todo => !todo.completado);
      default:
        return todos;
    }
  }

}
