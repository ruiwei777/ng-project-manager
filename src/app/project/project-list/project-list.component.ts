import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import Project from '../../models/project.model';

import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [
    {
      name: 'name 1',
      desc: 'desc 1',
      coverImg: '/assets/img/covers/1.jpg'
    },
    {
      name: 'name 2',
      desc: 'desc 2',
      coverImg: '/assets/img/covers/2.jpg'
    },
    {
      name: 'name 3',
      desc: 'desc 3',
      coverImg: '/assets/img/covers/3.jpg'
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: '500px',
      data: { name: 'hi', email: 'email', title: 'Create Project' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`${result}`);
    });
  }

  launchDeleteDialog(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete project',
        content: 'Are you sure to delete the project?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
