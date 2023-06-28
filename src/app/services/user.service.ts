import { changeRole } from './../interface/changeRole';
import { ifUser } from './../interface/ifUser';
import { SiblingService } from 'src/app/services/sibling.service';
import { catchError, tap } from 'rxjs/operators';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { changePas } from '../interface/pass';
import { AuthenInfo } from '../interface/authenInfo';
import { Mfas } from '../interface/mfas';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
}

const host = window.location.hostname
const apiUrl = 'http://' + host + ':9001/v1';
const apiIdentityUrl = 'http://' + host + ':10001/v1/identity-api';

const apiUrlAuthen = 'http://' + host + ':9001/v1/identity-authen-api';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  accessToken: string = "";
  constructor(private httpClient: HttpClient, private sibling: SiblingService) { }
  loginAdmin(authenInfo: AuthenInfo) {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    if (localStorage.getItem('token') !== null) {
      console.log(localStorage.getItem('token'));

      httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    }
    console.log(httpOptions);

    let body = JSON.stringify(authenInfo);
    return this.httpClient.post(`${apiUrlAuthen}/default/login`, body, httpOptions).pipe();
  }
  register(token: string, fullName: string, userName: string, password: string) {
    let body = JSON.stringify({
      ctx: {
        access_token: token,
      },
      full_name: fullName,
      userName: userName,
      password: password,
    });
    return this.httpClient.post(`${apiUrlAuthen}/default/registers`, body, httpOptions).pipe();
  }
  requestVerifyEmail(email: string) {
    let body = JSON.stringify({
      value: email,
    });
    return this.httpClient.post(`${apiUrlAuthen}/default/request_verify_email`, body, httpOptions).pipe();
  }
  verifyUser(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/identity-authen-api/verify-user`, httpOptions).pipe();
  }
  verifyToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/identity-authen-api/verify-forgot-password`, httpOptions).pipe();
  }
  approveUser(id: string, status: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      "userId": id,
      "status": status,
    });
    return this.httpClient.post(`${apiIdentityUrl}/identity-api/users/approve`, body, httpOptions).pipe();
  }
  prepareLogin(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.post(`${apiUrlAuthen}/default/prepare_login`, "", httpOptions).pipe();
  }
  forgotPassword(loginname: string) {
    let body = JSON.stringify({ "data": loginname });
    return this.httpClient.post(`${apiUrl}/identity-authen-api/forgot_password`, body, httpOptions).pipe();
  }
  updatePassword(password: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      "password": password,
    });
    return this.httpClient.post(`${apiUrl}/identity-authen-api/forgot_password/update`, body, httpOptions).pipe();
  }
  logoutUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.httpClient.get(`${apiUrl}/identity-authen-api/logout`, httpOptions).pipe();
  }
  getUserInfo() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      value: email,
    });
    return this.httpClient.post(`${apiIdentityUrl}/default/users/getByEmail`, body, httpOptions).pipe();
  }
  getUserMfa(user_id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrlAuthen}/default/get_mfa/${user_id}`, httpOptions).pipe();
  }
  getUser() {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiIdentityUrl}/${tenantId}/users/@all/getAll`, httpOptions).pipe();
  }
  changePassUser(pass: changePas, id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(pass);
    return this.httpClient.put(`${apiUrl}/changePasswordUser/${id}`, body, httpOptions).pipe();
  }
  updateUser(info: ifUser, id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(info);
    return this.httpClient.put(`${apiIdentityUrl}/identity-api/users/info/${id}`, body, httpOptions).pipe();
  }
  getAllUser() {
    const token = localStorage.getItem('token');
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
    return this.httpClient.get(`${apiIdentityUrl}/${tenantId}/users/@all/getAll`, { ...httpOptions, params: queryParams }).pipe();
  }
  deleteUser(id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.delete(`${apiIdentityUrl}/identity-api/users/${id}`, httpOptions).pipe();
  }
  addUser(data: User) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(data);
    return this.httpClient.post(`${apiUrl}/addUser`, body, httpOptions).pipe();
  }
  fakeUser(number_user: number, password: string) {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      number_user: number_user,
      password: password,
    });
    return this.httpClient.post(`${apiIdentityUrl}/${tenantId}/users/@all/fake_users`, body, httpOptions).pipe();
  }
  changeRole(data: changeRole, id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      "data": data,
    });
    return this.httpClient.put(`${apiIdentityUrl}/identity-api/users/role/${id}`, body, httpOptions).pipe();
  }
  updateMfa(data: Array<Mfas>, id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      "mfas": data,
    });
    return this.httpClient.put(`${apiUrlAuthen}/default/update_mfa/${id}`, body, httpOptions).pipe();
  }
}
