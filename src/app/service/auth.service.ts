import {Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Auth, User} from '../domain';

/**
 * Authenticaion, used for registration and login
 */
@Injectable()
export class AuthService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  constructor(private http: Http,
              @Inject('BASE_CONFIG') private config) {
  }

  /**
   * login with credentials，if success will return user, otherwise throw an exception
   *
   * @param user user information, id will be ignored
   */
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get(uri, {params: {'email': user.email}})
      .switchMap(res => {
        if (res.json().length > 0) {
          throw 'username existed';
        }
        return this.http.post(uri, JSON.stringify(user), {headers: this.headers})
          .map(r => ({token: this.token, user: r.json()}));
      });
  }

  /**
   * @param username username
   * @param password password
   */
  login(email: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get(uri, {params: {'email': email, 'password': password}})
      .map(res => {
        if (res.json().length === 0) {
          throw 'Login Failed';
        }
        return {
          token: this.token,
          user: res.json()[0],
          userId: res.json()[0].id
        };
      });
  }
}
