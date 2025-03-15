import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { SignupResponse } from '../types/signup-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("user-name", value.username)
        sessionStorage.setItem("user-role", value.role)
      })
    )
  }

  signup(name: string, email: string, password: string){
    return this.httpClient.post<SignupResponse>(this.apiUrl + "/signup", { name, email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("user-email", value.email)
      })
    )
  }
}
