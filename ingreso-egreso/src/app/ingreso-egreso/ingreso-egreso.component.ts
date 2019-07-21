import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  tipo = 'ingreso';
  cargandoApp: boolean;
  loadingSubs: Subscription = new Subscription();

  constructor(public ingresoEgresoService: IngresoEgresoService,
    public store: Store<AppState>) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(1))
    });
    this.loadingSubs = this.store.select('ui').subscribe(state => {
      this.cargandoApp = state.isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.formulario.value, tipo: this.tipo });
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        Swal.fire('Registro correcto', ingresoEgreso.descripcion, 'success');
        this.formulario.reset({
          monto: 0
        });
        this.store.dispatch(new DesactivarLoadingAction());
      }).catch(error => console.log(error));
  }
}
