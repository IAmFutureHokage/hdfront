import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FieldsService } from '../services/fields.service';
import { RequestsService } from '../services/requests.service';
import { UsersService } from '../services/users.service';
import { Field } from '../types/fields';
import { RequestWithIds } from '../types/requests';
import { UserWithNewPassword } from '../types/users';
import * as XLSX from 'xlsx';


import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStates,
  ApexXAxis,
  ApexFill,
  ApexTitleSubtitle,
  ApexTooltip
} from "ng-apexcharts";

export type StatusesTable = {
  amount: number;
  opened: number;
  distributed: number;
  processing: number;
  checking: number;
  closed: number;
}

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  states: ApexStates
  colors: string[];
};

export type Leadtime = {
  processing : number,
  treatment : number
}

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  providers: [FieldsService, UsersService, RequestsService],
})
export class StatsComponent implements OnInit {

  @ViewChild("chart1") chart1!: ChartComponent;
  public chartOptions1!: Partial<ChartOptions>;

  @ViewChild("chart2") chart2!: ChartComponent;
  public chartOptions2!: Partial<ChartOptions2>;

  @ViewChild("chart3") chart3!: ChartComponent;
  public chartOptions3!: Partial<ChartOptions>;

  @ViewChild("chart4") chart4!: ChartComponent;
  public chartOptions4!: Partial<ChartOptions>;

  @ViewChild("chart5") chart5!: ChartComponent;
  public chartOptions5!: Partial<ChartOptions>;


  public requestsdata: RequestWithIds[] = []
  public requests: RequestWithIds[] = [];
  public infsysAll: Field[] = [];
  public channelsAll: Field[] = [];
  public usersAll: UserWithNewPassword[] = [];
  public selectStatus = {
    opened: true,
    distributed: true,
    proccesing: true,
    checking: true,
    closed: true
  };
  public selectStatusValue: number[] = [1, 2, 3, 4, 5]

  public selectChannel: boolean[] = []
  public selectChannelsValue: string[] = []

  public selectInfsys: boolean[] = []
  public selectInfsysValue: string[] = []

  public selectUsers: boolean[] = []
  public selectUsersValue: string[] = []

  public opened = false;
  

  public selectDate= {
    from: new Date(),
    before: new Date(),
  }

  public amountStatus = {
    amount: 0,
    opened: 0,
    distributed: 0,
    processing: 0,
    checking: 0,
    closed: 0
  }

  public amountStatusTable = {
    amount: 0,
    opened: 0,
    distributed: 0,
    processing: 0,
    checking: 0,
    closed: 0
  }

  public statusesTable : StatusesTable[] = []
  public channelsTable : number[]= []
  public usersTable : number[]= []

  public generateTable = {
    status: true,
    total: true,
    channels: true,
    executors: true, 
    time: true,
  }

  public leadtime = {
    processing : 0,
    treatment : 0
  }
  public leadtimeMath = {
    processing : 0,
    treatment : 0
  }

  public mathTime = {
    opened : moment(),
    processing: moment(),
    closed : moment()
  }
  public leadtimeAll: Leadtime[] = []
  public mathChannels: number[] = [];
  public mathInfsys: number[]  = []
  public mathUsers: number[] = []
  
  public colors: string[] = []

  constructor(
    private fieldsService : FieldsService, 
    private requestsService : RequestsService,
    private usersService : UsersService,
  ) { 
  }


  
  
