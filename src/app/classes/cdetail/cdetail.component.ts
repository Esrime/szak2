import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/app/models/class.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cdetail',
  templateUrl: './cdetail.component.html',
  styleUrls: ['./cdetail.component.css']
})
export class CdetailComponent {
  class: Class = null;
  tests = []
  isOwn = false;
  isLoading=true;

  constructor(private route: ActivatedRoute, public ds: DataService, private router: Router, public as: AuthService) {
    this.ds.getClass(this.route.snapshot.params['id'])
      .subscribe(c => {
        this.class = c;
        for (const key in c.tests) {
          this.tests.push({ ...this.class.tests[key], id: key })
        }
        if (c.creator == this.as.email || this.as.email == this.as.ADMIN_EMAIL) this.isOwn = true;
      })
    this.isLoading=false;
  }

  edit() {
    this.router.navigate(['/class/detail', this.route.snapshot.params['id'], "edit"]);
  }

  delete() {
    this.ds.deleteClass(this.route.snapshot.params['id']);
    this.router.navigate(['/classes'])
  }

}
