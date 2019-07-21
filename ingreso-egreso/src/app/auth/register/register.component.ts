import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargandoApp: boolean;
  susbcription: Subscription;

  constructor(public authService: AuthService,
              public store: Store<AppState>) { }

  ngOnInit() {
    this.susbcription = this.store.select('ui').subscribe(state =>{
        this.cargandoApp = state.isLoading;
    });
  }

  ngOnDestroy() {
    this.susbcription.unsubscribe();
  }

  onSubmit(data: any) {
    console.log(data);
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }

}
