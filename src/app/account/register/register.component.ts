import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  items: String[] = Array.from(Array(16), (e, i) => i + 1).map(val => `avatars:svg-${val}`);


  constructor() { }

  ngOnInit() {
  }

}
