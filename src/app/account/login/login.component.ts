import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['test@dev.com', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault();
  }

  customEmailValidator(fc: FormControl): { [key: string]: any } {
    if (!fc.value) {
      return null;
    }

    const pattern = /^test/;
    if (pattern.test(fc.value)) {
      return null;
    }

    return { emailNotValid: 'Must start with "test"' };
  }

}
