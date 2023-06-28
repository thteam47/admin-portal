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
import { MfaComponent } from '../account/mfa/mfa.component';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Combined } from 'src/app/interface/combined';
import { AddCombinedComponent } from './addcombined/adduser.component';
import { ConfimedeletecombinedComponent } from './confimedeletecombined/confimedeleteuser.component';
import { RecommendService } from 'src/app/services/recommend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-combined',
  templateUrl: './combined.component.html',
  styleUrls: ['./combined.component.css']
})
export class CombinedComponent implements OnInit {

  datas: Combined[] = [];
  displayedColumns: string[] = ["combined_data_id", "tenant_id_1", "tenant_id_2", "number_item_1", "number_item_2", "number_user", "status", "action"];
  dataSource = new MatTableDataSource<Combined>(this.datas);
  constructor(private userService: UserService, private recommendService: RecommendService, private toastr: ToastrService,private customerService: CustomerService, private errToastr: ErrorToastrService, private router: Router, public dialog: MatDialog) { }

  selectedTenantId: string = ""
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

  combineds: Combined[] = [];


  tenants: Tenant[] = []
  ngOnInit(): void {
    //this.getAllUser();
    this.getTenant();
    this.getCombineds();
    
  }
  selectedCombinedId: string = ""
  @ViewChild(MatSort) sort!: MatSort;
  onSelectChange(event: any) {
    const selectedValue = event.value;
    localStorage.setItem("tenantId", selectedValue)
    this.getCombineds();
  }
  getCombineds() {
    this.combineds = []
    this.datas = []
    this.dataSource = new MatTableDataSource<Combined>([]);
    this.recommendService.getCombined().subscribe((res: any) => {
      console.log(res)
      this.datas.push(res.data)
      this.dataSource = new MatTableDataSource<Combined>(this.datas);
      this.dataSource.sort = this.sort;

      this.combineds = res.data
    },
      (err: any) => {
        console.log(err);
        console.log(err.error.message);
        
        //this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err);
        
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
        this.getCombineds();
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
        this.getCombineds();
      }, 1000)
    });
  }
  deleteUser(element: any) {
    const dialogRef = this.dialog.open(ConfimedeletecombinedComponent, {
      width: '400px',
      data: { userId: element.userId }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCombineds();
      }, 1000)
    });
  }
  approver(element: any) {
    this.recommendService.approverCombined(element).subscribe((res: any) => {
      this.toastr.success('Approver Succesfull', 'Done');
      this.getCombineds()
    }, (err: any) => {
      this.errToastr.errToastr(err);
    })
  }
  addCombined() {
    const dialogRef = this.dialog.open(AddCombinedComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getCombineds();
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
        this.getCombineds();
      }, 1000)
    });
  }
}
