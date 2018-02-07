import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, User } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  private readonly domain = 'projects';

  constructor(private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) { }

  add(project: Project): Observable<Project> {
    delete project.id;
    const url = `${this.config.uri}/${this.domain}`;
    return this.http.post<Project>(url, project);
  }

  update(project: Project): Observable<Project> {
    const url = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    }
    return this.http.patch<Project>(url, toUpdate);
  }

  // DELETE /projects instead of deleting the records
  del(project: Project): Observable<Project> {
    const deltask$ = Observable.from(project.taskLists ? project.taskLists : [])
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    return deltask$
      .switchMap(p => this.http
        .delete(uri)
        .mapTo(project)
      );
  }

  // GET /projects
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get<Project[]>(uri, { params: { 'members_like': userId } });
  }

  updateTaskLists(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = { taskLists: project.taskLists };
    return this.http.patch<Project>(uri, toUpdate);
  }

  inviteMembers(projectId: string, users: User[]): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;

    return this.http
      .get<Project>(uri)
      .switchMap(project => {
        const newIds = users.map(user => user.id);
        return this.http.patch<Project>(uri, { members: newIds });
      });
  }

}