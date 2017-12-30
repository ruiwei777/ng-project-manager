import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: 'List 1',
      tasks: [
        {
          id: 1,
          completed: true,
          desc: 'First task of list 1',
          owner: {
            id: 1,
            name: 'Jack',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          completed: false,
          desc: 'First task of list 2',
          owner: {
            id: 2,
            name: 'Tony',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          reminder: new Date()
        }
      ]
    },
    {
      id: 2,
      name: 'List 2',
      tasks: [
        {
          id: 1,
          completed: true,
          desc: 'First task of list 2',
          owner: {
            id: 1,
            name: 'Jack',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          completed: true,
          desc: 'First task of list 2',
          owner: {
            id: 2,
            name: 'Tony',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          reminder: new Date()
        }
      ]
    }
  ]

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: 'Create task'
      }
    });

  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {
      data: {
        lists: this.lists
      }
    });
  }

  launchUpdateTaskDialog(task: any) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: 'Edit task',
        task 
      }
    });
  }

  launchDeleteListDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete list',
        content: 'Are you sure to delete the list?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
