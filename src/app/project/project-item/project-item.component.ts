import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import Project from '../../models/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() item: Project;
  @Output() onInvite = new EventEmitter<void>();
  

  constructor() { }

  ngOnInit() {
  }

  onInviteClick(){
    this.onInvite.emit();
  }

}
