import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Set } from "../../models/set.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public set: Set;
  public ind = 0;
  isOwn=false;


  constructor(private route: ActivatedRoute, protected ds: DataService, private router: Router, protected as:AuthService) {
  }
  
  ngOnInit(): void {
      this.ds.getSet(this.route.snapshot.params['id']).subscribe(set => {
        this.set = set
        if (set.creator== this.as.email || this.as.email==this.as.ADMIN_EMAIL) this.isOwn=true;
      })
  }

  nextCard() {
    if (this.ind == this.set.cards.length - 1) {
      this.ind = 0;
    } else {
      this.ind++;
    }
  }
  previousCard() {
    if (this.ind == 0) {
      this.ind = this.set.cards.length - 1;
    } else {
      this.ind--;
    }
  }

  practice(timed: boolean) {
    this.router.navigate(['/sets/practice', this.route.snapshot.params['id'], timed]);
  }
  
  edit(){
    this.router.navigate(['/sets/detail', this.route.snapshot.params['id'],"edit"]);
    
  }

  delete(){
    this.ds.deleteSet(this.route.snapshot.params['id']);
    this.router.navigate(['/sets'])
  }


}
