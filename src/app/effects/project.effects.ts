import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as RouterActions from '../actions/router.action';
import * as taskListActions from '../actions/task-list.action';
import * as actions from '../actions/project.action';
import * as userActions from '../actions/user.action';
import * as fromRoot from '../reducers';
import { AuthService } from '../service/auth.service';
import { User, Project } from '../domain';
import { ProjectService } from '../service/project.service';

@Injectable()
export class ProjectEffects {
  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getUserId))
    .switchMap(([_, userId]) => this.service$.get(userId)
      .map(projects => new actions.LoadSuccess(projects))
      .catch(err => Observable.of(new actions.LoadFail(JSON.stringify(err))))
    );


  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user))
    .switchMap(([project, user]) => {
      const added = { ...project, members: [`${user.id}`] };
      return this.service$.add(added)
        .map(project => new actions.AddSuccess(project))
        .catch(err => Observable.of(new actions.AddFail(JSON.stringify(err))))
    });

  @Effect()
  updateProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(project => this.service$.update(project)
      .map(project => new actions.UpdateSuccess(project))
      .catch(err => Observable.of(new actions.UpdateFail(JSON.stringify(err))))
    );

  @Effect()
  delProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(project => this.service$.del(project)
      .map(project => new actions.DeleteSuccess(project))
      .catch(err => Observable.of(new actions.DeleteFail(JSON.stringify(err))))
    );

  @Effect({ dispatch: false })
  select$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.SELECT)
    .map(toPayload)
    .do(project => this.router.navigate([`/tasklists/${project.id}`]))

  @Effect({ dispatch: false })
  loadTaskLists$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.SELECT)
    .map(toPayload)
    .do(project => Observable.of(new taskListActions.Load(project.id)));

  @Effect()
  invite$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INVITE)
    .map(toPayload)
    .switchMap(({ projectId, members }) => this.service$.inviteMembers(projectId, members)
      .map(project => new actions.InviteSuccess(project))
      .catch(err => Observable.of(new actions.InviteFail(JSON.stringify(err))))
    );

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD_SUCCESS)
    .map(toPayload)
    .switchMap((projects: Project[]) => Observable.from(projects.map(p => p.id)))
    .map(projectId => new userActions.Load(projectId));

  @Effect()
  addUserProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD_SUCCESS)
    .map(toPayload)
    .map(project => project.id)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user), (projectId, user) => {
      return new userActions.Add({ user, projectId })
    });

  @Effect()
  removeUserProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE_SUCCESS)
    .map(toPayload)
    .map(project => project.id)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user), (projectId, user) => {
      return new userActions.Delete({ user, projectId })
    });

  @Effect()
  updateUserProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.INVITE_SUCCESS)
    .map(toPayload)
    .map(project => new userActions.Update(project));

  constructor(
    private actions$: Actions,
    private service$: ProjectService,
    private router: Router,
    private store$: Store<fromRoot.State>
  ) {

  }
}