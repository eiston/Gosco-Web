/**
 * Created by Eiston on 7/5/2017.
 */
import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public authService: AuthService) { }
  ngOnInit() {
  }
}
