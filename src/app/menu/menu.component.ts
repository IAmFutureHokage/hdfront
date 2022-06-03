import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [AuthService],
})
export class MenuComponent implements OnInit {

  public menu = "Login"
  public userrole : string | null =""
  public username : string | null =""
  public isAdmin : boolean = false;
  public isOther : boolean = false;

  constructor(private authService: AuthService) {
   }

  ngOnInit(): void {
  }

  Logout(){
    this.authService.logout()
  }

  LoginIs() : boolean{
    if(this.authService.getJwtToken() === null){
      this.menu = "noLogin";
      return true;
    }else {
      this.username = this.authService.getUsername();
      if(this.authService.getUserrole() === "admin"){ this.userrole = "Администратор"; this.isAdmin = true; this.isOther = false;}
      if(this.authService.getUserrole() === "moder"){ this.userrole = "Модератор"; this.isOther = true; this.isAdmin = false;}
      if(this.authService.getUserrole() === "executor"){ this.userrole = "Исполнитель"; this.isOther = true; this.isAdmin = false; }
      this.menu = "";
      return false;
    }
  }
}
