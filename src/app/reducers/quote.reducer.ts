import * as actions from '../actions/quote.action';
import { Quote } from '../domain';

export interface State {
    quote: Quote
};

export const initialState: State = {
    quote: {
        "id": "5",
        "cn": "当你最终放开了过去，更好的事就会到来。",
        "en": "When you finally let go of the past, something better comes along.",
        "pic": "/assets/img/quotes/5.jpg"
    }
};

export function reducer(state = initialState, action: actions.QuoteActions): State {
    switch (action.type) {
        case actions.ActionTypes.LOAD_SUCCESS: {
            return {
               ...state, quote: <Quote>action.payload
            };
        }

        case actions.ActionTypes.LOAD_FAIL: 

        default: {
            return state;
        }
    }
}

export const getQuote = (state: State) => state.quote;