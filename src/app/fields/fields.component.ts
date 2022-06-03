import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { FieldsService } from '../services/fields.service';
import { HttpService } from '../services/http.service';
import { Field } from '../types/fields';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  providers: [FieldsService, HttpService],
})
export class FieldsComponent implements OnInit {
  public id = uuid.v4();
  public cat = '';
  public name = '';
  public field: Field = {
    id: '',
    cat: '',
    name: ''
  };
  public infsysAll: Field[] = [];
  public channelsAll: Field[] = [];

  constructor(private fieldsService : FieldsService) {}

  ngOnInit(): void {
    this.fieldsService.fetchAll().then(response => {
      this.infsysAll = response?.data?.filter(field => field.cat === "infsys") ??[];
      this.channelsAll = response?.data?.filter(field => field.cat === "channels") ??[];
  }).execute();
  }

  Add() {
    if((this.name !== "")
    &&((this.cat=== "infsys")||(this.cat=== "channels"))){
    this.fieldsService.addField(this.id, this.cat, this.name)
    .then((response) => {document.location.reload()})
    .execute();
    }
  }
}
