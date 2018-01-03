import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';

import Project from '../../models/project.model';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

import { slideToRight } from '../../animations/route.animation';
import { listAnimation } from '../../animations/list.animation';

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation]
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [
    {
      id: 1,
      name: 'name 1',
      desc: 'desc 1',
      coverImg: `${environment.publicPath}/assets/img/covers/1.jpg`
    },
    {
      id: 2,
      name: 'name 2',
      desc: 'desc 2',
      coverImg: `${environment.publicPath}/assets/img/covers/2.jpg`
    },
    {
      id: 3,
      name: 'name 3',
      desc: 'desc 3',
      coverImg: `${environment.publicPath}/assets/img/covers/3.jpg`
    }
  ];

  @HostBinding('@routeAnimation') state;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '500px',
      data: { name: 'hi', email: 'email', title: 'Create Project' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.projects.push({
        id: 4,
        name: 'name 4',
        desc: 'desc 4',
        coverImg: `${environment.publicPath}/assets/img/covers/3.jpg`
      })
    });
  }

  launchDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete project',
        content: 'Are you sure to delete the project?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projects.splice(this.projects.length-1);
    })
  }

  launchInviteDialog(): void {
    const dialogRef = this.dialog.open(InviteComponent, {
      width: '500px',
      data: {
        title: 'Create project'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`${result}`);
    });
  }

  launchUpdateDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        title: 'Edit project'
      }
    });
  }
}
