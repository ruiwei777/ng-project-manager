import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{title}}</h1>
    <mat-dialog-content>
      {{content}}
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-raised-button role="button" color="primary" (click)="onClick(true)">Confirm</button>
      <button mat-raised-button role="button" mat-dialog-close (click)="onClick(false)">Cancel</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {

  title = '';
  content = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  onClick(confirmed: boolean) {
    this.dialogRef.close(confirmed);
  }
}
