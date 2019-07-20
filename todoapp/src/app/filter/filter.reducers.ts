import * as filterActions from './filter.actions';
import { filter } from 'minimatch';

const filtroInicial: filterActions.filtrosValidos = 'todos';

export function filterReducers(state = filtroInicial,
                               action: filterActions.acciones): filterActions.filtrosValidos {
    switch (action.type) {
        case filterActions.SET_FILTER:
            return action.filtro;
        default:
            return state;
    }
}