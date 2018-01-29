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

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.cardState = 'hover';
    // console.log('Enter: ', this.cardState);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.cardState = 'out';
    // console.log('Leave: ', this.cardState);
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
