import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { ResetAction } from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: []
})
export class NietoComponent implements OnInit {
  contador: number;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('contador')
      .subscribe(contador => {
        this.contador = contador;
      });
  }

  reset(){
    /*this.contador = 0;
    this.contadorCambio.emit(this.contador);*/
    const action = new ResetAction();
    this.store.dispatch (action);
  }

}
