import * as todoActions from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Hola Miguel');
const todo2 = new Todo('Hola Osa');
const todo3 = new Todo('Hola familia');

todo3.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state = estadoInicial,
    action: todoActions.Acciones): Todo[] {

    switch (action.type) {
        case todoActions.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo];
        case todoActions.CONMUTAR_TODO:
            return state.map(todoItem => {
                if (action.id === todoItem.id) {
                    return {
                        ...todoItem,
                        completado: !todoItem.completado
                    };
                } else {
                    return todoItem;
                }
            });
        case todoActions.CONMUTAR_TODOS_TODO:
            return state.map(todoItem => {
                return {
                    ...todoItem,
                    completado: action.completado
                };
            });
        case todoActions.EDITAR_TODO:
            return state.map(todoItem => {
                if (action.id === todoItem.id) {
                    return {
                        ...todoItem,
                        texto: action.texto
                    };
                } else {
                    return todoItem;
                }
            });
        case todoActions.BORRAR_TODO:
            return state.filter(todoItem => todoItem.id !== action.id);
        case todoActions.BORRAR_TODO_COMPLETADOS:
            return state.filter(todoItem => !todoItem.completado);
        default:
            return state;
    }

}