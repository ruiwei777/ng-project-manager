import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as actions from '../actions/user.action';
import * as fromRoot from '../reducers';
import { UserService } from '../service/user.service';

@Injectable()
export class UserEffects {
  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .switchMap((projectId) => this.service$.getUsersByProject(projectId)
      .map(users => new actions.LoadSuccess(users))
      .catch(err => Observable.of(new actions.LoadFail(JSON.stringify(err))))
    );


  @Effect()
  addUserProjectRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .switchMap(({ user, projectId }) => this.service$.addProjectRef(user, projectId)
      .map(user => new actions.AddSuccess(user))
      .catch(err => Observable.of(new actions.AddFail(JSON.stringify(err))))
    );

  @Effect()
  updateUserProjectRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(project => this.service$.batchUpdateProjectRef(project)
      .map(users => new actions.UpdateSuccess(users))
      .catch(err => Observable.of(new actions.UpdateFail(JSON.stringify(err))))
    );

  @Effect()
  delUserProjectRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(({ user, projectId }) => this.service$.removeProjectRef(user, projectId)
      .map(user => new actions.DeleteSuccess(user))
      .catch(err => Observable.of(new actions.DeleteFail(JSON.stringify(err))))
    );

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SEARCH)
    .map(toPayload)
    .switchMap(str => this.service$.searchUsers(str)
      .map(users => new actions.SearchSuccess(users))
      .catch(err => Observable.of(new actions.SearchFail(JSON.stringify(err))))
    );

  constructor(
    private actions$: Actions,
    private service$: UserService,
    private store$: Store<fromRoot.State>
  ) {

  }
}