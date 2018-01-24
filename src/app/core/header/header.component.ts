import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../../domain/index';
import * as AuthActions from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<boolean>();

  auth$: Observable<Auth>;
  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(fromRoot.getAuthState);
   }

  ngOnInit() {
  }

  onToggleClick() {
    this.toggleSidenav.emit();
  }


  onToggleTheme(toggled: boolean){
    this.toggleTheme.emit(toggled);
  }

  logout(){
    this.store$.dispatch(new AuthActions.LogoutAction(null));
  }
}
