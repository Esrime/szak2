import { Component } from '@angular/core';
import { Set } from 'src/app/models/set.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public setList: Set[] = [];

  constructor(private ds: DataService, protected as: AuthService) { 
    this.setList= [];
    this.ds.getSets().subscribe(sets => {
      this.setList=sets;
    });
  }

}
