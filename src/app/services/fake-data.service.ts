import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SiblingService } from './sibling.service';


const host = window.location.hostname
const apiUrl = 'http://' + host + ':14001/v1/recommend-api';
@Injectable({
  providedIn: 'root'
})

export class FakeDataService {

  constructor(private httpClient: HttpClient, private sibling: SiblingService) { }

  genKey() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/fake/key_info/${tenantId}`, body).pipe();
  }

  doSurvey() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/do_survey/${tenantId}`, body).pipe();
  }

  processDataSurveyOnePart() {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId') || "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    let body = JSON.stringify({
      ctx: {
        part: 1,
      }
    });
    
    return this.httpClient.post(`${apiUrl}/${tenantId}/process_data_survey/${tenantId}`, body, httpOptions).pipe();
  }

  processDataSurveyTwoPart() {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId') || "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    let body = JSON.stringify({
      ctx: {
        part: 2,
      }
    });
    
    return this.httpClient.post(`${apiUrl}/${tenantId}/process_data_survey/${tenantId}`, body, httpOptions).pipe();
  }

  processDataTotal() {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId') || "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    
    return this.httpClient.post(`${apiUrl}/${tenantId}/process_data_total/${tenantId}`, httpOptions).pipe();
  }

  processDataSumilor() {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId') || "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    
    return this.httpClient.post(`${apiUrl}/${tenantId}/process_data_sumilor/${tenantId}`, httpOptions).pipe();
  }

}
