import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';

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
    this.contador *= 2;
    //this.cambioContador.emit(this.contador);
  }
  dividir() {
    this.contador /= 2;
    //this.cambioContador.emit(this.contador);
  }

  resetNieto(contadorNieto) {
    this.contador = contadorNieto;
    //this.cambioContador.emit(this.contador);
  }
}
