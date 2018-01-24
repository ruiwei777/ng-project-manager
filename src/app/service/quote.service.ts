import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Quote } from '../domain/quote.model';

import { map } from 'rxjs/operators';

@Injectable()
export class QuoteService {

    constructor(private http: Http, @Inject('BASE_CONFIG') private config){

    }

    getQuote(): Observable<Quote>{
        const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
        return this.http.get(uri).pipe(
            map(res => res.json() as Quote)
        )
    }
}