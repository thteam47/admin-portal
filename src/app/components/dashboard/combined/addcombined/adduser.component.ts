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
import { RecommendService } from 'src/app/services/recommend.service';
import { Combined } from 'src/app/interface/combined';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddCombinedComponent implements OnInit {

  selectRole = new FormControl('', Validators.required);
  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private recommendService: RecommendService, private toastr: ToastrService, public dialogRef: MatDialogRef<AddCombinedComponent>) {
    this.form = this.fb.group({
      tenant_id_2: ['', [Validators.required]],
      number_item_1: ['', [Validators.required]],
      number_item_2: ['', [Validators.required]],
      number_user: ['', [Validators.required]],
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
    const data = <Combined>{
      tenant_id_2: this.form.value.tenant_id_2,
      number_item_1: parseInt(this.form.value.number_item_1),
      number_item_2: parseInt(this.form.value.number_item_2),
      number_user: parseInt(this.form.value.number_user),
    }
    this.recommendService.addCombined(data).subscribe((res: any) => {
      this.toastr.success('Add Combined Succesfull', 'Done');
      this.dialogRef.close();
    }, (err: any) => {
      this.errToastr.errToastr(err);
      this.form.reset();
    })
  }
 

}

