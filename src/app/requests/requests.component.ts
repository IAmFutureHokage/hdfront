
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FieldsService } from '../services/fields.service';
import { HttpService } from '../services/http.service';
import { RequestsService } from '../services/requests.service';
import { Field } from '../types/fields';
import { RequestWithIds } from '../types/requests';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [FieldsService, HttpService, RequestsService],
})

export class RequestsComponent implements OnInit {
  private page = 1;
  public selectChennal: string | null  = "all";
  public selectInfsys: string | null  = "all";
  public searchRequests: string | null  = "";
  
  public selectStatus = {
    opened: true,
    distributed: true,
    proccesing: true,
    checking: true,
    closed: true
  };
  private scroll = true;
  public thisUser: string| null = null;
  public selectStatusValue: number[] = [1, 2, 3, 4, 5]
  public filtersOpen = false;
  public infsysAll: Field[] = [];
  public channelsAll: Field[] = [];
  public selectDate= {
    from: new Date("2000-01-01T00:00:01.628Z"),
    before: new Date() ,
  }

 
  public requests: RequestWithIds[] = [];

  constructor(private authService: AuthService, private fieldsService : FieldsService, private requestsService : RequestsService) { 
  }

  ngOnInit(): void {
    this.selectDate.before.setHours(this.selectDate.before.getHours() + 5);
      if(window.location.pathname === "/requests/free") {
        this.selectStatus = {
          opened: true,
          distributed: false,
          proccesing: false,
          checking: false,
          closed: false
        };
      }
      if(window.location.pathname === "/requests/my") {
        this.thisUser = this.authService.getUsername();
        this.selectStatus = {
          opened: false,
          distributed: true,
          proccesing: true,
          checking: true,
          closed: true
        };
        }
      this.requestsFilter()
     this.fieldsService.fetchAll().then(response => {
      this.infsysAll = response?.data?.filter(field => field.cat === "infsys") ??[];
      this.channelsAll = response?.data?.filter(field => field.cat === "channels") ??[];
  }).execute();

  setInterval(() => {
    if(this.page === 1){
      this.requestsService.fetchRequests(
        this.searchRequests, 
        this.selectChennal,
        this.selectInfsys,
        this.thisUser,
        this.selectStatusValue,
        this.selectDate.from,
        this.selectDate.before,
        1,
        1
        ).then(response => {
        if(!(response?.data?.[0].id === this.requests[0].id 
          && response?.data?.[0].status === this.requests[0].status)){
          this.requestsFilter();
        }
      }).execute()
    } 
  }, 60000)
  }

  
  @HostListener('window:scroll')
  onWindowScroll() {
     if((window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 200) && this.scroll) 
      {
        this.page++;
        this.requestsFilter();
      };
      if(window.pageYOffset < 300){
        this.scroll = true;
        this.page = 1;
        this.requestsFilter();
      }
  }

  filtersView() {
    this.filtersOpen = !this.filtersOpen
  }

 private update: any; 
  searchInput() {
    clearTimeout(this.update);
    this.update = setTimeout(() => {
    this.requestsFilter()
    }, 500);
  }

  requestsFilter() {
    this.selectStatusValue = []
    if(this.selectStatus.opened) this.selectStatusValue.push(1);
    if(this.selectStatus.distributed) this.selectStatusValue.push(2);
    if(this.selectStatus.proccesing) this.selectStatusValue.push(3);
    if(this.selectStatus.checking) this.selectStatusValue.push(4);
    if(this.selectStatus.closed) this.selectStatusValue.push(5);
    if(this.selectInfsys === "all") this.selectInfsys = null;
    if(this.selectChennal === "all") this.selectChennal = null;
    if(this.searchRequests === "") this.searchRequests = null;

    if(this.page === 1 ){
      this.requestsService.fetchRequests(
        this.searchRequests, 
        this.selectChennal,
        this.selectInfsys,
        this.thisUser,
        this.selectStatusValue,
        this.selectDate.from,
        this.selectDate.before,
        this.page,
        10
        ).then(response => {
        if(response?.data?.length !== undefined && response?.data?.length < 10) this.scroll= false;
        this.requests = response?.data ??[];
      }).execute()
    }
    else { 
      this.requestsService.fetchRequests(
      this.searchRequests, 
      this.selectChennal,
      this.selectInfsys,
      this.thisUser,
      this.selectStatusValue,
      this.selectDate.from,
      this.selectDate.before,
      this.page,
      10
      ).then(response => {
      if(response?.data?.length !== undefined && response?.data?.length < 10) this.scroll= false;
      this.requests.push(...response?.data ??[]);
    }).execute()}
  }
}
