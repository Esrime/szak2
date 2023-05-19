import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Class } from '../../models/class.model';

@Component({
  selector: 'app-cpreview',
  templateUrl: './cpreview.component.html',
  styleUrls: ['./cpreview.component.css']
})
export class CpreviewComponent {
  public classes: Class[] = [];

  constructor(protected ds: DataService, private as: AuthService) {
    this.classes = [];
    this.ds.getClasses().subscribe(classes => {
      if (this.as.ADMIN_EMAIL == this.as.email) {
        this.classes = classes
      } else {
        classes.forEach(c => {
          if (c.creator == this.as.email) { this.classes.push(c) }
          else {
            c.students.forEach(
              s => { if (s.email == this.as.email) this.classes.push(c) }
            )
          }
        })
      }
    });
  }
}

