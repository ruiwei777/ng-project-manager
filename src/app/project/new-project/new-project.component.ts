import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  title: string = '';
  coverImgs = [];
  form: FormGroup;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.coverImgs = this.data.thumbnails;
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = 'Edit project;'
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img]
      })
      this.title = 'Create project;'
    }
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }
}
