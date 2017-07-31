/**
 * Created by Eiston on 7/5/2017.
 */
import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import * as jsPDF from 'jspdf';
import {isNumber} from 'util';

@Component({
  templateUrl: './ownership-result.component.html',
})

export class OwnershipResultComponent implements OnInit {
  uid: string;
  captital: number;
  Actuators = 2;
  ValveRepairCost = 300;
  Valve_Cost: number;
  RepairKits_Cost: number;
  Actuator_Cost: number;
  Install_Cost: number;
  Shipping_Cost: number;
  Valve_Multi: number;
  RepairKits_Multi: number;
  Actuator_Multi: number;
  total_static: number;
  total_yearly: number;
  detailhide = true;
  costs = [];
  submitted: FirebaseListObservable<any>;
  constants = {
    valveNumber: 0,
    MTBF: 0,
    failPercent: 0,
    opportunityCost: 0
  };
  constructor( public authService: AuthService, db: AngularFireDatabase, private router: Router) {
    this.authService.user.subscribe(
      (auth) => {
        if (auth === null) {
          console.log('Not Logged in.');
          this.router.navigate(['signin']);
        } else {
          this.uid = auth.uid;
          console.log('logged in ', auth);
          console.log('/ownership/answers/' + this.uid);
          this.submitted = db.list('/ownership/answers/' + this.uid + '/submitted');
          db.object('/ownership/answers/' + this.uid + '/constants').subscribe(constants => {
            this.constants.valveNumber = constants.valveNumber;
            this.constants.MTBF = constants.MTBF;
            this.constants.failPercent = constants.failPercent;
            this.constants.opportunityCost = constants.opportunityCost;
          });
          this.makeArray();
        }
      }
    );
  }
  ngOnInit() {
  }
  makeArray() {
    this.submitted.subscribe(items => {
      items.forEach(item => {
          this.costs.push({type: item.type, amount: item.amount, otc: item.otc, quantity: this.constants.valveNumber});
        })
      console.log(JSON.stringify(this.costs));
      this.getInfo();
    })

  }
  getInfo() {
    this.captital = 0;
    this.total_static = 0;
    this.total_yearly = 0;
    console.log(JSON.stringify(this.constants));
    this.costs.forEach(item => {
      if (item.otc) {
        this.total_static += (Number(item.amount) * Number(item.quantity));
      } else {
        this.total_yearly += (Number(item.amount) * Number(item.quantity));
      }
      switch (item.type) {
        case 'Cost of New Valve': {
          this.Valve_Cost =  Number(item.amount);
          this.Valve_Multi =  Number(item.quantity);
          this.captital += (this.Valve_Cost * (this.NumberOfSpareValve(5, this.Valve_Multi, this.constants.failPercent) + this.Valve_Multi));
          // console.log('Cost of New Valve ', this.Valve_Multi);
          break;
        }
        case 'Cost of New Actuator': {
          this.Actuator_Cost =  Number(item.amount);
          this.Actuator_Multi =  Number(item.quantity);
          this.captital += this.Actuator_Cost * (this.Actuators + this.Actuator_Multi);
          // console.log('Cost of New Actuator');
          break;
        }
        case 'Cost of Repair Kit': {
          this.RepairKits_Cost =  Number(item.amount);
          this.RepairKits_Multi =  Number(item.quantity);
          this.captital += (this.RepairKits_Cost * (this.NumberOfSpareRepair(5, this.RepairKits_Multi, this.constants.failPercent)));
          // console.log('Cost of Spare Repair Kit');
          break;
        }
        case 'Cost to Test New Valve Before Installation': {
          this.Install_Cost = Number(item.amount);
          this.total_static += (this.Install_Cost * this.Valve_Multi);
          break;
        }
        case 'Cost of Packaging and Shipping': {
          this.Shipping_Cost = Number(item.amount);
          break;
        }
        case 'Cost to Remove and Re-install Valve': {
          this.total_static += (Number(item.amount) * Number(item.quantity) * 0.8);
          console.log('Cost to Remove and Re-install Valve');
          break;
        }
      }
    })
    console.log(this.total_static);
  }
  updateValveNumber() {
    this.costs.forEach(item => {
      item.quantity = this.constants.valveNumber;
    })
    this.getInfo();
  }
  NumberOfSpareValve(Year: number, amount: number, percent: number) {
    // console.log(Year, amount, percent);
    const yearnumber = (Year * 12) / this.constants.MTBF;
    const perc = percent / 100;
    const valveSpare = Math.floor((amount +  yearnumber * amount ) * perc) + 1;
    return valveSpare;
  }
  NumberOfSpareRepair(Year: number, amount: number, percent: number) {
    const valveNumber = this.NumberOfSpareValve(Year, amount, percent);
    const perc = percent / 100;
    return Math.floor((valveNumber / perc - valveNumber) / (Year * 3));
  }
  CostOfReplaceRepair() {
    const NonRepairable = this.NumberOfSpareValve(5, this.Valve_Multi, this.constants.failPercent);
    const Repairable = NonRepairable / (this.constants.failPercent / 100) - NonRepairable;
    const TotalCost = (NonRepairable * (this.Valve_Cost + 0.3 * this.Shipping_Cost + this.Install_Cost)) + (Repairable * this.ValveRepairCost);
    return TotalCost / (NonRepairable + Repairable);
  }
  OppertunityCost(percent: number) {
    const perc = percent / 100;
    const total = this.captital - this.Valve_Multi * this.Valve_Cost - this.Actuator_Multi * this.Actuator_Cost;
    return (total * perc) * this.constants.MTBF / 12;
  }
  TotalCostofOwnership(Year: number) {
    const valveSpare = this.NumberOfSpareValve(Year, this.Valve_Multi, this.constants.failPercent) * this.Valve_Cost;
    const repairSpare = this.NumberOfSpareRepair(Year, this.RepairKits_Multi, this.constants.failPercent) * this.RepairKits_Cost;
    const actuatorSpare = this.Actuators * this.Actuator_Cost;
    const repair = (this.CostOfReplaceRepair() * this.Valve_Multi * Year * 12 ) / this.constants.MTBF;
    const opportunity = this.OppertunityCost(this.constants.opportunityCost);
    const total = repair + opportunity + valveSpare + repairSpare + actuatorSpare;
    return this.total_static + ( this.total_yearly * Year * 12 ) / this.constants.MTBF + total;
  }
  MonthlyCostofOwnership(Year: number) {
    return this.TotalCostofOwnership(Year) / (Year * 12);
  }
  MonthlyCostPerPosition (Year: number, postions: number) {
    return this.MonthlyCostofOwnership(Year) / postions;
  }
  download() {
    const page = document.getElementById('pdfprint');
    const pdf = new jsPDF('l', 'pt', 'a4');
    pdf.addHTML(page, () => {
      pdf.save('CostOfOwnership.pdf');
    });
  }
}
