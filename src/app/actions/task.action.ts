import { Action } from '@ngrx/store';
import { Auth, User, Task, TaskList } from '../domain';

import { type } from '../utils/type.util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  ADD: '[Task] Add',
  ADD_SUCCESS: '[Task] Add Success',
  ADD_FAIL: '[Task] Add Fail',
  UPDATE: '[Task] Update',
  UPDATE_SUCCESS: '[Task] Update Success',
  UPDATE_FAIL: '[Task] Update Fail',
  DELETE: '[Task] Delete',
  DELETE_SUCCESS: '[Task] Delete Success',
  DELETE_FAIL: '[Task] Delete Fail',
  LOAD: '[Task] Load',
  LOAD_SUCCESS: '[Task] Load Success',
  LOAD_FAIL: '[Task] Load Fail',
  MOVE: '[Task] Move',
  MOVE_SUCCESS: '[Task] Move Success',
  MOVE_FAIL: '[Task] Move Fail',
  MOVE_ALL: '[Task] Move All',
  MOVE_ALL_SUCCESS: '[Task] Move All Success',
  MOVE_ALL_FAIL: '[Task] Move All Fail',
  COMPLETE: '[Task] Complete',
  COMPLETE_SUCCESS: '[Task] Complete Success',
  COMPLETE_FAIL: '[Task] Complete Fail',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class Add implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: Task) { }
}

export class AddSuccess implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Task) { }
}

export class AddFail implements Action {
  readonly type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

export class Update implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: Task) { }
}

export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Task) { }
}

export class UpdateFail implements Action {
  readonly type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

export class Delete implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: Task) { }
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: Task) { }
}

export class DeleteFail implements Action {
  readonly type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class Load implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: TaskList[]) { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Task[]) { }
}

export class LoadFail implements Action {
  readonly type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class Move implements Action {
  readonly type = ActionTypes.MOVE;

  constructor(public payload: { taskId: string, taskListId: string }) { }
}

export class MoveSuccess implements Action {
  readonly type = ActionTypes.MOVE_SUCCESS;

  constructor(public payload: Task) { }
}

export class MoveFail implements Action {
  readonly type = ActionTypes.MOVE_FAIL;

  constructor(public payload: string) { }
}

export class MoveAll implements Action {
  readonly type = ActionTypes.MOVE_ALL;

  constructor(public payload: { srcListId: string, targetListId: string }) { }
}

export class MoveAllSuccess implements Action {
  readonly type = ActionTypes.MOVE_ALL_SUCCESS;

  constructor(public payload: Task[]) { }
}

export class MoveAllFail implements Action {
  readonly type = ActionTypes.MOVE_ALL_FAIL;

  constructor(public payload: string) { }
}

export class Complete implements Action {
  readonly type = ActionTypes.COMPLETE;

  constructor(public payload: Task) { }
}

export class CompleteSuccess implements Action {
  readonly type = ActionTypes.COMPLETE_SUCCESS;

  constructor(public payload: Task) { }
}

export class CompleteFail implements Action {
  readonly type = ActionTypes.COMPLETE_FAIL;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ActionTypes = Add | AddSuccess | AddFail | Update | UpdateSuccess | UpdateFail | Load | LoadSuccess | LoadFail | Delete | DeleteSuccess | DeleteFail | Move | MoveSuccess | MoveFail | MoveAll | MoveAllSuccess | MoveAllFail | Complete | CompleteSuccess | CompleteFail;
