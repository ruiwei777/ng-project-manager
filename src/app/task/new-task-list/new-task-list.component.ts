import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss']
})
export class NewTaskListComponent implements OnInit {

  title = '';
  form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) private data, 
    private dialogRef: MatDialogRef<NewTaskListComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.taskList ? this.data.taskList.name : '', Validators.required]
    })
    this.title = this.data.title;
  }


  onSubmit({value, valid}, e: Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }
}
