import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onToggleClick() {
    this.toggleSidenav.emit();
  }


  onToggleTheme(toggled: boolean){
    this.toggleTheme.emit(toggled);
  }
}
