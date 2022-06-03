import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestsService } from 'src/app/services/requests.service';
import {  Request } from 'src/app/types/requests';

@Component({
  selector: 'app-requestview',
  templateUrl: './requestview.component.html',
  styleUrls: ['./requestview.component.css'],
  providers: [AuthService, AuthService, RequestsService]
})
export class RequestviewComponent implements OnInit {
  public id: string = "";
  public statusview = ""
  public date = {
    opened: "",
    distributed: "",
    proccesing: "",
    checking: "",
    closed: "",
  }
  public request : Request | null | undefined;

  constructor(
    public authService: AuthService, 
    private requestsService : RequestsService,
    private route : ActivatedRoute, 
    private router : Router) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { this.id = params['id']; })
    this.requestsService.fetchRequest(this.id).then(response => { 
      this.request = response?.data
      if(this.request !== undefined && this.request !== null){
        this.date.opened = new Date(new Date(this.request.lifecycle.opened)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.opened)).toLocaleDateString()
        if(this.request.lifecycle.distributed !== null) this.date.distributed = new Date(new Date(this.request.lifecycle.distributed)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.distributed)).toLocaleDateString()
        if(this.request.lifecycle.proccesing !== null) this.date.proccesing = new Date(new Date(this.request.lifecycle.proccesing)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.proccesing)).toLocaleDateString()
        if(this.request.lifecycle.checking !== null) this.date.checking = new Date(new Date(this.request.lifecycle.checking)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.checking)).toLocaleDateString()
        if(this.request.lifecycle.closed !== null)this.date.closed = new Date(new Date(this.request.lifecycle.closed)).toLocaleTimeString().slice(0, -3) + " " + new Date(new Date(this.request.lifecycle.closed)).toLocaleDateString()
        if(this.request.status === 1) this.statusview = "Открыта";
        if(this.request.status === 2) this.statusview = "Распределена";
        if(this.request.status === 3) this.statusview = "В процессе";
        if(this.request.status === 4) this.statusview = "На проверке";
        if(this.request.status === 5) this.statusview = "Закрыта";
        }
    }).execute()
  }

  Delete(){
    if (confirm('Удалить заявку?')) {
      this.requestsService.deleteRequest(this.id).then(response => this.router.navigate(['requests'])).execute()
    }
  }
}
