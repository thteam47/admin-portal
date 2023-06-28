import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Combined } from '../interface/combined';
import { SiblingService } from './sibling.service';

const host = window.location.hostname
const apiUrl = 'http://' + host + ':14001/v1/recommend-api';

@Injectable({
  providedIn: 'root'
})
export class RecommendService {

  constructor(private httpClient: HttpClient, private sibling: SiblingService) { }

  getCombined() {
    const token = localStorage.getItem('token')
    const tenantID = localStorage.getItem('tenantId')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/default/combined_data/get_by)tenant_id/${tenantID}`, httpOptions).pipe();
  }

  addCombined(combined: Combined) {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId') || "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    combined.tenant_id_1 = tenantId 
    let body = JSON.stringify({
      data: combined,
    });
    return this.httpClient.post(`${apiUrl}/default/combined_data/create`, body, httpOptions).pipe();
  }

  approverCombined(combined: Combined) {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId') || "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    combined.tenant_id_2 = tenantId 
    let body = JSON.stringify({
      data: combined,
    });
    return this.httpClient.put(`${apiUrl}/default/combined_data/approve`, body, httpOptions).pipe();
  }
}
