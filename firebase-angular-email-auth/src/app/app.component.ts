import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { user } from '@angular/fire/auth';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  http = inject(HttpClient);
  authService = inject(AuthService);
  userService = inject(UserService);

  logout(): void {
    console.log('logout');
    this.authService.logout();
  }

  verifyUser(): void {
    this.userService.verifyUser().subscribe({
      next: (response) => {console.log(response)},
      error: (err) => {
        console.log(err)
      }
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user) {
        this.authService.currentUserSig.set({
          email: user.email!, 
          username: user.displayName!})
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    })

    this.authService.idToken$.subscribe(token => {
      if(token) {
        this.authService.idTokenSig.set(token)
      } else {
        this.authService.idTokenSig.set(null);
      }
      console.log(this.authService.idTokenSig())
    })
  }
}
