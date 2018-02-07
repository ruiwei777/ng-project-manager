import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../domain/quote.model';

@Injectable()
export class QuoteService {

    constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config){

    }

    getQuote(): Observable<Quote>{
        const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
        return this.http.get<Quote>(uri);
    }
}