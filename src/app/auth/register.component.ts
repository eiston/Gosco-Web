/**
 * Created by Eiston on 7/5/2017.
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['./auth.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  repassword: string;
  name = {
    first: '',
    last: '',
  };
  equal = true;
  constructor(public authService: AuthService) { }
  signup() {
    if (this.password === this.repassword) {
      this.authService.signup(this.email, this.password, this.name);
    } else {
      this.equal = false;
    }
  }

  ngOnInit() {
  }

}
