import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appOpened]'
})

export class OpenedDirective{
  screenWidth = 0;

  @HostBinding('checked') opened: boolean;
  @HostListener('window:resize', ['$event']) changescreenWidth(){
    this.screenWidth = window.innerWidth
  }

    constructor() {
      this.changescreenWidth()
      if(this.screenWidth >= 1200 ){
      this.opened = true;
      }else this.opened= false;
     }
  }
