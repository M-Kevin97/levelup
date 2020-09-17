import { WhatResults } from './../../models/ISearchQuery';
import { ISearchQuery } from 'src/app/modules/shared/models/ISearchQuery';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/modules/shared/models/category/category';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/modules/shared/models/category/category.service';
import { ActivatedRoute } from '@angular/router';

enum DefautCategory {
  NAME = "Toutes les catégories",
};

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;

  @Input() height:string;
  @Output() searchQuery = new EventEmitter<ISearchQuery>();

  wResults:string = '';
  categorySelected: Category;
  categoryValues:Category[];

  idCategorySelected:string;

  private categorySubscription: Subscription;

  constructor(private categoryService:CategoryService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { 

    this.categoryValues = [];


    this.searchForm = this.formBuilder.group({
      category: [''],
      search: ''
    });
  }

  ngOnInit() { 
    console.warn('dfhfghj;k:lhghfdfsdfghjk');


    // Récupération des catégories de la DB
    this.categoryService.getCategoriesFromDB().then(
      (data:Category[]) => {

        console.warn(data);
        this.categoryValues = data ? Array.from(data) : [];
        this.categoryValues.splice(0, 0, new Category('0', DefautCategory.NAME));
        this.categorySelected = this.categoryValues[0];
        this.idCategorySelected = this.categorySelected.id;
      }
    ).then(
      () => {
        // Récupération des paramètres de l'URL
        this.route.queryParams.subscribe(
          (params) => {
            if(params['category'] || params['q']) {
              let categoryName = params['category'] ? params['category'] : DefautCategory.NAME;
              let query = params['q'] ? params['q'] : '';
              this.wResults = params['wr'] ? params['wr'] : '';
  
              console.log('ngOnInit categoryName :', categoryName);
              console.log('ngOnInit query :', query);
  
              this.fillSearchForm(categoryName, query);
            }
          },
          (err: string) => console.error('Observer got an error: ' + err),
          () => {
            console.log('Observer got a complete notification');
          }
        );
      }
    );
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

  // Catégorie sélectionnée par l'utilisateur
  selectCategory(event:Category) {
    console.warn('selectCategory', event.name);
    if(event) this.categorySelected = event;
  }

  // remplir la barre de recherche
  fillSearchForm(catName:string, query:string) {

    if(catName) {
      console.log('fillFilterForm', catName);
      console.log('fillFilterForm', this.categoryValues);
      this.categorySelected = this.categoryValues.find(cat => cat.name === catName);
    }
    else this.categorySelected = this.categoryValues.find(cat => cat.name === DefautCategory.NAME);

    this.idCategorySelected = this.categorySelected.id;
    
    if(query) {
      console.log('fillFilterForm', query);
      this.searchForm.patchValue({search: query});
    }

    this.emitSearchQuery();
  }

  emitSearchQuery() {
    let iSearchQuery : ISearchQuery = {
      category: this.categorySelected,
      query: this.searchForm.get('search').value,
      wr: this.wResults
    }
    console.log(iSearchQuery.category, iSearchQuery.query);
    
    this.searchQuery.emit(iSearchQuery);
  }
}
