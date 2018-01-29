import { Component, EventEmitter, Output } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { Observable } from 'rxjs/Observable';
import { Project } from './domain/index';

import * as routerActions from './actions/router.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project manager of yours';
  darkTheme = false;
  projects$: Observable<Project[]>

  @Output() toggle = new EventEmitter<void>();

  constructor(private oc: OverlayContainer, private store$: Store<fromRoot.State>){
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }
 
  toggleTheme(checked: boolean){
    this.darkTheme = checked;
    this.oc.getContainerElement().classList.toggle('dark-theme');
  }

  navigateBack(){
    this.store$.dispatch(new routerActions.Back());
  }
}
