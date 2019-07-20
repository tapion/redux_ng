import { Action } from '@ngrx/store';

export const AGREGAR_TODO = '[TODO] Agregar todo';
export const CONMUTAR_TODO = '[TODO] Conmuta todo';
export const CONMUTAR_TODOS_TODO = '[TODO] Conmuta todos los todo';
export const EDITAR_TODO = '[TODO] Editar todo';
export const BORRAR_TODO = '[TODO] Borrar todo';
export const BORRAR_TODO_COMPLETADOS = '[TODO] Borrar todo completados';

export class AgregargTodoAction implements Action {
    readonly type = AGREGAR_TODO;

    constructor(public texto: string) { }
}
export class ConmutarTodoAction implements Action {
    readonly type = CONMUTAR_TODO;

    constructor(public id: number) { }
}
export class ConmutarTodosTodoAction implements Action {
    readonly type = CONMUTAR_TODOS_TODO;

    constructor(public completado: boolean) { }
}
export class BorrarTodoAction implements Action {
    readonly type = BORRAR_TODO;

    constructor(public id: number) { }
}
export class BorrarTodoCompletadoAction implements Action {
    readonly type = BORRAR_TODO_COMPLETADOS;

    constructor() { }
}
export class EditarTodoAction implements Action {
    readonly type = EDITAR_TODO;
    constructor(public id: number, public texto: string) { }
}

export type Acciones = AgregargTodoAction | 
                       ConmutarTodoAction | 
                       EditarTodoAction   |
                       ConmutarTodosTodoAction |
                       BorrarTodoCompletadoAction |
                       BorrarTodoAction;