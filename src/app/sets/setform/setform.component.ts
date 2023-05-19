import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardItem } from 'src/app/models/card.model';
import { Set } from 'src/app/models/set.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-setform',
  templateUrl: './setform.component.html',
  styleUrls: ['./setform.component.css']
})
export class SetformComponent implements OnInit {
  setForm: FormGroup;
  setCards: CardItem[] = [];
  setToMod: Set;


  constructor(protected ds: DataService, private router: Router, private route: ActivatedRoute, private as: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.params['id']) {
      this.setToMod = await this.ds.getSet(this.route.snapshot.params['id']).toPromise();
    }

    this.setForm = new FormGroup({
      'title': new FormControl(this.setToMod ? this.setToMod.title : null, Validators.required),
      'card-fronts': new FormArray([]),
      'card-backs': new FormArray([]),
    });

    if (this.setToMod) {
      this.setToMod.cards.forEach(c => {
        this.addCard(c.front, c.back)
      });
    } else {
      this.addCard()
    }
  }

  addCard(front?: string, back?: string) {
    (<FormArray>this.setForm.get('card-fronts')).push(new FormControl(front ? front : null, Validators.required));
    (<FormArray>this.setForm.get('card-backs')).push(new FormControl(back ? back : null, Validators.required));
  }

  onSubmit() {
    const backs = this.setForm.value['card-backs'];
    const fronts = this.setForm.value['card-fronts'];

    for (let i = 0; i < fronts.length; i++) {
      this.setCards.push({ front: fronts[i], back: backs[i] })
    }


    const newSet: Set = {
      title: this.setForm.value['title'],
      cards: this.setCards,
      itemNum: this.setCards.length,
      creator: this.as.email,
    }
    console.log(newSet)
    if (this.setToMod) {
      this.ds.updateSet(newSet, this.route.snapshot.params['id']);
    } else {
      this.ds.addSet(newSet);
    }
    this.router.navigate(['/']);

  }

  getCfControls() {
    return (<FormArray>this.setForm.get('card-fronts')).controls;
  }
  getCbControls() {
    return (<FormArray>this.setForm.get('card-backs')).controls;
  }
  cancel() {
    this.router.navigate(['sets']);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
