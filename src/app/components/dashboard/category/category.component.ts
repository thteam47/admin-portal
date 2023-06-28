import { ChangepassuserComponent } from './../account/changepassuser/changepassuser.component';
import { RoleComponent } from './../account/role/role.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';
import { Category } from 'src/app/interface/survey';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeinfouserComponent } from '../account/changeinfouser/changeinfouser.component';
import { ApproveUserComponent } from '../account/approve-user/approve-user.component';
import { MfaComponent } from '../account/mfa/mfa.component';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { ConfimedeletecategoryComponent } from './confimedeletecategory/confimedeleteuser.component';
import { AddCategoryComponent } from './addcategory/adduser.component';
import { SurveyService } from 'src/app/services/survey.service';
import { Tenant } from 'src/app/interface/customer';
import { FakeCategoryComponent } from './fake-category/fake-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  datas: Category[] = [];
  displayedColumns: string[] = ["category_id", "name", "position", "action"];
  dataSource = new MatTableDataSource<Category>(this.datas);
  constructor(private userService: UserService, private customerService: CustomerService, private surveyService: SurveyService, private errToastr: ErrorToastrService, private router: Router, public dialog: MatDialog) { }

  categories: Category[] = []
  ngOnInit(): void {
    //this.getAllUser();
    this.getTenant();
    this.getCategories();
  }
  selectedCategoryId: string = ""
  @ViewChild(MatSort) sort!: MatSort;
  getAllUser() {
    this.datas = [];
    this.userService.getAllUser().subscribe((res: any) => {
      console.log(res)
      for (var key in res.data) {
        this.datas.push(res.data[key])
      }
      this.dataSource = new MatTableDataSource<Category>(this.datas);
      this.dataSource.sort = this.sort;
    },
      (err: any) => {
        this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err);
      }
    )
  }
  onSelectChange(event: any) {
    const selectedValue = event.value;
    localStorage.setItem("tenantId", selectedValue)
    this.getCategories();
  }
  selectedTenantId: string = ""
  tenants: Tenant[] = []
  getTenant() {
    this.customerService.getTenant().subscribe((res: any) => {
      console.log(res)
      if (res.data.length > 0) {
        this.selectedTenantId = res.data[0].tenant_id
        localStorage.setItem("tenantId", this.selectedTenantId)
      }
      console.log(this.selectedTenantId);

      this.tenants = res.data
    },
      (err: any) => {
        this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err.error.err);
      }
    )
  }
  fakeData() {
    const dialogRef = this.dialog.open(FakeCategoryComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCategories();
      }, 5000)
    });
  }
  getCategories() {
    this.categories = []
    this.datas = []
    this.dataSource = new MatTableDataSource<Category>([]);
    this.surveyService.getCategories().subscribe((res: any) => {
      console.log(res)
      for (var key in res.data) {
        this.datas.push(res.data[key])
      }
      this.dataSource = new MatTableDataSource<Category>(this.datas);
      this.dataSource.sort = this.sort;

      this.categories = res.data
    },
      (err: any) => {
        this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err.error.err);
      }
    )
  }
  viewRole(element: any) {
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '300px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
  editUser(element: any) {
    const dialogRef = this.dialog.open(ChangeinfouserComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCategories();
      }, 1000)
    });
  }
  changePass(element: any) {
    const dialogRef = this.dialog.open(ChangepassuserComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCategories();
      }, 1000)
    });
  }
  deleteUser(element: any) {
    const dialogRef = this.dialog.open(ConfimedeletecategoryComponent, {
      width: '400px',
      data: { userId: element.userId }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCategories();
      }, 1000)
    });
  }
  approveUser(element: any) {
    const dialogRef = this.dialog.open(ApproveUserComponent, {
      width: '400px',
      data: { userId: element.userId }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCategories();
      }, 1000)
    });
  }
  addUser() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCategories();
      }, 1000)
    });
  }
  changeMfa(element: any) {
    const dialogRef = this.dialog.open(MfaComponent, {
      width: '500px',
      data: { userId: element.userId }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCategories();
      }, 1000)
    });
  }

}
