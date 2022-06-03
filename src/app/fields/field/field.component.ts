import { Component, Input, OnInit } from '@angular/core';
import { FieldsService } from 'src/app/services/fields.service';
import { HttpService } from 'src/app/services/http.service';
import { Field } from 'src/app/types/fields';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [FieldsService, HttpService]
})
export class FieldComponent implements OnInit {
  @Input('field') field: Field | any;
  
  constructor(private fieldsService : FieldsService) { }

  ngOnInit(): void {
  }
  Delete(){
    if (confirm('Удалить поле? Если оно было указано в какой-либо заявке, то внести изменения нужно вручную, отредактировав заявку')) { 
  this.fieldsService.deleteField(this.field?.id).then(response => {document.location.reload()}).execute();
    }
  }
}
