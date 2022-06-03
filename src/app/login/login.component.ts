import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { UserWithNewPassword } from '../types/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, HttpService, UsersService],
})
export class LoginComponent implements OnInit {
  public userName = '';
  public password = '';
  public users : UserWithNewPassword[] = []

  constructor(private authService: AuthService,   private usersService : UsersService) {}
  

  ngOnInit(): void {
    this.usersService.fetchAllUsers().then(response => {this.users = response?.data ?? []}).execute()
  }

  Login() {
    this.authService
      .login(this.userName, this.password).execute();
  }
}
