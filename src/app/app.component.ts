import { Component, EventEmitter, Output } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project manager of yours';
  darkTheme = false;

  @Output() toggle = new EventEmitter<void>();

  constructor(private oc: OverlayContainer){

  }
 
  toggleTheme(checked: boolean){
    this.darkTheme = checked;
    this.oc.getContainerElement().classList.add('dark-theme');
  }
}
