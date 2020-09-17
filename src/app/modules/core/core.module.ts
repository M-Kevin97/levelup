import { SharedModule } from './../shared/shared.module';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    CoreComponent,
    HeaderComponent,
    HeaderSearchComponent,
    FooterComponent,
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    HeaderComponent,
    HeaderSearchComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
