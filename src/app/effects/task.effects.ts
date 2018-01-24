import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as actions from '../actions/task.action';
import * as fromRoot from '../reducers';
import { TaskService } from '../service/task.service';

@Injectable()
export class TaskEffects {
  @Effect()
  loadTasks$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .switchMap(task => this.service$.getByLists(task)
      .map(task => new actions.LoadSuccess(task))
      .catch(err => Observable.of(new actions.LoadFail(JSON.stringify(err))))
    );


  @Effect()
  addTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .switchMap(task => this.service$.add(task)
      .map(task => new actions.AddSuccess(task))
      .catch(err => Observable.of(new actions.AddFail(JSON.stringify(err))))
    );

  @Effect()
  updateTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(task => this.service$.update(task)
      .map(task => new actions.UpdateSuccess(task))
      .catch(err => Observable.of(new actions.UpdateFail(JSON.stringify(err))))
    );

  @Effect()
  delTask$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(task => this.service$.del(task)
      .map(task => new actions.DeleteSuccess(task))
      .catch(err => Observable.of(new actions.DeleteFail(JSON.stringify(err))))
    );

  @Effect()
  complete$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.COMPLETE)
    .map(toPayload)
    .switchMap(task => this.service$.complete(task)
      .map(task => new actions.CompleteSuccess(task))
      .catch(err => Observable.of(new actions.CompleteFail(JSON.stringify(err))))
    );

  @Effect()
  move$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.MOVE)
    .map(toPayload)
    .switchMap(({ taskId, taskListId }) => this.service$.move(taskId, taskListId)
      .map(task => new actions.MoveSuccess(task))
      .catch(err => Observable.of(new actions.MoveFail(JSON.stringify(err))))
    );

  @Effect()
  moveAll$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.MOVE_ALL)
    .map(toPayload)
    .switchMap(({ srcListId, targetListId }) => this.service$.moveAll(srcListId, targetListId)
      .map(tasks => new actions.MoveAllSuccess(tasks))
      .catch(err => Observable.of(new actions.MoveAllFail(JSON.stringify(err))))
    );

  constructor(
    private actions$: Actions,
    private service$: TaskService,
    private store$: Store<fromRoot.State>
  ) {

  }
}