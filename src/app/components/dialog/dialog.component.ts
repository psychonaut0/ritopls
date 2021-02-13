import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  /**
   * Angular material dialog used for handle http request
   * errors, showing status code and description of the error.
   * It's called in every rxjs subscribe error.
   * Check HTML to see the dialog layout.
   */

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }

}
