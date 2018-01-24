import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  form: FormGroup

  title = '';
  priorities = [
    {
      label: 'Normal',
      value: 1
    },
    {
      label: 'Important',
      value: 2
    },
    {
      label: 'Emergent',
      value: 3
    }
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewTaskComponent>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      desc: [this.data.task ? this.data.task.desc : '', Validators.required],
      priority: [this.data.task ? this.data.task.priority : 3, Validators.required],
      owner: [this.data.task ? [this.data.task.owner] : [this.data.owner], Validators.required],
      followers: [this.data.task ? [...this.data.task.participants] : []],
      dueDate: [this.data.task ? this.data.task.dueDate : ''],
      reminder: [this.data.task ? this.data.task.reminder : ''],
      remark: [this.data.task ? this.data.task.remark : ''],
    })
    this.title = this.data.title;
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault();
    if (!valid) { return; }
    this.dialogRef.close({
      ...value,
      ownerId: value.owner.length > 0 ? value.owner[0].id : null,
      participantIds: value.followers.map(f => f.id)
    })
  }

}
