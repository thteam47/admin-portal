import { Action } from './../../../../interface/action';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { User } from 'src/app/interface/user';
import { Role } from 'src/app/interface/role';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-fake-user',
  templateUrl: './fake-user.component.html',
  styleUrls: ['./fake-user.component.css']
})
export class FakeUserComponent implements OnInit {

  selectRole = new FormControl('', Validators.required);
  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private userService: UserService, private toastr: ToastrService, public dialogRef: MatDialogRef<FakeUserComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      number_user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),]],
    })
  }
  listRole: Role[] = [
    { roleName: "Admin", value: "admin" },
    { roleName: "Assistant", value: "assistant" },
    { roleName: "Staff", value: "staff" },
  ]
  hide = true;
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  complete(): void {
    const number_user = parseInt(this.form.value.number_user, 10);
    const password = this.form.value.password
    this.userService.fakeUser(number_user, password).subscribe((res: any) => {
      this.toastr.success('Fake User Succesfull', 'Done');
      this.dialogRef.close();
    }, (err: any) => {
      this.errToastr.errToastr(err);
      this.form.reset();
    })

  }
}
