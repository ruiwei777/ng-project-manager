import { Component, EventEmitter, Input, OnInit, Output, HostListener, HostBinding } from '@angular/core';
import { itemAnimation } from '../../animations/item.animation';
import { Observable } from 'rxjs/Observable';
import { } from 'rxjs/operators';
import { User, Task } from '../../domain/index';
import * as fromRoot from '../../reducers';
import * as taskActions from '../../actions/task.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnimation]
})
export class TaskItemComponent implements OnInit {

  @Input() item: Task;
  @Output() taskClick = new EventEmitter<void>();
  state = 'normal';
  owner$: Observable<User>;

  constructor(private store$: Store<fromRoot.State>) {
    this.owner$ = this.store$.select(fromRoot.getUserEntities).map(entities => entities[this.item.ownerId]);
  }

  ngOnInit() {
  }

  onItemClick() {
    this.taskClick.emit();
  }

  onCheckboxClick(e: Event) {
    e.stopPropagation();
    this.store$.dispatch(new taskActions.Complete(this.item));
  }

  @HostListener('mouseenter')
  handleMouseEnter() {
    this.state = 'hover';
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.state = 'normal';
  }

}
