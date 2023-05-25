import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email;

  constructor(protected as: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.as.user.subscribe(user => {
      this.email = user.email;
      this.as.setStats();
    });
  }

  logout(){
    this.as.logout();
    this.router.navigate(["/login"])
  }

}
