import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as taskActions from '../actions/task.action';
import * as actions from '../actions/task-list.action';
import * as fromRoot from '../reducers';
import { TaskListService } from '../service/task-list.service';

@Injectable()
export class TaskListEffects {
  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .switchMap((projectId) => this.service$.get(projectId)
      .map(taskLists => new actions.LoadSuccess(taskLists))
      .catch(err => Observable.of(new actions.LoadFail(JSON.stringify(err))))
    );


  @Effect()
  addTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .switchMap(taskList => this.service$.add(taskList)
      .map(taskList => new actions.AddSuccess(taskList))
      .catch(err => Observable.of(new actions.AddFail(JSON.stringify(err))))
    );

  @Effect()
  updateTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(taskList => this.service$.update(taskList)
      .map(taskList => new actions.UpdateSuccess(taskList))
      .catch(err => Observable.of(new actions.UpdateFail(JSON.stringify(err))))
    );

  @Effect()
  delTaskList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(taskList => this.service$.del(taskList)
      .map(taskList => new actions.DeleteSuccess(taskList))
      .catch(err => Observable.of(new actions.DeleteFail(JSON.stringify(err))))
    );

  @Effect()
  swap$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.LOAD_SUCCESS)
    .map(toPayload)
    .map(lists => new taskActions.Load(lists));

  constructor(
    private actions$: Actions,
    private service$: TaskListService,
    private store$: Store<fromRoot.State>
  ) {

  }
}