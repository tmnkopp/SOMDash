import { Component, OnInit } from '@angular/core';
import { CompilersService } from './services/compilers.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
 
export class AppComponent implements OnInit  {
  title = 'somuing'; 
  constructor( private _CompilersService: CompilersService ) { }
 
  ngOnInit(){

    let str = this._CompilersService.getStr(' hello ');
    console.log(  str  );


    $('#sidebar').addClass('active');
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  } 


}

declare var $: any;