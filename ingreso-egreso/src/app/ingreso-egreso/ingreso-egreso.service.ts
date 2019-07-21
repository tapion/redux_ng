import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(public afDB: AngularFirestore,
              public authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getInfoUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso });
  }
}
