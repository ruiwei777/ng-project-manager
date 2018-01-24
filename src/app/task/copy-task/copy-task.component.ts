import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TaskList } from '../../domain/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss']
})
export class CopyTaskComponent implements OnInit {

  form: FormGroup;
  lists: TaskList[];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<CopyTaskComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      targetListId: []
    })
    this.lists = this.data.lists;
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault();
    if (!valid) { return; }
    this.dialogRef.close(value.targetListId);
  }

}
