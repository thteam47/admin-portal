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
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-fake-survey',
  templateUrl: './fake-survey.component.html',
  styleUrls: ['./fake-survey.component.css']
})
export class FakeSurveyComponent implements OnInit {

  selectRole = new FormControl('', Validators.required);
  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private surveyService: SurveyService, private toastr: ToastrService, public dialogRef: MatDialogRef<FakeSurveyComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      number_category: ['', [Validators.required]],
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
    const number_category = parseInt(this.form.value.number_category, 10);
    this.surveyService.fakeCategory(number_category).subscribe((res: any) => {
      this.toastr.success('Fake Category Succesfull', 'Done');
      this.dialogRef.close();
    }, (err: any) => {
      this.errToastr.errToastr(err);
      this.form.reset();
    })

  }
}
