import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as RouterActions from '../actions/router.action';
import * as actions from '../actions/auth.action';
import { AuthService } from '../service/auth.service';
import { User } from '../domain';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap(({ email, password }) => {
      return this.service$.login(email, password)
        .map(auth => new actions.LoginSuccessAction(auth))
        .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
    })

  ;

  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap((user: User) => this.service$.register(user)
      .map(auth => new actions.RegisterSuccessAction(auth))
      .catch(err => Observable.of(new actions.RegisterFailAction(JSON.stringify(err))))
    );

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT)
    .do(() => this.router.navigate(['/account/login']));

  @Effect({ dispatch: false })
  loginAndNavigate$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/projects']));

  @Effect({ dispatch: false })
  registerAndNavigate$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS)
    .do(() => this.router.navigate(['/projects']));

  constructor(private actions$: Actions, private service$: AuthService, private router: Router) {

  }
}