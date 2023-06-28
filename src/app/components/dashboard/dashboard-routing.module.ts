import { AdminuserComponent } from './adminuser/adminuser.component';
import { AccountComponent } from './account/account.component';
import { NewServerComponent } from './new-server/new-server.component';
import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetailstatusComponent } from './detailstatus/detailstatus.component';
import { TenantComponent } from './tenant/tenant.component';
import { SurveyComponent } from './survey/survey.component';
import { CombinedComponent } from './combined/combined.component';
import { CategoryComponent } from './category/category.component';
import { FakeDataComponent } from './fake-data/fake-data.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '',component: TenantComponent},
      { path: 'account', component: AccountComponent },
      { path: 'newserver', component: NewServerComponent },
      { path: 'user', component: AdminuserComponent },
      { path: 'combined', component: CombinedComponent }, 
      { path: 'survey', component: SurveyComponent },    
      { path: 'category', component: CategoryComponent }, 
      { path: 'fake-data', component: FakeDataComponent }, 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
