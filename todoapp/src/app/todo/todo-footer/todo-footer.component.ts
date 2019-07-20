import { Component, OnInit } from '@angular/core';
import { filtrosValidos, SetFilterAction } from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import { BorrarTodoCompletadoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtros: filtrosValidos[] = ['todos', 'completado', 'pendiente'];
  filtroActual: filtrosValidos;
  pendientes: number;
  totalTodos: number;

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
      this.totalTodos = state.todos.length;
    });
  }

  cambiarFiltro(nuevoFiltro: filtrosValidos) {
    const accion = new SetFilterAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => todo.completado === false).length;
  }

  borrarCompletados() {
    const accion = new BorrarTodoCompletadoAction();
    this.store.dispatch(accion);
  }

}
