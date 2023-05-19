import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Class } from '../../models/class.model';

@Component({
  selector: 'app-classform',
  templateUrl: './classform.component.html',
  styleUrls: ['./classform.component.css']
})
export class ClassformComponent implements OnInit {

  classForm: FormGroup = null;
  sets;
  filteredSets = [];
  students;
  user;
  emptyList = false;


  constructor(private ds: DataService, private router: Router, private fb: FormBuilder, public as: AuthService) {
    this.classForm = this.fb.group({
      'title': new FormControl(null, Validators.required),
      'students': new FormArray([]),
      'setsControl': new FormArray([]),
    });
  }

  async ngOnInit(): Promise<void> {
    this.sets = await this.ds.getSets().toPromise();
    this.sets.forEach(set => {
      if (set.creator == this.as.email) this.filteredSets.push(set)
    });
    this.students = await this.as.getStudents().toPromise()

    let studentControl = [];
    let setControl = [];

    this.students.forEach(_ => {
      (<FormArray>this.classForm.get('students')).push(new FormControl(null))
    });
    this.filteredSets.forEach(_ => {
      (<FormArray>this.classForm.get('setsControl')).push(new FormControl(null))
    });

  }


  getSetControls() {
    return (<FormArray>this.classForm.get('setsControl')).controls;
  }

  getStudentControls() {
    return (<FormArray>this.classForm.get('students')).controls;
  }

  onSubmit() {

    let selectedSets = [];
    let selectedStudents = [];
    for (let i = 0; i < this.classForm.value.setsControl.length; i++) {
      if (this.classForm.value.setsControl[i]) {
        selectedSets.push(this.filteredSets[i])
      }
    }
    for (let i = 0; i < this.classForm.value.students.length; i++) {
      if (this.classForm.value.students[i]) {
        selectedStudents.push(this.students[i])
      }
    }


    if (selectedSets.length == 0 || selectedStudents.length == 0) {
      this.emptyList = true;
      return;
    }

    let classValue: Class = {
      title: this.classForm.value.title,
      sets: selectedSets,
      students: selectedStudents,
      creator: this.as.email,
    };

    console.log(classValue);
    
    this.ds.addClass(classValue)
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['classes']);
  }

}
