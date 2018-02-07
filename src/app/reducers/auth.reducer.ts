import * as actions from '../actions/auth.action';
import { Auth, User } from '../domain';

export interface State {
    token: string;
    user: User;
    userId: string;
}


export const initialState: Auth = {
    token: undefined,
    user: null,
    userId: undefined
};

export function reducer(state = initialState, action: actions.Actions): Auth {
    switch (action.type) {
        case actions.ActionTypes.REGISTER_SUCCESS:
        case actions.ActionTypes.LOGIN_SUCCESS: {
            return {
                ...<Auth>action.payload
            };
        }

        case actions.ActionTypes.LOGOUT:
        case actions.ActionTypes.REGISTER_FAIL:
        case actions.ActionTypes.LOGIN_FAIL: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}

export const getUserId = (auth: Auth) => auth.userId;
export const getUser = (auth: Auth) => auth.user;
export const getToken = (auth: Auth) => auth.token;