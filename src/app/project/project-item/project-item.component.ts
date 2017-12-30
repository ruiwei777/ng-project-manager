import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import Project from '../../models/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() item: Project;
  @Output() onDelete = new EventEmitter<void>(); 
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  

  constructor() { }

  ngOnInit() {
  }

  onDeleteClick(){
    this.onDelete.emit();
  }

  onEditClick(){
    this.onEdit.emit();
  }

  onInviteClick(){
    this.onInvite.emit();
  }

}
