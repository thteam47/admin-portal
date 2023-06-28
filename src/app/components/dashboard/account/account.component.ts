import { ChangeinfouserComponent } from './changeinfouser/changeinfouser.component';
import { ChangepassuserComponent } from './changepassuser/changepassuser.component';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RoleComponent } from './role/role.component';
import { MfaComponent } from './mfa/mfa.component';
import { Mfas } from 'src/app/interface/mfas';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User = <User>{};
  constructor(public dialog: MatDialog,private userService: UserService, public dialogRef: MatDialogRef<AccountComponent>, private toastr: ToastrService, private errToastr: ErrorToastrService) { }
  mfa: Mfas = <Mfas>{};
  ngOnInit(): void {
    this.getInfo();
  }
  closeDiaLog(){
    this.dialogRef.close();
  }
  getInfo() {
    this.userService.getUserInfo().subscribe((res: any) => {
      console.log(res);
      this.user = res.data
      this.getMfa()
      console.log(this.mfa);
      
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }
  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }
  getMfa() {
    this.userService.getUserMfa(this.user.user_id).subscribe((res: any) => {
      console.log(res);
      if (res.mfas.length > 0) {
        this.mfa = res.mfas[0]
      }
      
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }
  changePass(){
    const dialogRef = this.dialog.open(ChangepassuserComponent, {
      width: '500px',
      data: { idUser: "null", password:this.user.password }
    });
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
  editUser(){
    const dialogRef = this.dialog.open(ChangeinfouserComponent, {
      width: '500px',
      data: { idUser: "null", full_name:this.user.full_name,username:this.user.username,email:this.user.email }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getInfo();
    });
  }

  updateMfa(){
    const dialogRef = this.dialog.open(MfaComponent, {
      width: '500px',
      data: { user_id: this.user.user_id, public_data:this.mfa.public_data, type:this.mfa.type }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getInfo();
    });
  }
  viewRole(){
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '300px',
      data: { action:this.user.action }
    });
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }


}
