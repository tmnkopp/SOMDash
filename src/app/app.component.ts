import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit  {
  title = 'somuing';
  ngOnInit(){
    $('#sidebar').addClass('active');
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  } 
}

declare var $: any;