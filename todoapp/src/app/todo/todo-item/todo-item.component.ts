import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ConmutarTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtEditItem', { static: true }) txtEditItem: ElementRef;

  chkedItem: FormControl;
  editItem: FormControl;
  editando: boolean;
  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.chkedItem = new FormControl(this.todo.completado);
    this.editItem = new FormControl(this.todo.texto, Validators.required);
    this.chkedItem.valueChanges
      .subscribe(value => {
        const accion = new ConmutarTodoAction(this.todo.id);
        this.store.dispatch(accion);
      });

  }

  editarItem() {
    this.editando = true;
    this.editItem.setValue(this.todo.texto);
    // console.log(this.txtEditItema);
    setTimeout(() => {
      this.txtEditItem.nativeElement.select();
    }, 1);
  }

  terminaEdicion() {
    this.editando = false;
    console.log(this.txtEditItem.nativeElement.value);
    if (this.editItem.invalid || this.todo.texto === this.editItem.value) {
      return;
    }
    const accion = new EditarTodoAction(this.todo.id, this.editItem.value);
    this.store.dispatch(accion);
  }

  borrarItem(){
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }

}
