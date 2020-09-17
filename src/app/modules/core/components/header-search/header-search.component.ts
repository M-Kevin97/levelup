import { CourseService } from 'src/app/modules/shared/models/course/course.service';
import { ISearchQuery, WhatResults } from './../../../shared/models/ISearchQuery';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '../../router/path.enum';
import { Course } from 'src/app/modules/shared/models/course/course';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {

  @Output() search = new EventEmitter<ISearchQuery>();

  resultsCourse:Array<Course> = [];
  mySubscription: any;

  constructor(private courseService:CourseService,
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit() { 

   
  }

  goHome() {
    this.router.navigate([Path.HOME]);
  }

  goToAdmin() {
    this.router.navigate([Path.ADMIN]);
  }

  goToResultsPage(event:ISearchQuery) {
    
    if(event){
      // si pas de mots clés, recherche par mots clés
      if(event.query){
        this.router.navigate([Path.RESULTS], { 
          queryParams: { 
            q: event.query,
            category: event.category.name
          }
        });
        // si pas de mots clés, recherche par cat
      } else {
        this.router.navigate([Path.RESULTS], { 
          queryParams: { 
            category: event.category.name
          }
        });
      }
    
      this.search.emit(event);
    }
  }
}
