import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header;
  @Output() deleteList = new EventEmitter<void>();
  @Output() editList = new EventEmitter<void>();
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAll = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onDeleteClick(){
    this.deleteList.emit();
    console.log('task-header: onDeleteClick');
  }

  onEditClick(){
    this.editList.emit();
    console.log('task-header: onEditClick');
  }

  onNewTaskClick(){
    this.newTask.emit();
    console.log('task-header: onNewTaskClick');
  }

  onMoveAllClick(){
    this.moveAll.emit();
    console.log('task-header: onMoveALlClick');
  }
}
