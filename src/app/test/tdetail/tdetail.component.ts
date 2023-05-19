import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tdetail',
  templateUrl: './tdetail.component.html',
  styleUrls: ['./tdetail.component.css']
})
export class TdetailComponent {
  test
  attempts = []
  moreThan4 = false;

  constructor(private route: ActivatedRoute, private ds: DataService, public as: AuthService) {
    this.ds.getTest(this.route.snapshot.params['id'], this.route.snapshot.params['tid'])
      .subscribe(t => {
        this.test = t;
        for (const key in t.attempts) {
          this.attempts.push(t.attempts[key])
        }
        let tmpc = 0;
        for (const key in t.sets) {
          tmpc += t.sets[key].cards.length
        }
        this.moreThan4 = tmpc > 4
      })
  }

}
