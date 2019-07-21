import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSuscription: Subscription = new Subscription();

  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    public afDB: AngularFirestore,
    public store: Store<AppState>) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          nombre: nombre,
          email: resp.user.email,
          uid: resp.user.uid
        }

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.store.dispatch(new DesactivarLoadingAction());
            this.router.navigate(['/'])
          });
      }).catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Error registrando usuario', error.message, 'error');
      });
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((infoUser: firebase.User) => {
      if (infoUser) {
        this.authSuscription = this.afDB.doc(`${infoUser.uid}/usuario`).valueChanges()
          .subscribe((userObj: any) => {
            const action = new SetUserAction(userObj);
            this.store.dispatch( action );
            console.log(userObj);
          });
      }else{
        this.authSuscription.unsubscribe();
      }
    });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      }).catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Error en Login', error.message, 'error');
      });
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  estaAutenticado() {
    return this.afAuth.authState
      .pipe(
        map(response => {
          if (response == null) {
            this.router.navigate(['/login']);
          }
          return response != null;
        })
      );
  }
}

