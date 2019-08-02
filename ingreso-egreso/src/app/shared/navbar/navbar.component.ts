import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  listenerUsuario: Subscription = new Subscription();
  nombreUsuario: String;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.listenerUsuario = this.store.select('auth')
      .pipe(
        filter(user => user.user != null)
      )
      .subscribe(user => this.nombreUsuario = user.user.nombre);
  }

  ngOnDestroy(){
    this.listenerUsuario.unsubscribe();
  }

}
