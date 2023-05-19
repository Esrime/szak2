import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/app/models/class.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestformComponent {
  class: Class;
  testForm: FormGroup;
  emptyList = false;
  setControls = [];
  testValue
  selectedSets = [];

  constructor(private ds: DataService, private route: ActivatedRoute, private router: Router) {
    this.ds.getClass(this.route.snapshot.params['id'])
      .subscribe(c => {
        this.class = c;
        c.sets.forEach(s => this.setControls.push(new FormControl(null)))
        this.testForm = new FormGroup({
          'title': new FormControl(null, Validators.required),
          'sets': new FormArray(this.setControls),
        });
      })
  }

  getSetControls() {
    return (<FormArray>this.testForm.get('sets')).controls;
  }

  onSubmit() {
    console.log(this.testForm.value.sets)
    for (let i = 0; i < this.testForm.value.sets.length; i++) {
      if (this.testForm.value.sets[i]) {
        this.selectedSets.push(this.class.sets[i])
      }
    }
    if (this.selectedSets.length == 0) {
      this.emptyList = true;
      return;
    }
    this.testValue = {
      title: this.testForm.value.title,
      sets: this.selectedSets,
    };
    this.ds.postTest(this.testValue, this.route.snapshot.params['id']);
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['classdetail', this.route.snapshot.params['id']]);
  }

}