  ngOnInit(): void {
    

    this.selectDate.before.setHours(this.selectDate.from.getHours() + 24);
    this.selectDate.from.setDate(1);
    if(this.selectDate.before.getMonth() > 0 && this.selectDate.before.getMonth() < 4) {this.selectDate.from.setMonth(0)}
    if(this.selectDate.before.getMonth() > 3 && this.selectDate.before.getMonth() < 7) {this.selectDate.from.setMonth(3)}
    if(this.selectDate.before.getMonth() > 6 && this.selectDate.before.getMonth() < 10) {this.selectDate.from.setMonth(6)}
    if(this.selectDate.before.getMonth() > 9 && this.selectDate.before.getMonth() < 13) {this.selectDate.from.setMonth(9)}
      this.fieldsService.fetchAll().then(response => {
        this.infsysAll = response?.data?.filter(field => field.cat === "infsys") ??[];
        this.channelsAll = response?.data?.filter(field => field.cat === "channels") ??[];
        this.usersService.fetchAllUsers().then(users => {
          this.usersAll = users?.data?.filter(user => user.role === "moder" || user.role === "executor") ??[];
          this.infsysAll.forEach(response => {this.selectInfsys.push(true); if(response.name !== null) this.selectInfsysValue.push(response?.name)});
         this.channelsAll.forEach(response => {this.selectChannel.push(true); if(response.name !== null) this.selectChannelsValue.push(response?.name)});
         this.usersAll.forEach(response => {this.selectUsers.push(true);if(response.id !== null) this.selectUsersValue.push(response?.id)}); 
         this.colorsRand();
         this.requestsLoad();
        }).execute();
      }).execute();
   
  }

