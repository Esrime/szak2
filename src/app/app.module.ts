import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListComponent, FilterTextPipe } from './sets/list/list.component';
import { DetailComponent } from './sets/detail/detail.component';
import { FlipcardComponent } from './sets/flipcard/flipcard.component';
import { PreviewComponent } from './sets/preview/preview.component';
import { ClistComponent } from './classes/clist/clist.component';
import { CdetailComponent } from './classes/cdetail/cdetail.component';
import { CpreviewComponent } from './classes/cpreview/cpreview.component';
import { SetformComponent } from './sets/setform/setform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormatTimePipe, PracticeComponent } from './sets/practice/practice.component';
import { ClassformComponent } from './classes/classform/classform.component';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { InterceptorService } from './services/interceptor.service';
import { TestformComponent } from './test/testform/testform.component';
import { TdetailComponent } from './test/tdetail/tdetail.component';
import { TpracticeComponent } from './test/tpractice/tpractice.component';
import { AchievementsComponent } from './achievements/achievements.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ListComponent,
    DetailComponent,
    FlipcardComponent,
    PreviewComponent,
    ClistComponent,
    CdetailComponent,
    CpreviewComponent,
    SetformComponent,
    PracticeComponent,
    FormatTimePipe,
    ClassformComponent,
    LoginComponent,
    SpinnerComponent,
    TestformComponent,
    TdetailComponent,
    TpracticeComponent,
    FilterTextPipe,
    AchievementsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
