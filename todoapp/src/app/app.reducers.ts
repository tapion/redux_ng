import { Todo } from './todo/model/todo.model';
import * as fromFilterActions from './filter/filter.actions';
import * as fromTodoReducers from './todo/todo.reducer';
import * as fromFilterReducers from './filter/filter.reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
    todos: Todo[],
    filtro: fromFilterActions.filtrosValidos;
}

export const appReducers: ActionReducerMap < AppState > = {
    todos: fromTodoReducers.todoReducer,
    filtro: fromFilterReducers.filterReducers
}