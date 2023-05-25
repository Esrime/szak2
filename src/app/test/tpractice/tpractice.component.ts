import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardItem } from 'src/app/models/card.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tpractice',
  templateUrl: './tpractice.component.html',
  styleUrls: ['./tpractice.component.css']
})
export class TpracticeComponent {
  
  cards: CardItem[] = []
  ind = 0;
  answers: { text: string, ind: number }[] = [];
  question: string = null;
  multiplier = 1;
  isWrong = false;
  errCount = 0

  constructor(private route: ActivatedRoute, private ds: DataService, private router: Router, private as: AuthService) {
    this.ds.getTest(this.route.snapshot.params['id'], this.route.snapshot.params['tid']).subscribe(test => {
      test.sets.forEach(s => this.cards = [...this.cards, ...s.cards])
      this.generateAnswers();
      this.multiplier = 100 / this.cards.length;
    })
  }

  check(index: number) {
    if (this.answers[index].ind != this.ind) {
      this.isWrong = true;
      this.errCount++;
      return;
    }
    this.ind++;
    this.isWrong = false;
    if (this.ind >= this.cards.length) {
      confirm("You finished practicing this set!")
      if (this.as.role=="student"){
        let data ={student:this.as.email, mistakes:this.errCount}
        this.ds.postAttempt(this.route.snapshot.params['id'],this.route.snapshot.params['tid'],data)
      }
      this.as.updateStat('testSolved');
      if (this.errCount==0) {
        this.as.updateStat('testPerfect');
      }
      this.router.navigate(["class/detail",this.route.snapshot.params['id'],"testdetail",this.route.snapshot.params['tid']])
    }
    this.generateAnswers()

  }


  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  private generateAnswers() {
    const isfront = Math.random() > 0.5 ? true : false
    let inds = [];
    this.answers = []
    let tmp = this.getRandomInt(this.cards.length);
    while (inds.length != 4) {
      if (!inds.includes(tmp) && tmp != this.ind) {
        inds.push(tmp);
        this.answers.push(isfront ? { text: this.cards[tmp].back, ind: tmp } : { text: this.cards[tmp].front, ind: tmp })
      }
      tmp = this.getRandomInt(this.cards.length)
    }
    tmp = this.getRandomInt(4);
    switch (tmp) {
      case 0:
        this.answers[0] = isfront ? { text: this.cards[this.ind].back, ind: this.ind } : { text: this.cards[this.ind].front, ind: this.ind };
        break;
      case 1:
        this.answers[1] = isfront ? { text: this.cards[this.ind].back, ind: this.ind } : { text: this.cards[this.ind].front, ind: this.ind };
        break;
      case 2:
        this.answers[2] = isfront ? { text: this.cards[this.ind].back, ind: this.ind } : { text: this.cards[this.ind].front, ind: this.ind };
        break;
      case 3:
        this.answers[3] = isfront ? { text: this.cards[this.ind].back, ind: this.ind } : { text: this.cards[this.ind].front, ind: this.ind };
        break;
      default:
        this.answers[0] = isfront ? { text: this.cards[tmp].back, ind: tmp } : { text: this.cards[tmp].front, ind: tmp };
        break;
    }
    this.question = isfront ? this.cards[this.ind].front : this.cards[this.ind].back;
  }

}
