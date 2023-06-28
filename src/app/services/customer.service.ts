import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SiblingService } from './sibling.service';



const host = window.location.hostname
const apiUrl = 'http://' + host + ':12001/v1/customer-api';
@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private httpClient: HttpClient, private sibling: SiblingService) { }

  getTenant() {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/default/tenants/@all/get_all`, httpOptions).pipe();
  }

  addTenant(name: string, domain: string) {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      data: {
        name: name,
        domain: domain,
      }
    });
    return this.httpClient.post(`${apiUrl}/default/tenants`, body, httpOptions).pipe();
  }

}
