import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { MultiplicarAction, DividirAction } from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: []
})
export class HijoComponent implements OnInit {

  contador: number;


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('contador')
      .subscribe(contador => {
        this.contador = contador;
      });
  }

  multiplicar() {
    const action = new MultiplicarAction(5);
    this.store.dispatch(action);
    //this.cambioContador.emit(this.contador);
  }
  dividir() {
    const action = new DividirAction(2);
    this.store.dispatch(action);
    //this.cambioContador.emit(this.contador);
  }

  resetNieto(contadorNieto) {
    this.contador = contadorNieto;
    //this.cambioContador.emit(this.contador);
  }
}
