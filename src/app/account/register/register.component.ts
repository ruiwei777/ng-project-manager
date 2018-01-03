import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  items: String[] = Array.from(Array(16), (e, i) => i + 1).map(val => `avatars:svg-${val}`);
  form: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.items = Array.from(Array(16), (e, i) => i + 1).map(val => `avatars:svg-${val}`);
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.required])),
      avatar: new FormControl('avatars:svg-1',Validators.compose([Validators.required]))
    })
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault();
  }

}
