import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenInfo } from 'src/app/interface/authenInfo';
import { User } from 'src/app/interface/user';
import { SiblingService } from 'src/app/services/sibling.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hide = true;
  loading = false;
  token: string = ""
  constructor(private fb: FormBuilder, private sibling: SiblingService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router, private toastr: ToastrService, private userService: UserService) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
    })
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    const token = this.route.snapshot.paramMap.get('token') || "";
    this.token = token
  }

  createacc() {
    const fullName = this.form.value.fullName
    const username = this.form.value.username
    const password = this.form.value.password
    this.userService.register(this.token, fullName, username, password).subscribe((res: any) => {
      console.log("res", res);
      if (res.error_code === 0) {
        localStorage.setItem('token', res.token)
        this.router.navigate(['dashboard']);
      } else {
        this.error(res.message);
        this.form.reset();
      }
    },
      (err: any) => {
        this.error(err);
        this.form.reset();
      }
    )
  }
  hidePassword(event: Event) {
    event.preventDefault();
    this.hide = !this.hide;
  }
  error(message: string) {
    this._snackBar.open(message, 'Again', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 2000);
  }
}
