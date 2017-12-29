import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {


  items = [
    {
      id: 1,
      name: "name 1"
    },
    {
      id: 2,
      name: "name 2"
    },
    {
      id: 3,
      name: "name 3"
    },
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProjectListComponent>
  ) { }

  ngOnInit() {
  }

  onSubmit() {

  }

  displayUser(user: { id: number, name: string }): string {
    return user ? user.name : null;
  }
}
