import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargandoApp: boolean;
  susbcription: Subscription;

  constructor(public authService: AuthService,
    public store: Store<AppState>) { }

  ngOnInit() {
    this.susbcription = this.store.select('ui').subscribe(state => {
      this.cargandoApp = state.isLoading;
    })
  }

  ngOnDestroy() {
    this.susbcription.unsubscribe();
  }

  onSubmit(data) {
    this.authService.login(data.email, data.password);
  }
}
