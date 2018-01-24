import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectListComponent } from '../project-list/project-list.component';

import { User } from '../../domain';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  members: User[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProjectListComponent>
  ) { }

  ngOnInit() {
    this.members = [...this.data.members];
  }

  onSubmit({value, valid}, e:Event) {
    e.preventDefault();
    if(!valid){
      return;
    }

    this.dialogRef.close(this.members);
  }


}
