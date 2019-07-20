import { Component, OnInit } from '@angular/core';
import { ConmutarTodosTodoAction } from './todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {

  completado = false;

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
  }

  conmutarTodos() {
    this.completado = !this.completado;
    const accion = new ConmutarTodosTodoAction(this.completado);
    this.store.dispatch(accion);
  }

}
