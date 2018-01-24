import { Action } from '@ngrx/store';
import { Auth, User, TaskList } from '../domain';

import { type } from '../utils/type.util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  ADD: '[TaskList] Add',
  ADD_SUCCESS: '[TaskList] Add Success',
  ADD_FAIL: '[TaskList] Add Fail',
  UPDATE: '[TaskList] Update',
  UPDATE_SUCCESS: '[TaskList] Update Success',
  UPDATE_FAIL: '[TaskList] Update Fail',
  DELETE: '[TaskList] Delete',
  DELETE_SUCCESS: '[TaskList] Delete Success',
  DELETE_FAIL: '[TaskList] Delete Fail',
  LOAD: '[TaskList] Load',
  LOAD_SUCCESS: '[TaskList] Load Success',
  LOAD_FAIL: '[TaskList] Load Fail',
  SWAP: '[TaskList] Swap',
  SWAP_SUCCESS: '[TaskList] Swap Success',
  SWAP_FAIL: '[TaskList] Swap Fail',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class Add implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: TaskList) { }
}

export class AddSuccess implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: TaskList) { }
}

export class AddFail implements Action {
  readonly type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

export class Update implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: TaskList) { }
}

export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: TaskList) { }
}

export class UpdateFail implements Action {
  readonly type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

export class Delete implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: TaskList) { }
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: TaskList) { }
}

export class DeleteFail implements Action {
  readonly type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class Load implements Action {
  readonly type = ActionTypes.LOAD;

  /**
   * 
   * @param payload projectId that owns these task lists
   */
  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: TaskList[]) { }
}

export class LoadFail implements Action {
  readonly type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class Swap implements Action {
  readonly type = ActionTypes.SWAP;

  constructor(public payload: { source: TaskList, target: TaskList }) { }
}

export class SwapSuccess implements Action {
  readonly type = ActionTypes.SWAP_SUCCESS;

  constructor(public payload: TaskList[]) { }
}

export class SwapFail implements Action {
  readonly type = ActionTypes.SWAP_FAIL;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ActionTypes = Add | AddSuccess | AddFail | Update | UpdateSuccess | UpdateFail | Load | LoadSuccess | LoadFail | Delete | DeleteSuccess | DeleteFail | Swap | SwapSuccess | SwapFail;
