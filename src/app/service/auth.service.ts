import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Auth, User } from '../domain';

/**
 * Authenticaion, used for registration and login
 */
@Injectable()
export class AuthService {

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
  '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  /**
   * login with credentials，if success will return user, otherwise throw an exception
   *
   * @param user user information, id will be ignored
   */
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get<User>(uri, { params: { 'email': user.email } })
      .switchMap(user => {
        if (user) { throw 'username existed'; }

        return this.http.post<User>(uri, user)
          .map(user => ({ token: this.token, user, userId: user.id }));
      });
  }

  /**
   * @param email
   * @param password
   */
  login(email: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get<User[]>(uri, { params: { 'email': email, 'password': password } })
      .map(users => {
        if (!users.length) { throw 'Login Failed'; }

        const user = users[0]
        return {
          token: this.token,
          user,
          userId: user.id
        };
      });
  }
}
