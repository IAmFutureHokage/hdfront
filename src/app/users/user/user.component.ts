import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UsersService, HttpService],
})
export class UserComponent implements OnInit {

  @Input('user') user: any;
  
public roleStr="";

  constructor(private userService : UsersService, private router : Router) {
   }

  ngOnInit(): void {
    if(this.user.role === "admin"){ this.roleStr = "Администратор"}
    else if(this.user.role === "moder"){ this.roleStr = "Руководитель"}
    else{ this.roleStr = "Исполнитель"}
  }
  Delete(){
    if (confirm('Удалить пользователя?')) { 
  this.userService.deleteUser(this.user?.id).then(response => {document.location.reload()}).execute();
    }
  }

}
