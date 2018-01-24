import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';
import { extractInfo, getAddrByCode, isValidAddr } from '../../utils/identity.util';
import { isValidDate, toDate } from '../../utils/date.util';
import { slideToRight } from '../../animations/route.animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    slideToRight
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  selectedTab = 0;
  avatars$: Observable<String[]> = Observable.of(Array.from(Array(16), (e, i) => i + 1).map(val => `avatars:svg-${val}`));
  form: FormGroup;
  @HostBinding('@routeAnimation') state;

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      avatar: ['avatars:svg-1', Validators.required],
      dateOfBirth: [''],
      address: [],
    });

  }

  ngOnDestroy() {
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    delete value.confirm_password;
    this.store$.dispatch(new authActions.RegisterAction(value));
  }

  prevTab() {
    this.selectedTab = 0;
  }

  nextTab() {
    this.selectedTab = 1;
  }

  onTabChange(index) {
    this.selectedTab = index;
  }

}
