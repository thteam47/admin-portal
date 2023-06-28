import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatTableDataSource } from "@angular/material/table";
import { Survey } from "../../../interface/survey";
import { Search } from "../../../interface/search";
import { CustomColumn } from "../../../interface/customColumn";
import { MatListModule } from '@angular/material/list';
import { MatSort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { PanigatorService } from "../../../services/panigator.service";
import { Router } from "@angular/router";
import { ServerService } from "../../../services/server.service";
import { ErrorToastrService } from "../../../services/error-toastr.service";
import { SurveyService } from 'src/app/services/survey.service';
import { Tenant } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { FakeDataService } from 'src/app/services/fake-data.service';

@Component({
  selector: 'app-fake-data',
  templateUrl: './fake-data.component.html',
  styleUrls: ['./fake-data.component.css']
})
export class FakeDataComponent implements OnInit {

  constructor(public dialog: MatDialog, private toastr: ToastrService, private panigator: PanigatorService, private router: Router, private serverService: ServerService, private errToastr: ErrorToastrService, private surveyService: SurveyService, private customerService: CustomerService,  private fakeDataService: FakeDataService) {
  }

  ngOnInit(): void {
    this.getTenants();
  }
  selectedTenantId: string = ""
  tenants: Tenant[] = []
  getTenants() {
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
  onSelectChange(event: any) {
    const selectedValue = event.value;
    localStorage.setItem("tenantId", selectedValue)
  }


  processDataSurveyOnePart() {
    this.fakeDataService.processDataSurveyOnePart().subscribe((res: any) => {
      this.toastr.success('Process Data Survey One Part Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  processDataSurveyTwoPart() {
    this.fakeDataService.processDataSurveyTwoPart().subscribe((res: any) => {
      this.toastr.success('Process Data Survey Two Part Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  processDataTotal() {
    this.fakeDataService.processDataTotal().subscribe((res: any) => {
      this.toastr.success('Process Data Total Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  processDataSumilor() {
    this.fakeDataService.processDataSumilor().subscribe((res: any) => {
      this.toastr.success('Process Data Sumilor Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }
}
