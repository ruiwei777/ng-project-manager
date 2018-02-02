import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, TaskList, User } from '../domain';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class TaskService {

  private readonly domain = 'tasks';

  // just an example, this is not needed
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) { }

  add(task: Task): Observable<Task> {
    delete task.id;
    const url = `${this.config.uri}/${this.domain}`;
    return this.http.post<Task>(url, task);
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
    return this.http.patch<Task>(url,toUpdate);
  }

  del(task: Task): Observable<Task> {
    const url = `${this.config.uri}/tasklists/${task.id}`;
    return this.http.delete(url)
      .mapTo(task);
  }

  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get<Task[]>(uri, { params: { 'taskListId': taskListId } });
  }

  getByLists(lists: TaskList[]): Observable<Task[]> {
    return Observable.from(lists)
      .mergeMap(list => this.get(list.id))
      .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []);
  }

  complete(task: Task): Observable<Task> {
    const url = `${this.config.uri}/${this.domain}/${task.id}`;

    return this.http.patch<Task>(url, { completed: !task.completed });
  }

  move(taskId: string, taskListId: string): Observable<Task> {
    const url = `${this.config.uri}/${this.domain}/${taskId}`;

    return this.http.patch<Task>(url, { taskListId });
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce((arr, x) => [...arr, x], []);
  }

}