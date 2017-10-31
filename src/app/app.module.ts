import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { AppComponent } from './app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProjectsComponent } from './project/projects.component';
import { ProjectService } from './project.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatNativeDateModule]
})
export class MyOwnCustomMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    TaskDetailComponent,
    ProjectsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
