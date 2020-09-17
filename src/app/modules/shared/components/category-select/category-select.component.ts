import { Category } from './../../models/category/category';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {

  categorySelectForm: FormGroup;

  @Input() height:string 
  @Input() categorySelectId: string;
  @Input() categoryValues:Category[];

  @Output() categorySelected = new EventEmitter<Category>();

  constructor(private formBuilder: FormBuilder) {
    this.categorySelectForm = this.formBuilder.group({
      categorySelect: ['', Validators.required]
    });
   }

  ngOnInit() { 
    console.warn('hhhhmihulgyku',this.categorySelectId);
  }

  // height de la barre de recherche
  getHeight() {
    switch (this.height) {
      case 'lg':
        return '3.2rem';
      case 'sm':
        return '4rem';
    }
  }

  

  // Formateur sélectionnée par la catégorie
  selectCategory(event:string) {
    console.warn('ùmee',event);
    //Emettre la catégorie sélectionné
    const cat = this.categoryValues.find(cat => cat.id === event)
    this.categorySelected.emit(cat);
  }

}
