import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FieldsService } from 'src/app/services/fields.service';
import { HttpService } from 'src/app/services/http.service';
import { RequestsService } from 'src/app/services/requests.service';
import { Field } from 'src/app/types/fields';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [FieldsService, HttpService, AuthService, RequestsService],
})
export class NewComponent implements OnInit {
  public infsysAll: Field[] = [];
  public channelsAll: Field[] = [];
  public a_name: string | undefined;
  public a_mail: string | undefined;
  public theme: string  | undefined;
  public description: string | undefined;
  public chennal = "";
  public infsys = "";
  private valid = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

  constructor(
    private fieldsService : FieldsService,
    private requestsService: RequestsService,
    private router : Router) { }

  ngOnInit(): void {
    this.fieldsService.fetchAll().then(response => {
      this.infsysAll = response?.data?.filter(field => field.cat === "infsys") ??[];
      this.channelsAll = response?.data?.filter(field => field.cat === "channels") ??[];
  }).execute();
  }

 Add() {
    if(this.a_name === undefined){this.a_name = ""}
    if(this.theme === undefined){this.theme = ""}
    if(this.description === undefined){this.description = ""}
    if(this.a_mail === undefined){this.a_mail = ""}
    if((this.valid.test(this.a_mail)||(this.a_mail === "")
    )){
    this.requestsService.addRequest(this.a_name, this.a_mail, this.theme, this.description, this.chennal, this.infsys)
    .then((response) => {this.router.navigate(['requests']);})
    .execute();
    }
  }
}
