import { ChangepassuserComponent } from './../account/changepassuser/changepassuser.component';
import { RoleComponent } from './../account/role/role.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';
import { Tenant } from 'src/app/interface/customer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeinfouserComponent } from '../account/changeinfouser/changeinfouser.component';
import { ApproveUserComponent } from '../account/approve-user/approve-user.component';
import { ConfimedeletetenantComponent } from './confimedeleteuser/confimedeleteuser.component';
import { AddTenantComponent } from './adduser/adduser.component';
import { MfaComponent } from '../account/mfa/mfa.component';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
  datas: Tenant[] = [];
  displayedColumns: string[] = ["tenant_id", "name", "domain", "customer_id", "action"];
  dataSource = new MatTableDataSource<Tenant>(this.datas);
  constructor(private userService: UserService, private customerService: CustomerService, private errToastr: ErrorToastrService, private router: Router, public dialog: MatDialog) { }

  tenants: Tenant[] = []
  ngOnInit(): void {
    //this.getAllUser();
    this.getTenants();
  }
  selectedTenantId: string = ""
  @ViewChild(MatSort) sort!: MatSort;
  getAllUser() {
    this.datas = [];
    this.userService.getAllUser().subscribe((res: any) => {
      console.log(res)
      for (var key in res.data) {
        this.datas.push(res.data[key])
      }
      this.dataSource = new MatTableDataSource<Tenant>(this.datas);
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
  }
  getTenants() {
    this.tenants = []
    this.datas = []
    this.dataSource = new MatTableDataSource<Tenant>([]);
    this.customerService.getTenant().subscribe((res: any) => {
      console.log(res)
      for (var key in res.data) {
        this.datas.push(res.data[key])
      }
      this.dataSource = new MatTableDataSource<Tenant>(this.datas);
      this.dataSource.sort = this.sort;

      this.tenants = res.data
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
        this.getTenants();
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
        this.getTenants();
      }, 1000)
    });
  }
  deleteUser(element: any) {
    const dialogRef = this.dialog.open(ConfimedeletetenantComponent, {
      width: '400px',
      data: { userId: element.userId }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getTenants();
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
        this.getTenants();
      }, 1000)
    });
  }
  addUser() {
    const dialogRef = this.dialog.open(AddTenantComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getTenants();
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
        this.getTenants();
      }, 1000)
    });
  }

}
