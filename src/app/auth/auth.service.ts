import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


@Injectable()
export class AuthService {
  loginInfo = null;
  loginerror = '';
  signuperror = '';
  users: FirebaseListObservable<any>;
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.user = firebaseAuth.authState;
    this.users = db.list('/users');
    this.user.subscribe((auth) => {
      this.loginInfo = auth
    });
  }
  signup(email: string, password: string, name: object) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.firebaseAuth.auth.currentUser.sendEmailVerification();
        this.users.push({email: email,
          uid: this.firebaseAuth.auth.currentUser.uid,
          name});
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.signuperror = err.message;
      });
  }
  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!' , value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.loginerror = err.message;
      });
  }
  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(value => {
        console.log('Nice, it logged out' , value)
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

}/**
 * Created by Eiston on 7/5/2017.
 */
