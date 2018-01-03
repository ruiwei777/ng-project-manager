import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { itemAnimation } from '../../animations/item.animation';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnimation]
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in';

  constructor() { }

  ngOnInit() {
  }

  onItemClick(){
    this.taskClick.emit();
  }

  onCheckboxClick(e: Event){
    e.stopPropagation();
    this.item.completed = !this.item.completed;
  }

  @HostListener('mouseenter')
  handleMouseEnter() {
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.widerPriority = 'in';
  }

}
