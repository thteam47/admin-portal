import { Action } from './../../../../interface/action';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { User } from 'src/app/interface/user';
import { ConfirmedValidator } from './comfirmed';
import { Role } from 'src/app/interface/role';
import { ThemePalette } from '@angular/material/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddTenantComponent implements OnInit {

  selectRole = new FormControl('', Validators.required);
  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private customerService: CustomerService, private toastr: ToastrService, public dialogRef: MatDialogRef<AddTenantComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      domain: ['', [Validators.required]],
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
    const name = this.form.value.name
    const domain = this.form.value.domain
    this.customerService.addTenant(name, domain).subscribe((res: any) => {
      this.toastr.success('Add Tenant Succesfull', 'Done');
      this.dialogRef.close();
    }, (err: any) => {
      this.errToastr.errToastr(err);
      this.form.reset();
    })

  }
  action = new FormControl();
  listAction: Action[] = [
    { actionName: "Add Server", value: "Add Server" },
    { actionName: "Update Server", value: "Update Server" },
    { actionName: "Detail Status", value: "Detail Status" },
    { actionName: "Export", value: "Export" },
    { actionName: "Connect", value: "Connect" },
    { actionName: "Disconnect", value: "Disconnect" },
    { actionName: "Delete Server", value: "Delete Server" },
    { actionName: "Change Password", value: "Change Password" },
  ]

}

