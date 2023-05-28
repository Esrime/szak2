import { Component } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-clist',
  templateUrl: './clist.component.html',
  styleUrls: ['./clist.component.css']
})
export class ClistComponent {
  classList: Class[] = [];

  constructor(public ds: DataService, public as: AuthService) {
    this.classList = [];
    this.ds.getClasses().subscribe(classes => {
      if (this.as.ADMIN_EMAIL == this.as.email) {
        this.classList = classes
      } else {
        classes.forEach(c => {
          if (c.creator == this.as.email) { this.classList.push(c) }
          else {
            c.students.forEach(
              s => { if (s.email == this.as.email) this.classList.push(c) }
            )
          }
      })
      }
    });
  }

}