  statsMath():void {
    this.mathChannels = [];
    this.mathInfsys = [];
    this.mathUsers = [];
    this.amountStatus = {
      amount: 0,
      opened: 0,
      distributed: 0,
      processing: 0,
      checking: 0,
      closed: 0
    };

    this.leadtime = {
      treatment: 0,
      processing: 0
    }
    this.channelsAll.forEach(response=> {
      this.mathChannels.push(0);
    })
    this.infsysAll.forEach(response=> {
      this.mathInfsys.push(0);
    })
    this.usersAll.forEach(response=> {
      this.mathUsers.push(0);
    })
    this.requests.forEach(request => {
      this.amountStatus.amount++;
      if(request.status === 1) this.amountStatus.opened++;
      if(request.status === 2) this.amountStatus.distributed++;
      if(request.status === 3) this.amountStatus.processing++;
      if(request.status === 4) this.amountStatus.checking++;
      if(request.status === 5) {
        this.amountStatus.closed++
        this.mathTime.opened = moment(request.lifecycle.opened);
        this.mathTime.processing = moment(request.lifecycle.proccesing);
        this.mathTime.closed = moment(request.lifecycle.closed);
        this.leadtime.treatment = this.leadtime.treatment +  this.mathTime.closed.diff(this.mathTime.opened, 'minutes')
        this.leadtime.processing = this.leadtime.processing +  this.mathTime.closed.diff(this.mathTime.processing, 'minutes')
      }
      this.channelsAll.forEach((response, index) => {
        if(response.name === request.chennal) this.mathChannels[index]++;
      })
      this.infsysAll.forEach((response, index)=> {
          if(response.name === request.infsys) this.mathInfsys[index]++;
      })
      this.usersAll.forEach((response, index)=> {
          if(response.id === request.executor?.id) this.mathUsers[index]++;
      })
    });
    if(this.amountStatus.closed > 0){
      this.leadtime.treatment = Math.round(this.leadtime.treatment / this.amountStatus.closed);
      this.leadtime.processing = Math.round(this.leadtime.processing / this.amountStatus.closed);
    }

    this.chartOptions1 = {
      series: [this.amountStatus.opened, this.amountStatus.distributed, this.amountStatus.processing, this.amountStatus.closed],
      labels: ["Открыты", "Распределены", "В работе", "Закрыты"],
      chart: {
        type: "donut",
          
      },
      legend: {
        show: false
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "Всего:"
              },
            }
          }
        }
      },
      colors:['#179e22', '#daa112', '#2e75f9', '#a3a3a3'],
      states: {
        normal: {
            filter: {
                type: 'none',
                value: 0,
            }
        },
        hover: {
            filter: {
              type: 'none',
              value: 0
            }
        },
        active: {
            filter: {
                type: 'none',
                value: 0
            }
        },
    }
    
    };
  // ----------------------------Время------------------------------
  this.chartOptions2 = {
    series: [
      {
        data: [this.leadtime.processing, this.leadtime.treatment]
      }
    ],
    chart: {
      type: "bar",
      toolbar: {
        show: false
      },
      height: '350'
    },
    
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '40',
        dataLabels: {
          position: "top"
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + " минут";
      },
      offsetY: -30,
      style: {
        fontSize: "12px",
        colors: ["#304758"]
      }
    },

    xaxis: {
      categories: ["Время решения", "Время обработки"],
    },
  };
  //-------------------------------Информационные системы
  this.chartOptions3 = {
    series: this.mathInfsys,
    plotOptions: {
      pie: {
        expandOnClick: false,
      }
    },
    chart: {
      type: "pie"
    },
    labels: this.infsysAll.map(item => item.name)
  };

  //---------------------------------Каналы связи

  this.chartOptions4 = {
    series: this.mathChannels,
    labels: this.channelsAll.map(item => item.name),
    colors: this.colors.slice(this.infsysAll.length)
  };
  //---------------------------------Пользователи
  this.chartOptions5 = {
    series: this.mathUsers,
    labels: this.usersAll.map(item => item.login),
    colors: this.colors.slice(this.infsysAll.length + this.channelsAll.length)
  };
  }

  private update: any; 
  dateFilter(){
    clearTimeout(this.update);
    this.update = setTimeout(() => {
      this.requestsLoad()
    }, 500);
  }
  requestsLoad() {
    this.requestsService.fetchRequests(null, null, null, null, null, this.selectDate.from, this.selectDate.before, 1, 999999999).then(response => {
    this.requestsdata = response?.data ??[]; console.log(this.requestsdata.length);  this.requestsFilter()}).execute();
  }

  requestsFilter() {
    this.selectStatusValue = [];
    if(this.selectStatus.opened) this.selectStatusValue.push(1);
    if(this.selectStatus.distributed) this.selectStatusValue.push(2);
    if(this.selectStatus.proccesing) this.selectStatusValue.push(3);
    if(this.selectStatus.checking) this.selectStatusValue.push(4);
    if(this.selectStatus.closed) this.selectStatusValue.push(5);
    this.selectChannelsValue = [];
    this.channelsAll.forEach((item, index) => {
      if(this.selectChannel[index] && item.name !== null) this.selectChannelsValue.push(item.name);
    })
    this.selectInfsysValue = [];
    this.infsysAll.forEach((item , index) => {
      if(this.selectInfsys[index] && item.name !== null) this.selectInfsysValue.push(item.name);
    })
    this.selectUsersValue = [];
    this.usersAll.forEach((item , index) => {
      if(this.selectUsers[index] && item.id !== null) this.selectUsersValue.push(item.id);
    })

    this.requests = this.requestsdata.filter(request => 
      (this.selectStatusValue.includes( request.status))&&
      (this.selectInfsysValue.includes( request.infsys))&&
      (this.selectChannelsValue.includes( request.chennal))&&
      ((request.executorId === null)||
      (this.selectUsersValue.includes( request.executorId)))&&
      (new Date(request.lifecycle.opened) > new Date(this.selectDate.from)) &&
      (new Date(request.lifecycle.opened) < new Date(this.selectDate.before))
    );
    this.statsMath()
  }

  colorsRand(){
    this.colors= [];

    for (var i = 0; i < (this.infsysAll.length + this.channelsAll.length + this.usersAll.length + 1); i++) {
       this.colors.push('#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase());
    }
  }


  mathExelTime (a: string, b: string): number
  {
   let closed = moment(b);
   let opened = moment(a);
   return closed.diff(opened, 'minutes');
   
  }

  openData(): void
  {
    this.opened = !this.opened;
  }

  infsyscalc(a: string | null, b: string | null): number | void {
    if(a !== null && b !== null){
      return this.requests.filter(request => a === request.chennal && b === request.infsys).length;
    }
  }

  exportexcel(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Statistic.xlsx');
 
  }

}




