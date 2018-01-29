import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';

import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';

import { slideToRight } from '../../animations/route.animation';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskList, Task } from '../../domain/index';

import * as taskListActions from '../../actions/task-list.action';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.projectIdSub.unsubscribe();
  }

  @HostBinding('@routeAnimation') state;
  projectId$: Observable<string>;
  lists$: Observable<TaskList[]>;
  projectIdSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private store$: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {
    this.projectId$ = this.route.params.pluck('id')
    this.projectIdSub = this.projectId$.subscribe(id => this.store$.dispatch(new taskListActions.Load(id)));
    this.lists$ = this.store$.select(fromRoot.getTasksByLists)
  }

  ngOnInit() {
  }

  handleQuickTask(desc: string, list: TaskList) {
    const user$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
      .subscribe(user => this.store$.dispatch(new taskActions.Add({
        desc,
        priority: 3,
        taskListId: list.id,
        ownerId: user.id,
        completed: false,
        createDate: new Date(),
        participantIds: []
      })))
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

  launchNewTaskDialog(list: TaskList) {
    const user$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
      .map(user => this.dialog.open(NewTaskComponent, { data: { title: 'Create task', user } }))
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
      .subscribe(data => this.store$.dispatch(new taskActions.Add({ ...data, taskListId: list.id, completed: false, createDate: new Date() })))
  }

  launchNewTaskListDialog(e: Event) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: { title: 'Create task list' }
    });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(result => {
        this.store$.dispatch(new actions.Add(result));
      })
  }

  launchEditTaskListDialog(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: { title: 'Edit task list', taskList: list }
    });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(result => {
        this.store$.dispatch(new actions.Update({ ...result, id: list.id }));
      })
  }

  launchCopyTaskDialog(list: TaskList) {
    this.lists$.map(l => l.filter(n => n.id !== list.id))
      .map(lists => this.dialog.open(CopyTaskComponent, { data: { lists } }))
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
      .subscribe((data: string) => this.store$.dispatch(new taskActions.MoveAll({srcListId: list.id, targetListId: data})))
  }


  launchUpdateTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: 'Edit task', task } });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(data => {
        this.store$.dispatch(new taskActions.Update({ ...task, ...data }));
      })
  }

  launchDeleteListDialog(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete list', content: 'Are you sure to delete the list?' }
    });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(() => {
        this.store$.dispatch(new actions.Delete(list));
      })
  }

}