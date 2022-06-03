import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UsersService, HttpService],
})
export class EditComponent implements OnInit {
public id: string = "";
  public login: string | null = null;
  public newPassword: string | null = null;
  public role: string | null = null;
  public mail: string= "";
  public user: any;
  private valid = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

  constructor(private route : ActivatedRoute, private userService : UsersService, private router : Router) {
   }
  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id'] )
    this.userService.fetchUser(this.id).then(response => {this.user = response?.data ;  this.login = this.user.login;
      this.role = this.user.role;
      this.mail = this.user.mail;}).execute()
  }
  Update() {
    if(this.newPassword === "") this.newPassword = null;
    if((this.login !== null)
    &&((this.role === "admin")||(this.role === "moder")||(this.role === "executor"))
    &&(this.newPassword?.length !== undefined && this.newPassword?.length >= 6 || this.newPassword === null)
    &&this.valid.test(this.mail)){
    if (confirm('Изменить пользователя?')) {
    this.userService.updateUsers(this.id, this.login, this.newPassword, this.role, this.mail)
    .then((response) => {this.router.navigate(['users']);})
    .execute();
    }
  }
  }
}
