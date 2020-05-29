import { Component, OnInit, Input } from '@angular/core';
import { AppModel, AppModelItem } from '../../models/AppModel'; 
import { SnippetService } from '../../services/snippet.service';
import { Snippet } from '../../models/Snippet';
@Component({
  selector: '[app-sql]',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss']
})
export class SqlComponent implements OnInit {
    @Input() appModel: AppModel; 
    public snippet: Snippet ; 
  constructor(  
    private _SnippetService: SnippetService) {  
    }

  ngOnInit(): void {
 
    
  }

}
