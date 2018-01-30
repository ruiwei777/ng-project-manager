import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <div class="container">
    <p class="content">
      <mat-icon>sentiment_very_dissatisfied</mat-icon>&nbsp;You have come to a dessert...
    </p>
  </div>
    
  `,
  styles: [`
    .container{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      
    }

    .content{
      color: #444;
      font-size: 1.5em;
      font-family: "Open Sans", sans-serif;
    }
  `]
})
export class NotFoundComponent { }
