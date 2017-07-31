import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
/**
 * Created by Eiston on 7/5/2017.
 */
@Component({
  templateUrl: './ownership-form.component.html',
})

export class OwnershipFormComponent implements OnInit {
  uid: string;
  newtype: string;
  newcost: number;
  onetime: boolean;
  addbutton: boolean;
  nextbutton: boolean;
  items: FirebaseListObservable<any>;
  answerdata: FirebaseListObservable<any>;
  submitted: FirebaseObjectObservable<any>;
  constants: FirebaseObjectObservable<any>;
  dataSubmit = [];
  cons = {
    valveNumber: 50,
    MTBF: 28,
    failPercent: 15,
    opportunityCost: 5
  };
  constructor( public authService: AuthService, db: AngularFireDatabase, private router: Router) {
    this.authService.user.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('Not Logged in.');
          this.router.navigate(['signin']);
        } else {
          this.uid = auth.uid;
          console.log('/quote/answers/' + this.uid);
          this.constants = db.object('/ownership/answers/' + this.uid + '/constants');
          this.submitted = db.object('/ownership/answers/' + this.uid + '/submitted');
          this.answerdata = db.list('/ownership/answers/' + this.uid + '/data');
          this.answerdata.remove();
          this.items = db.list('/ownership/questions');
          this.items.subscribe(items => {
            items.forEach(item => {
              console.log('Item:', item.type);
              this.answerdata.push({ type: item.type, otc: item.otc, amount: item.amount, desc: item.desc});
            })
          });
        }
      }
    );
    this.onetime = true;
    this.addbutton = true;
    this.nextbutton = true;
  }

  ngOnInit() {
  }
  submitAnswer(key: string, answer: number) {
    if (answer) {
       this.answerdata.update(key, { amount: answer });
    }
  }
  addForm() {
    this.answerdata.push({type: this.newtype, otc: this.onetime, amount: this.newcost});
    this.newtype = '';
    this.newcost = null;
    this.onetime = true;
    this.addbutton = true;
  }
  submitForm() {
    this.answerdata.subscribe(items => {
      items.forEach(item => {
        this.dataSubmit.push({type: item.type, amount: item.amount, otc: item.otc});
      })
    })
    this.constants.set(this.cons);
    this.submitted.set(this.dataSubmit);
  }

}
