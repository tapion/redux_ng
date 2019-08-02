import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  listenerEstadistico: Subscription = new Subscription();
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];

  totalIngresos: number;
  totalEgresos: number;
  egresos: number;
  ingresos: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.listenerEstadistico = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.asignarValores(ingresoEgreso.items);
      });

  }

  private asignarValores(items: IngresoEgreso[]) {
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.egresos = 0;
    this.ingresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.ingresos++;
        this.totalIngresos += item.monto;
      } else {
        this.egresos++;
        this.totalEgresos += item.monto;
      }
    });

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];

  }

  ngOnDestroy() {
    this.listenerEstadistico.unsubscribe();
  }

}
