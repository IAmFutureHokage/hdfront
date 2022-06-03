import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UsersService } from 'src/app/services/users.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [UsersService, HttpService],
})
export class CreateComponent implements OnInit {
  public id = uuid.v4();
  public login = '';
  public newPassword = '';
  public role = '';
  public mail = '';
  private valid = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

  constructor(private userService : UsersService, private router : Router) { }

  ngOnInit(): void {
  }
  Add() {
    if((this.login !== "")
    &&(this.newPassword !== null)
    &&((this.role=== "admin")||(this.role=== "moder")||(this.role=== "executor"))
    &&(this.newPassword?.length >= 6)
    &&this.valid.test(this.mail)){
    this.userService.addUser(this.id, this.login, this.newPassword, this.role, this.mail)
    .then((response) => {this.router.navigate(['users']);})
    .execute();
    }
  }

}
