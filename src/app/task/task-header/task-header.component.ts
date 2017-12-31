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
  }

  onEditClick(){
    this.editList.emit();
  }

  onNewTaskClick(){
    this.newTask.emit();
  }

  onMoveAllClick(){
    this.moveAll.emit();
  }
}
