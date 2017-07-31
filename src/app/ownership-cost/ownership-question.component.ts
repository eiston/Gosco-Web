/**
 * Created by Eiston on 7/5/2017.
 */
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  templateUrl: './ownership-question.component.html',
})

export class OwnershipQuestionComponent implements OnInit {
  items: FirebaseListObservable<any>;
  costType: string;
  costAmount: number;
  costOnetime: boolean;
  costDesc: string;
  hide: boolean;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/ownership/questions');
    this.costOnetime = true;
    this.hide = true;
  }

  ngOnInit() {
  }
  addItem() {
    this.items.push({ type: this.costType,
      amount: this.costAmount,
      otc: this.costOnetime,
      desc: this.costDesc,
      hidden: this.hide});
    this.costType = this.costDesc = '';
    this.costAmount = null;
    this.costOnetime = true;
  }
  updateItem(key: string, newTyps: string, newAmount: number, newChek: boolean, newDesc) {
    this.items.update(key, {type: newTyps , amount: newAmount, otc: newChek, desc: newDesc});
  }
  togglebox(key: string, hidden: boolean) {
    this.items.update(key, {hidden: hidden});
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }
}
