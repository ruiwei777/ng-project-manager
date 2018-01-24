import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

import Project from '../../models/project.model';
import { cardAnimation } from '../../animations/card.animation';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnimation]
})
export class ProjectItemComponent implements OnInit {
  @Input() item: Project;
  @Output() onDelete = new EventEmitter<void>();
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onSelected = new EventEmitter<void>();

  @HostBinding('@cardAnimation') cardState = 'out';


  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target){
    this.cardState = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target){
    this.cardState = 'out';
  }

  onDeleteClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.onDelete.emit();
  }

  onEditClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.onEdit.emit();
  }

  onInviteClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.onInvite.emit();
  }

  onClick(){
    this.onSelected.emit();
  }

}
