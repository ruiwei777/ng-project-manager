import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as RouterActions from '../actions/router.action';

/**
 * If a logged-in user navigates to /account/login, redirect to /projects
 */
@Injectable()
export class LoginGuardService implements CanActivate {

    constructor(private store$: Store<fromRoot.State>) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.store$.select(fromRoot.getAuthState)
            .map(auth => {
                const result = auth.token !== null && auth.token !== undefined;
                if (result) {
                    this.store$.dispatch(new RouterActions.Go({ path: ['/projects'] }))
                }
                return true;
            })
            .defaultIfEmpty(true)
    }
}
