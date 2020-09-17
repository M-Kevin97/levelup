import { CategorySelectComponent } from './components/category-select/category-select.component';
import { InstructorsSelectComponent } from './components/instructors-select/instructors-select.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ItemModule } from './../item/item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    ItemModule,
    ReactiveFormsModule
  ],
  declarations: [
    SharedComponent,
    SearchBarComponent,
    InstructorsSelectComponent,
    CategorySelectComponent,
  ],
  exports: [
    ItemModule,
    SearchBarComponent,
    InstructorsSelectComponent,
    CategorySelectComponent,
  ]
})
export class SharedModule { }
