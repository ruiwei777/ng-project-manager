import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Output() taskClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onItemClick(){
    this.taskClick.emit();
  }

  onCheckboxClick(e: Event){
    e.stopPropagation();
  }

}
