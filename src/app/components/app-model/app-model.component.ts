import { Component, OnInit, Input } from '@angular/core';
import { AppModel, AppModelItem } from '../../models/AppModel';
 
@Component({
  selector: '[app-model]',
  templateUrl: './app-model.component.html',
  styleUrls: ['./app-model.component.scss']
})
export class AppModelComponent implements OnInit {
  @Input() appModel: AppModel; 
  constructor() { }

  ngOnInit(): void {
  }

}
