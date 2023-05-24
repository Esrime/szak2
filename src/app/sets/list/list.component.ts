import { Component, Pipe, PipeTransform } from '@angular/core';
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

  searchText = ''

  constructor(protected ds: DataService, protected as: AuthService) {
    this.setList = [];
    this.ds.getSets().subscribe(sets => {
      this.setList = sets;
    });
  }



}

@Pipe({
  name: "filterText"
})
export class FilterTextPipe implements PipeTransform {
  transform(items: Set[], text: string): any[] {

    if (!text) return items;
    text = text.toLowerCase();
    return items.filter(it => {
      if (it.tags){
        return it.title.toLowerCase().includes(text) || it.tags.toLowerCase().includes(text);
      } else {
        return it.title.toLowerCase().includes(text);
      }
    });
  }
}