import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User, Project } from '../domain';

@Injectable()
export class UserService {
  private readonly domain = 'users';

  constructor( @Inject('BASE_CONFIG') private config, private http: HttpClient) { }

  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<User[]>(uri, { params: { 'email_like': filter } });
  }

  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/users`;
    return this.http.get<User[]>(uri, { params: { 'projectId': projectId } });
  }

  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    return this.http.patch<User>(uri, { projectIds: [...projectIds, projectId] });
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http.patch<User>(uri, { projectIds: toUpdate });
  }

  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return Observable.from(memberIds)
      .switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get<User>(uri);
      })
      .filter(user => user.projectIds.indexOf(projectId) < 0)
      .switchMap(u => this.addProjectRef(u, projectId))
      .reduce((users, curr) => [...users, curr], []);
  }
}
