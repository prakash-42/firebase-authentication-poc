import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { idToken } from "@angular/fire/auth";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient)
  authService = inject(AuthService)

  verifyUser() {
    let url = "http://localhost:8080/user";
    let idToken: string;
    if(this.authService.idTokenSig()) {
      idToken = this.authService.idTokenSig()!;
    } else {
      throwError(() => new Error("null token"))
    }
    const headers = new HttpHeaders({
      Authorization: idToken!,
    });
    return this.httpClient.get<string>(url, {
      observe: 'response',
      responseType: 'json',
      headers: headers});
  }
}
