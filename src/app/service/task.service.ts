import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task, TaskList, User } from '../domain';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class TaskService {

  private readonly domain = 'tasks';
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  constructor(private http: Http,
    @Inject('BASE_CONFIG') private config
  ) { }

  add(task: Task): Observable<Task> {
    delete task.id;
    const url = `${this.config.uri}/${this.domain}`;
    return this.http.post(url, JSON.stringify(task), { headers: this.headers })
      .map(res => res.json());
  }

  update(task: Task): Observable<Task> {
    const url = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      remark: task.remark
    }
    return this.http.patch(url, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res.json());
  }

  // DELETE /projects instead of deleting the records
  del(task: Task): Observable<Task> {
    const url = `${this.config.uri}/tasklists/${task.id}`;
    return this.http.delete(url)
      .mapTo(task);
  }

  // GET /projects
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'taskListId': taskListId } })
      .map(res => res.json() as Task[]);
  }

  getByLists(lists: TaskList[]): Observable<Task[]> {
    return Observable.from(lists)
      .mergeMap(list => this.get(list.id))
      .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []);
  }

  complete(task: Task): Observable<Task> {
    const url = `${this.config.uri}/${this.domain}/${task.id}`;

    return this.http.patch(url, JSON.stringify({ completed: !task.completed }), { headers: this.headers })
      .map(res => res.json());
  }

  move(taskId: string, taskListId: string): Observable<Task> {
    const url = `${this.config.uri}/${this.domain}/${taskId}`;

    return this.http.patch(url, JSON.stringify({ taskListId }))
      .map(res => res.json());
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce((arr, x) => [...arr, x], []);
  }

}