import { Action } from '@ngrx/store';
import { Auth, User, Project } from '../domain';

import { type } from '../utils/type.util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
    ADD: '[Project] Add',
    ADD_SUCCESS: '[Project] Add Success',
    ADD_FAIL: '[Project] Add Fail',
    UPDATE: '[Project] Update',
    UPDATE_SUCCESS: '[Project] Update Success',
    UPDATE_FAIL: '[Project] Update Fail',
    DELETE: '[Project] Delete',
    DELETE_SUCCESS: '[Project] Delete Success',
    DELETE_FAIL: '[Project] Delete Fail',
    LOAD: '[Project] Load',
    LOAD_SUCCESS: '[Project] Load Success',
    LOAD_FAIL: '[Project] Load Fail',
    INVITE: '[Project] Invite',
    INVITE_SUCCESS: '[Project] Invite Success',
    INVITE_FAIL: '[Project] Invite Fail',
    SELECT: '[Project] Select'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class Add implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Project) { }
}

export class AddSuccess implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Project) { }
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

    constructor(public payload: Project) { }
}

export class UpdateFail implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}

export class Delete implements Action {
    readonly type = ActionTypes.DELETE;

    constructor(public payload: Project) { }
}

export class DeleteSuccess implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;

    constructor(public payload: Project) { }
}

export class DeleteFail implements Action {
    readonly type = ActionTypes.DELETE_FAIL;

    constructor(public payload: string) { }
}

export class Load implements Action {
    readonly type = ActionTypes.LOAD;

    constructor(public payload: null) { }
}

export class LoadSuccess implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: Project[]) { }
}

export class LoadFail implements Action {
    readonly type = ActionTypes.LOAD_FAIL;

    constructor(public payload: string) { }
}

export class Invite implements Action {
    readonly type = ActionTypes.INVITE;

    constructor(public payload: { projectId: string; members: User[] }) { }
}

export class InviteSuccess implements Action {
    readonly type = ActionTypes.INVITE_SUCCESS;

    constructor(public payload: Project[]) { }
}

export class InviteFail implements Action {
    readonly type = ActionTypes.INVITE_FAIL;

    constructor(public payload: string) { }
}

export class Select implements Action {
    readonly type = ActionTypes.SELECT;

    constructor(public payload: Project) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ActionTypes = Add | AddSuccess | AddFail | Update | UpdateSuccess | UpdateFail | Load | LoadSuccess | LoadFail | Delete | DeleteSuccess | DeleteFail | Invite | InviteSuccess | InviteFail | Select;
