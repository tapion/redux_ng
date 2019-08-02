import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/auth/user.module';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  nombre: String;
  listenerUsuario: Subscription = new Subscription();

  constructor(public authService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.listenerUsuario = this.store.select('auth')
      .pipe( filter(auth => auth.user != null))
      .subscribe(auth => this.nombre = auth.user.nombre);
  }

  logOut(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.listenerUsuario.unsubscribe();
  }
}
