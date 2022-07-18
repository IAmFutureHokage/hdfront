import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RequestsService } from 'src/app/services/requests.service';
import { UsersService } from 'src/app/services/users.service';
import { UserWithNewPassword } from 'src/app/types/users';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  providers: [UsersService, AuthService, RequestsService]
})
export class RequestComponent implements OnInit {
  public statusclass = "";
  public statustext = "";
  public statustime = "";
  public distributebutton = ""
  public users: UserWithNewPassword[] = [];
  public executorId: string | null = "";
  public executorLogin: string | null | undefined = ""

  @Input('request') request: any;
  
  constructor(private usersService: UsersService, public authService: AuthService, public requestService: RequestsService) {
   }

  ngOnInit(): void {
    if(this.authService.getUserrole() === "moder") this.distributebutton = "Назначить";
    if(this.authService.getUserrole() === "executor") this.distributebutton = "Выбрать";
    if(this.authService.getUserrole()=== 'moder')this.usersService.fetchAllUsers().then(response => {this.users = response?.data?.filter(response => response.role === "moder" || response.role === "executor") ??[];}).execute();
    if(this.request.status === 1){
       this.statusclass = "opened"; 
       this.statustext = "Открыта в" ; 
       this.statustime = new Date(new Date(this.request.lifecycle.opened)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.opened)).toLocaleDateString()
       this.executorLogin = this.authService.getUsername();
      }
    if(this.request.status === 2){ 
      this.statusclass = "distributed"; 
      this.statustext = "Распределена в" ; 
      this.statustime = new Date(new Date(this.request.lifecycle.distributed)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.distributed)).toLocaleDateString()
      this.executorLogin = this.request.executor.login;
    }
    if(this.request.status === 3){ 
      this.statusclass = "proccesing"; 
      this.statustext = "В работе с" ; 
      this.statustime = new Date(new Date(this.request.lifecycle.proccesing)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.proccesing)).toLocaleDateString()
      this.executorLogin = this.request.executor.login
    }
    if(this.request.status === 4){ 
      this.statusclass = "checking"; 
      this.statustext = "На проверке с" ; 
      this.statustime = new Date(new Date(this.request.lifecycle.checking)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.checking)).toLocaleDateString()
      this.executorLogin = this.request.executor.login
    }
    if(this.request.status === 5){ 
      this.statusclass = "closed"; 
      this.statustext = "Закрыта в" ; 
      this.statustime = new Date(new Date(this.request.lifecycle.closed)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.closed)).toLocaleDateString()
      this.executorLogin = this.request.executor.login
    }
  }

  Distribute() {
  if(this.executorId === ""){this.executorId = null;}
  else {this.executorLogin = this.users.find(item => item.id === this.executorId)?.login}

  this.requestService.distributeRequest(this.request.id, this.executorId).execute();
 
  this.request.status++;
  this.statusclass = "distributed"; 
  this.statustext = "Распределена в"; 
  this.statustime = new Date().toLocaleTimeString().slice(0, -3) + " " + new Date().toLocaleDateString()
  }

  ChangeStatus(){
  this.requestService.changeStatusRequest(this.request.id).execute();
  this.request.status++;
  if(this.request.status === 3){ 
    this.statusclass = "proccesing"; 
    this.statustext = "В работе с" ; 
  }
  if(this.request.status === 4){ 
    this.statusclass = "checking"; 
    this.statustext = "На проверке с" ; 
  }
  if(this.request.status === 5){ 
    this.statusclass = "closed"; 
    this.statustext = "Закрыта в" ; 
  }
  this.statustime = new Date().toLocaleTimeString().slice(0, -3) + " " + new Date().toLocaleDateString()
  }
}
