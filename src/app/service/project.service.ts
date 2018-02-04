import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project, User } from '../domain';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {

  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  })

  constructor(private http: Http,
    @Inject('BASE_CONFIG') private config
  ) { }

  add(project: Project): Observable<Project> {
    delete project.id;
    const url = `${this.config.uri}/${this.domain}`;
    return this.http.post(url, JSON.stringify(project), { headers: this.headers })
      .map(res => res.json());
  }

  update(project: Project): Observable<Project> {
    const url = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    }
    return this.http.patch(url, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res.json());
  }

  // DELETE /projects instead of deleting the records
  del(project: Project): Observable<Project> {
    const deltask$ = Observable.from(project.taskLists ? project.taskLists : [])
      .mergeMap(listId => this.http
        .delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    return deltask$.switchMap(p => this.http
      .delete(uri)
      .map(_ => project));
  }

  // GET /projects
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, { params: { 'members_like': userId }, headers: this.headers })
      .map(res => res.json());
  }

  updateTaskLists(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      taskLists: project.taskLists
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .map(res => res.json());
  }

  inviteMembers(projectId: string, users: User[]) {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;

    return this.http
      .get(uri)
      .map(res => res.json() as Project)
      .switchMap(project => {
        const newIds = users.map(user => user.id);
        return this.http.patch(uri, JSON.stringify({ members: newIds }), { headers: this.headers });
      })
      .map(res => res.json());
  }

}