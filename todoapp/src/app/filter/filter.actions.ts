import { Action } from '@ngrx/store';

export type filtrosValidos = 'todos' | 'completado' | 'pendiente';

export const SET_FILTER = '[FILTER] Establece el filtro';

export class SetFilterAction implements Action {
    readonly type = SET_FILTER;
    constructor(public filtro: filtrosValidos) { }
}

export type acciones = SetFilterAction;
