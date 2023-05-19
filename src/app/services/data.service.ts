import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Set } from "../models/set.model";
import { Class } from "../models/class.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private setUrl = "https://szak2-2598a-default-rtdb.europe-west1.firebasedatabase.app/sets"
  private classUrl = "https://szak2-2598a-default-rtdb.europe-west1.firebasedatabase.app/classes"
  isWorking = false;


  constructor(private http: HttpClient) { }

  getSets(isPreview?: boolean) {
    this.isWorking = true;
    return this.http.get(this.setUrl + ".json")
      .pipe(
        map((resp) => {
          const setsArray: Set[] = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              setsArray.push({ ...resp[key], id: key })
            }
          }
          this.isWorking = false;
          return isPreview ? setsArray.slice(0, 4) : setsArray;
        })
      )
  }

  getSet(id: string) {
    this.isWorking = true;
    return this.http.get(this.setUrl + ".json")
      .pipe(map((resp) => {
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            if (key == id) {
              return { ...resp[key] }
            }
          }
          this.isWorking = false
        }
      })
      );
  }

  addSet(s: Set) {
    this.isWorking = true;
    this.http.post(this.setUrl + ".json", s).subscribe();
    this.isWorking = false;
  }

  updateSet(s: Set, id: string) {
    this.isWorking = true;
    this.http.patch(this.setUrl + "/" + id + ".json", s).subscribe();
    this.isWorking = false;
  }

  deleteSet(id: string) {
    this.isWorking = true;
    this.http.delete(this.setUrl + "/" + id + ".json").subscribe();
    this.isWorking = false;
  }

  getClasses(isPreview?: boolean) {
    this.isWorking = true;
    return this.http.get(this.classUrl + ".json")
      .pipe(
        map((resp) => {
          const classesArray: Class[] = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              classesArray.push({ ...resp[key], id: key })
            }
          }
          this.isWorking = false;
          return isPreview ? classesArray.slice(0, 4) : classesArray;
        })
      )
  }

  getClass(id: string) {
    this.isWorking = true;
    return this.http.get(this.classUrl + ".json")
      .pipe(map((resp) => {
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            if (key == id) {
              return { ...resp[key] }
            }
          }
          this.isWorking = false
        }
      })
      );
  }


  addClass(c: Class) {
    this.isWorking = true;
    this.http.post(this.classUrl + ".json", c).subscribe();
    this.isWorking = false;
  }

  updateClass(c: Class, id: string) {
    this.isWorking = true;
    this.http.patch(this.classUrl + "/" + id + ".json", c).subscribe();
    this.isWorking = false;
  }

  deleteClass(id: string) {
    this.isWorking = true;
    this.http.delete(this.classUrl + "/" + id + ".json").subscribe();
    this.isWorking = false;
  }

  postTest(test: any, id: string) {
    let url = this.classUrl + "/" + id + "/tests.json";
    this.http.post(url, test).subscribe();
  }

  getTest(cid: string, tid: string) {
    return this.http.get(this.classUrl + '/' + cid + '/tests.json')
      .pipe(map((resp) => {
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            if (key == tid) {
              return { ...resp[key] }
            }
          }
        }
      })
      );
  }

  postAttempt(cid: string,tid: string, data: any) {
    let url =  this. classUrl +"/" +cid + "/tests/"+tid+"/attempts.json";
    this.http.post(url, data).subscribe();
  }

}
