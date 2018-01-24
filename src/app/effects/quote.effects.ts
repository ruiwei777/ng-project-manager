import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as actions from '../actions/quote.action';
import { QuoteService } from '../service/quote.service';

@Injectable()
export class QuoteEffects {
    @Effect()
    quote$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(() => this.service$.getQuote()
            .map(q => new actions.LoadSuccessAction(q))
            .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        )

    constructor(private actions$: Actions, private service$: QuoteService) {

    }
}