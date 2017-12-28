import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project manager of yours';
  darkTheme = false;

  @Output() toggle = new EventEmitter<void>();

 
  toggleTheme(checked: boolean){
    this.darkTheme = checked;
  }
}
