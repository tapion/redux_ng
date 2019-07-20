import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { filtrosValidos } from 'src/app/filter/filter.actions';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {
  todos: Todo[] = [];
  filter: filtrosValidos;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.todos = state.todos;
      this.filter = state.filtro;
    });
  }

}
