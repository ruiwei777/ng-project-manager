import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { getDate } from 'date-fns';
import { Project } from '../../domain/index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  today: String = `day${getDate(new Date())}`;
  @Input() projects: Project[];
  @Output() navClick = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit() {
  }

  onNavClick(){
    this.navClick.emit();
  }
}
