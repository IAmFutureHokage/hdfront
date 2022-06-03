import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FieldsService } from 'src/app/services/fields.service';
import { HttpService } from 'src/app/services/http.service';
import { RequestsService } from 'src/app/services/requests.service';
import { UsersService } from 'src/app/services/users.service';
import { Field } from 'src/app/types/fields';
import { UserWithNewPassword } from 'src/app/types/users';

@Component({
  selector: 'app-editreq',
  templateUrl: './editreq.component.html',
  styleUrls: ['./editreq.component.css'],
  providers: [FieldsService, HttpService, UsersService, AuthService, RequestsService],
})
export class EditreqComponent implements OnInit {
  public infsysAll: Field[] = [];
  public channelsAll: Field[] = [];
  public users: UserWithNewPassword[] = []
  public id: string = "";
  public a_name: string | undefined;
  public a_mail: string | undefined;
  public theme: string  | undefined;
  public description: string | undefined;
  public chennal: string | undefined;
  public infsys: string | undefined;
  private valid = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  public executorName: string | null | undefined;
  public executorId: string | null | undefined;

  constructor(
    private route : ActivatedRoute, 
    private fieldsService : FieldsService, 
    private usersService: UsersService, 
    public authService: AuthService,
    private requestsService: RequestsService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.usersService.fetchAllUsers().then(response => {
      this.users = response?.data?.filter(response => response.role === "moder" || response.role === "executor") ??[];
    }).execute();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.requestsService.fetchRequest(this.id).then(response => { 
        this.a_name = response?.data?.a_name;
        this.a_mail = response?.data?.a_mail;
        this.theme = response?.data?.theme;
        this.description = response?.data?.description;
        this.chennal = response?.data?.chennal;
        this.infsys = response?.data?.infsys;
        this.executorId = response?.data?.executor?.id;
        this.executorName = response?.data?.executor?.login
      }).execute() })
    this.fieldsService.fetchAll().then(response => {
      this.infsysAll = response?.data?.filter(field => field.cat === "infsys") ??[];
      this.channelsAll = response?.data?.filter(field => field.cat === "channels") ??[];
  }).execute();
  }

  Update() {
    if(this.executorId === undefined) this.executorId = null;
    if((this.a_name !== "")
    &&(this.a_name !== undefined)
    &&(this.theme !== "")
    &&(this.theme !== undefined)
    &&(this.description !== "")
    &&(this.description !== undefined)
    &&(this.chennal !== "")
    &&(this.chennal !== undefined)
    &&(this.infsys !== "")
    &&(this.infsys !== undefined)
    &&(this.a_mail !== undefined)
    &&this.valid.test(this.a_mail)){
    if (confirm('Изменить заявку?')) {
    this.requestsService.editRequest(this.id, this.a_name, this.a_mail, this.theme, this.description, this.chennal, this.infsys, this.executorId)
    .then((response) => {this.router.navigate(['requests']);})
    .execute();
    }
  }
  }

}
