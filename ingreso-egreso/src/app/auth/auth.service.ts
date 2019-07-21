import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.module';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    public afDB: AngularFirestore) { }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {

        const user: User = {
          nombre: nombre,
          email: resp.user.email,
          uid: resp.user.uid
        }

        this.afDB.doc(`${user.uid}/usuario`)
          .set( user )
          .then(() => this.router.navigate(['/']) );
      }).catch(error => {
        Swal.fire('Error registrando usuario', error.message, 'error');
      });
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((infoUser: firebase.User) => {
      console.log(infoUser);
    });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/']);
      }).catch(error => {
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

