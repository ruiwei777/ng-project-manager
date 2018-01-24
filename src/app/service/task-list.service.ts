import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList, User } from '../domain';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class TaskListService {

    private readonly domain = 'tasklists';
    private headers = new Headers({
        'Content-Type': 'application/json'
    })

    constructor(private http: Http,
        @Inject('BASE_CONFIG') private config
    ) { }

    add(taskList: TaskList): Observable<TaskList> {
        const url = `${this.config.uri}/${this.domain}`;
        return this.http.post(url, JSON.stringify(taskList), { headers: this.headers })
            .map(res => res.json());
    }

    update(taskList: TaskList): Observable<TaskList> {
        const url = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name,
        }
        return this.http.patch(url, JSON.stringify(toUpdate), { headers: this.headers })
            .map(res => res.json());
    }

    // DELETE /projects instead of deleting the records
    del(taskList: TaskList): Observable<TaskList> {
        const url = `${this.config.uri}/${this.domain}/${taskList.id}`;
        return this.http.delete(url)
            .mapTo(taskList);
    }

    // GET /projects
    get(projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, { params: { projectId } })
            .map(res => res.json());
    }

    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUrl = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUrl = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http.patch(dragUrl, JSON.stringify({ order: target.order }))
            .map(res => res.json());
        const drop$ = this.http.patch(dragUrl, JSON.stringify({ order: src.order }))
            .map(res => res.json());
        return Observable
        .concat(drag$, drop$)
        .reduce((array,y) => [...array, y], [])
    }

}