import { WhatResults } from './../../../shared/models/ISearchQuery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '../../router/path.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate([Path.HOME]);
  }

  goToTrainingSearching() {
    this.router.navigate([Path.SEARCH]);
  }

  searchInstructors() {
    this.router.navigate([Path.RESULTS], 
      { queryParams: 
        { 
          category: 'Toutes les catégories',
          wr:WhatResults.INSTRUCTOR
        }
      });
  }
}
