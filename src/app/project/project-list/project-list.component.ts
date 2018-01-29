import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Project } from '../../domain/project.model';
import { ProjectService } from '../../service/project.service';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

import { slideToRight } from '../../animations/route.animation';
import { listAnimation } from '../../animations/list.animation';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.action';

import { environment } from '../../../environments/environment'

import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../domain/index';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation]
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projects$: Observable<Project[]>;
  listAnim$: Observable<number>;

  @HostBinding('@routeAnimation') state;

  constructor(
    private dialog: MatDialog,
    private service$: ProjectService,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(new actions.Load(null));
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.listAnim$ = this.projects$.map(p => p.length);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  openNewProjectDialog(): void {
    const selectedImg = `${environment.publicPath}/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { thumbnails: this.getThumbnails(), img: selectedImg },
      width: '500px'
    });

    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      .subscribe(project => this.store$.dispatch(new actions.Add(project)));
  }

  launchDeleteDialog(project: Project): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete project',
        content: 'Are you sure to delete the project?'
      }
    });
    dialogRef.afterClosed().take(1)
      .filter(n => n)
      .subscribe(() => {
        this.store$.dispatch(new actions.Delete(project));
      });
  }

  launchInviteDialog(project: Project): void {
    let users: User[] = [];
    this.store$.select(fromRoot.getProjectUsers(project.id))
      .take(1)
      .subscribe(members => users = members);

    this.dialog.open(InviteComponent, {
      data: { members: users },
      width: '500px'
    })
      .afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(data => this.store$.dispatch(new actions.Invite({ projectId: project.id, members: data })))

  }

  launchUpdateDialog(project: Project): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { thumbnails: this.getThumbnails(), project }
    });

    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({ ...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg) }))
      .subscribe(project => {
        this.store$.dispatch(new actions.Update(project));
      });
  }

  selectProject(project: Project) {
    this.store$.dispatch(new actions.Select(project));
  }

  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `${environment.publicPath}/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
}
