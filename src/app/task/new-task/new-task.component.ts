import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

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

  constructor(@Inject(MAT_DIALOG_DATA)  private data: any) { }

  ngOnInit() {
    this.title = this.data.title || 'Please provided a title through data';
  }

}
