import { Component, OnInit, Input } from '@angular/core';
import { AppModel, AppModelItem } from '../../models/AppModel';
@Component({
  selector: '[app-sql]',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss']
})
export class SqlComponent implements OnInit {
    @Input() appModel: AppModel; 
  constructor() { }

  ngOnInit(): void {
  }

}
