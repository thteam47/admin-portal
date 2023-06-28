import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Survey, SurveyResult } from '../interface/survey';
import { SiblingService } from './sibling.service';

const host = window.location.hostname
const apiUrl = 'http://' + host + ':11001/v1/survey-api';
@Injectable({
  providedIn: 'root'
})


export class SurveyService {


  constructor(private httpClient: HttpClient, private sibling: SiblingService) { }

  getData() {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/${tenantId}/surveys/@all/getAll`, httpOptions).pipe();
  }

  fakeCategory(number_category: number) {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      number_category: number_category,
    });
    return this.httpClient.post(`${apiUrl}/${tenantId}/categories/@all/fake_categories`, body, httpOptions).pipe();
  }

  fakeSurvey() {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      number_survey: 1,
    });
    return this.httpClient.post(`${apiUrl}/${tenantId}/survey/@all/fake_surveys`, body, httpOptions).pipe();
  }

  getSurveyByUser() {
    const token = localStorage.getItem('tokenAgent');
    return this.httpClient.get(`${apiUrl}/get_survey_by_user?ctx.token_agent=${token}`).pipe();
  }


  getCategories() {
    const token = localStorage.getItem('token')
    const tenantId = localStorage.getItem('tenantId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    const requestPayload = {
      limit: -1,
      filters: [
        {
          key: "domain_id",
          operator: "equal_to",
          value: tenantId,
        }
      ]
    }
    const queryParams = new HttpParams().set('requestPayload', JSON.stringify(requestPayload));
    return this.httpClient.get(`${apiUrl}/${tenantId}/categories/@all/getAll`,{ ...httpOptions, params: queryParams }).pipe();
  }

  getCategoryByReommendTenant() {
    const token = localStorage.getItem('tokenAgent');
    return this.httpClient.get(`${apiUrl}/get_categories_by_recommend_tenant?ctx.token_agent=${token}`).pipe();
  }

  getSurveyByTenant() {
    const token = localStorage.getItem('tokenAgent');
    return this.httpClient.get(`${apiUrl}/get_survey_by_tenant_id?ctx.token_agent=${token}`).pipe();
  }

  getRequestGenarateRecommendUserCbf(result: SurveyResult) {
    const token = localStorage.getItem('tokenAgent');

    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
      "process_data": result,
    });
    console.log(body);

    return this.httpClient.post(`${apiUrl}/request_genarate_recommend/user/cbf`, body).pipe();
  }

  getRequestGenarateRecommendUserCf(result: SurveyResult) {
    const token = localStorage.getItem('tokenAgent');

    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
      "process_data": result,
    });
    console.log(body);

    return this.httpClient.post(`${apiUrl}/request_genarate_recommend/user/cf`, body).pipe();
  }
}
