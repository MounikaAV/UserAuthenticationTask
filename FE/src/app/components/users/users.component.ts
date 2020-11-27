import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any = []
  userData: any;
  CurrentLoggedinUserName: any
  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CurrentLoggedinUserName = sessionStorage.getItem('CurrentLoggedinUserName')
    this.getAllUsers()
  }

  getAllUsers() {
    const userData = {
      user_name: this.CurrentLoggedinUserName
    }
    console.log(userData)
    this.userService.getAllUsers(userData).subscribe((res) => {
      console.log(res)
      this.usersList = res
    }, (error) => {
      if (error.status == 404) {
        this.usersList = []
      }
    })
  }
  editUser(selectedUser) {
    const filterdailog = this.dialog.open(PopupComponent, {
      data: {
        userData: selectedUser
      },
      width: '300px',
      height: '45%',
      panelClass: 'filter-dailog-container',
      disableClose: false
    });
    // tslint:disable-next-line: no-shadowed-variable
    filterdailog.afterClosed().subscribe(res => {
      console.log(res);
      this.userData = res
      const jsonData = {
        current_user_name: this.CurrentLoggedinUserName,
        tobeUpdatedUserData: this.userData
      }
      this.userService.upateUser(jsonData).subscribe((res) => {
        this.getAllUsers()
      }, (error) => {
        console.log(error)
      })
    });
  }

  deleteUser(selectedUser) {
    const jsonData = {
      current_user_name: this.CurrentLoggedinUserName,
      tobeDeletedUserData: {
        user_id: selectedUser.user_id,
      }
    }
    this.userService.deleteUser(jsonData).subscribe((res) => {
      this.getAllUsers()
    }, (error) => {
      console.log(error)
    })
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }
}
