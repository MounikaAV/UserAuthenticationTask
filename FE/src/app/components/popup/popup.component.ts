import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  userData: any;
  first_name: any;
  last_name: any;
  constructor(public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userData = this.data.userData
    this.first_name = this.userData.first_name
    this.last_name = this.userData.last_name
  }

  cancelPopup() {
    // console.log('popupdata : ', this.data);
    this.dialogRef.close({ event: 'cancel', status: false });
  }
  acceptPoup() {
    // console.log('popupdata : ', this.data);
    this.userData.first_name = this.first_name
    this.userData.last_name = this.last_name
    this.dialogRef.close(this.userData);
  }

}
