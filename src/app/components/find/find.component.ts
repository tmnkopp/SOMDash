import { Component, OnInit, Input  } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';  
import{ NgForm } from '@angular/forms';
 @Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  public find: string; 
  public context: string;
  public data:{[key: string]: string};
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.find='fsma_HVAs';
  }
  onSubmit(form: NgForm ){

    console.log(form);
    /* 
    this.http
    .get<{[key: string]: string}>('http://localhost:4000/api/Find/export class')
    .subscribe(result =>{ 
      this.data = result   
    })
    */
  } 
  splitline(theString: string) {
    return theString.split('\n[');
 } 
}
