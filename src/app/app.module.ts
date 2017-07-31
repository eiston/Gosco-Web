import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NAV_DROPDOWN_DIRECTIVES} from './shared/nav-dropdown.directive';

import {ChartsModule} from 'ng2-charts/ng2-charts';
import {SIDEBAR_TOGGLE_DIRECTIVES} from './shared/sidebar.directive';
import {AsideToggleDirective} from './shared/aside.directive';
import {BreadcrumbsComponent} from './shared/breadcrumb.component';


// Routing Module
import {AppRoutingModule} from './app.routing';

// Firebase
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';

import {environment} from '../environments/environment';
import {SimpleLayoutComponent} from './layouts/simple-layout.component';
import {AuthService} from './auth/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdGridListModule, MdSliderModule, MdTooltipModule} from '@angular/material';
import {DragulaModule, DragulaService} from 'ng2-dragula';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdGridListModule,
    MdTooltipModule,
    MdSliderModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    DragulaModule,
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  providers: [
    AngularFireDatabase,
    AuthService,
    DragulaService,
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
