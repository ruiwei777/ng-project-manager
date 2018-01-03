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

  onDeleteClick() {
    this.onDelete.emit();
  }

  onEditClick() {
    this.onEdit.emit();
  }

  onInviteClick() {
    this.onInvite.emit();
  }

}
