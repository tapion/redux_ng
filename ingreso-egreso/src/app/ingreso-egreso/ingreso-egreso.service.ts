import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoSuscription: Subscription = new Subscription();
  ingresoEgresoItemSuscription: Subscription = new Subscription();

  constructor(public afDB: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoSuscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(auth => {
        this.obtenerIngresosEgresos(auth.user.uid);
      });
  }

  private obtenerIngresosEgresos(userUid: string) {
    this.ingresoEgresoItemSuscription = this.afDB.collection(`${userUid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(request => {
          return request.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      ).subscribe((coleccion: any) => {
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  cancelarSuscripciones(){
    this.ingresoEgresoSuscription.unsubscribe();
    this.ingresoEgresoItemSuscription.unsubscribe();
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getInfoUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso });
  }

  borrarItem(itemUid: string){
    const user = this.authService.getInfoUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${itemUid}`).delete();
  }
}
