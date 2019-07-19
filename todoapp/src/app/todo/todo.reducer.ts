import * as todoActions from './todo.actions';
import { Todo } from './model/todo.model';

const estadoInicial: Todo[] = [];

export function todoReducer(state = estadoInicial,
    action: todoActions.Acciones): Todo {

    switch (action.type) {
        case todoActions.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo];
        default:
            return state;
    }

}