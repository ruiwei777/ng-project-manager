import { Action } from '@ngrx/store';
import { Auth, User, Project } from '../domain';

import { type } from '../utils/type.util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  ADD: '[User] Add User Project',
  ADD_SUCCESS: '[User] Add User Project Success',
  ADD_FAIL: '[User] Add User Project Fail',
  UPDATE: '[User] Update User Project',
  UPDATE_SUCCESS: '[User] Update User Project Success',
  UPDATE_FAIL: '[User] Update User Project Fail',
  DELETE: '[User] Delete User Project',
  DELETE_SUCCESS: '[User] Delete User Project Success',
  DELETE_FAIL: '[User] Delete User Project Fail',
  LOAD: '[User] Load User By Projects',
  LOAD_SUCCESS: '[User] Load User By Projects Success',
  LOAD_FAIL: '[User] Load User By Projects Fail',
  SEARCH: '[User] Search',
  SEARCH_SUCCESS: '[User] Search Success',
  SEARCH_FAIL: '[User] Search Fail',
};

export interface UserProject {
  user: User;
  projectId: string;
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class Add implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: UserProject) { }
}

export class AddSuccess implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: User) { }
}

export class AddFail implements Action {
  readonly type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

export class Update implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: Project) { }
}

export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: User[]) { }
}

export class UpdateFail implements Action {
  readonly type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

export class Delete implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: UserProject) { }
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;

  constructor(public payload: User) { }
}

export class DeleteFail implements Action {
  readonly type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class Load implements Action {
  readonly type = ActionTypes.LOAD;

  /**
   * 
   * @param payload projectId, load users based on this project
   */
  constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: User[]) { }
}

export class LoadFail implements Action {
  readonly type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class Search implements Action {
  readonly type = ActionTypes.SEARCH;

  constructor(public payload: string) { }
}

export class SearchSuccess implements Action {
  readonly type = ActionTypes.SEARCH_SUCCESS;

  constructor(public payload: User[]) { }
}

export class SearchFail implements Action {
  readonly type = ActionTypes.SEARCH_FAIL;

  constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ActionTypes = Add | AddSuccess | AddFail | Update | UpdateSuccess | UpdateFail | Load | LoadSuccess | LoadFail | Delete | DeleteSuccess | DeleteFail | Search | SearchSuccess | SearchFail;
