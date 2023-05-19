import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { Set } from "../../models/set.model";


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  public sets: Set[]= [];

  constructor(protected ds: DataService) { 
    this.sets= [];
    this.ds.getSets(true).subscribe(sets => {
      this.sets=sets;
    });
  }


}
