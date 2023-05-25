import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../models/user.model';

interface AuthRespData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ADMIN_EMAIL = "admin@admin.com";
  private usersUrl = "https://szak2-2598a-default-rtdb.europe-west1.firebasedatabase.app/users.json"
  user = new BehaviorSubject<User>(null);
  isAuthenticated = false;
  email;
  role = "student";
  stats;
  private id;
  param

  constructor(private http: HttpClient) { }

  signup(email: string, pw: string) {
    return this.http.post<AuthRespData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwiep8428Vl0gf9Wsx3EWBTe0Tn0vlnBk",
      {
        email: email,
        password: pw,
        returnSecureToken: true
      })
      .pipe(
        tap(respData => {
          const expDate = new Date(new Date().getTime() + (+respData.expiresIn) * 1000);
          const user = new User(respData.email, respData.localId, respData.idToken, expDate);
          this.user.next(user);
          this.isAuthenticated = true;
          this.email = respData.email;
        }))
  }

  login(email: string, pw: string) {
    return this.http.post<AuthRespData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwiep8428Vl0gf9Wsx3EWBTe0Tn0vlnBk",
      {
        email: email,
        password: pw,
        returnSecureToken: true
      })
      .pipe(
        tap(respData => {
          const expDate = new Date(new Date().getTime() + (+respData.expiresIn) * 1000);
          const user = new User(respData.email, respData.localId, respData.idToken, expDate);
          this.user.next(user);
          this.isAuthenticated = true;
          this.email = respData.email;
        }))

  }

  logout() {
    this.user.next(null);
    this.isAuthenticated = false;
    this.email = "";
  }

  addUser(email: string, role: string) {
    this.http.post(this.usersUrl, {
      email: email,
      role: role,
      stats: {
        setCreated: 0,
        setPerfect: 0,
        testSolved: 0,
        testPerfect: 0,
      }
    }).subscribe()
  }

  setStats() {
    this.http.get(this.usersUrl)
      .pipe(
        map((resp) => {
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              if (resp[key].email == this.email) {
                this.stats = resp[key].stats
                this.id = key

              }
            }
          }
        })
      ).subscribe();
  }

  updateStat(type: any) {
    // console.log(this.id, ++this.stats[type]);
    this.stats[type]++;
    switch (type) {
      case "setCreated":
        this.param = {
          "setCreated": this.stats[type]
        }
        break;
      case "setPerfect":
        this.param = {
          "setPerfect": this.stats[type]
        }
        break;
      case "testSolved":
        this.param = {
          "testSolved": this.stats[type]
        }
        break;
      case "testPerfect":
        this.param = {
          "testPerfect": this.stats[type]
        }

        break;
    }
    this.http.patch("https://szak2-2598a-default-rtdb.europe-west1.firebasedatabase.app/users/" + this.id + "/stats.json", this.param).subscribe();

  }

  setRole() {
    this.http.get(this.usersUrl)
      .pipe(
        map((resp) => {
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              if (resp[key].email == this.email) {
                this.role = resp[key].role
              }
            }
          }
        })
      ).subscribe();
  }

  getStudents() {
    return this.http.get(this.usersUrl)
      .pipe(
        map((resp) => {
          const studentsArray = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key) && resp[key].role == "student") {
              studentsArray.push({ ...resp[key], id: key })
            }
          }
          return studentsArray;
        })
      )
  }
}
