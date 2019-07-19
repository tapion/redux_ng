import { Component } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { IncrementarAction, DecrementarAction } from './contador/contador.actions';
import { AppState } from './app.reducer';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contador: number;
  constructor(private store: Store<AppState>) {
    this.store.select('contador')
        .subscribe(state => this.contador = state);
    //this.contador = 10;
  }

  incrementar() {
    const accion = new IncrementarAction()
    this.store.dispatch(accion);
    //this.contador += 1;
  }

  decrementar() {
    //this.contador -= 1;
    const accion = new DecrementarAction();
    this.store.dispatch(accion);
  }
}
