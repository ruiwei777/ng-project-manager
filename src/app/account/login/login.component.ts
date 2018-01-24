import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Quote } from '../../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';
import { slideToRight } from '../../animations/route.animation';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideToRight]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Observable<Quote>;

  @HostBinding('@routeAnimation') state;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>
  ) {
    this.quote$ = this.store$.select(fromRoot.getQuote);
    this.store$.dispatch(new actions.LoadAction(null));
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['test@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['test1234', Validators.required]
    })
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(new authActions.LoginAction(value));
  }
}
