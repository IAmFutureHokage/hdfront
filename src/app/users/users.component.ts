import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UserWithNewPassword } from '../types/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService],
})
export class UsersComponent implements OnInit {
  public user: UserWithNewPassword = {
    id: '',
    login: '',
    newPassword: '',
    role: '',
    mail: '',
  };
  public usersdata: UserWithNewPassword[] = [];

  public users: UserWithNewPassword[] = [];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.fetchAllUsers().then(response => {this.usersdata = response?.data ??[]; 
      if (this.selectRole == 'all') {
      this.users = this.usersdata;
    }}).execute();
  }

  public selectRole = 'all';
  public searchUser = '';


  // Не дай бог кто-то перепишет этот метод 
  
  changeRole() {
    this.users = [];
    if (this.selectRole === 'all' && this.searchUser === '') {
      this.users = this.usersdata;
    } else if (this.selectRole !== 'all' && this.searchUser === '') {
        this.users = this.usersdata.filter(user => this.selectRole === user.role)

    } else if (this.selectRole === 'all' && this.searchUser !== '') {
        this.users = this.usersdata.filter(user => user.login?.toLowerCase().includes(this.searchUser.toLowerCase()))
    } else {
        this.users = this.usersdata.filter(user =>  this.selectRole === user.role &&
          user.login?.toLowerCase().includes(this.searchUser.toLowerCase()))
       
    }
  }
}
