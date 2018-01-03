import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';

import { slideToRight } from '../../animations/route.animation';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
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
          priority: 1,
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
          priority: 3,
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
          priority: 3,
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
          priority: 2,
          dueDate: new Date(),
          reminder: new Date()
        }
      ]
    }
  ]

  @HostBinding('@routeAnimation') state;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  handleQuickTask(desc: string) {
    console.log(desc);
  }

  handleMove(e, taskList) {
    switch (e.tag) {
      case 'task-item': {
        console.log("item");
        break;
      }

      case 'task-list': {
        console.log("list");
        break;
      }

      default: break;
    }
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: 'Create task'
      }
    });
  }

  launchNewTaskListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: 'Create task list'
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditTaskListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: 'Edit task list'
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
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

  launchDeleteListDialog() {
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
