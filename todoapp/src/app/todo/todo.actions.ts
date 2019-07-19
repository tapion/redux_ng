import { Action } from '@ngrx/store';

export const AGREGAR_TODO = '[TODO] Agregar todo';

export class AgregargTodoAction implements Action {
    readonly type = AGREGAR_TODO;

    constructor(public texto: string) { }
}

export type Acciones = AgregargTodoAction;