import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
@Component({
  templateUrl: 'valve-add.component.html'
})
export class ValveAddComponent {
  users: FirebaseListObservable<any>;
  valves: FirebaseListObservable<any>;
  valve: FirebaseListObservable<any>;
  uid: Subject<any>;
  constructor(public authService: AuthService, db: AngularFireDatabase, private router: Router ) {
    this.users = db.list('/users');
    this.valve = db.list('/valves');
    this.valves = db.list('/valves/' + this.uid);
  }
  newvalve(serial: string, uid: string) {
    this.uidfilter(uid);
    this.valves.push({serial: serial});
  }
  uidfilter(uid: string) {
    this.uid.next(uid);
  }
}

