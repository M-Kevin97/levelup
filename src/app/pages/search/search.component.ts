import { ISearchQuery, WhatResults } from './../../modules/shared/models/ISearchQuery';
import { CategoryService } from 'src/app/modules/shared/models/category/category.service';
import { Instructor } from './../../modules/shared/models/instructor/instructor';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/modules/shared/models/course/course';
import { CourseService } from 'src/app/modules/shared/models/course/course.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Category } from 'src/app/modules/shared/models/category/category';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // variable pour la barre de navigation (Formation, Catégorie, Formateur)
  activeTab = 'courses';

  instructorsList:Array<Instructor> = [];
  coursesList:Array<Course> = [];

  categoryName:string = '';
  query:string = '';
  mySubscription: any;

  instructorNavActive:boolean = true;
  courseNavActive:boolean = false;

  nbInstructors:number = 0;
  nbCourses:number = 0;

  resultsCourse:Array<Course> = [];


  constructor(private courseService:CourseService) { 

  }

  ngOnInit() {
  // lancer la recherche 
   
  } 

  displayPanel(activeTab){
    this.activeTab = activeTab;
  }
  
  // methode pour rechercher des formations dans la DB en fonction de la categorie choisie et des mots clés
  searchCourses(event:ISearchQuery){

    this.resultsCourse = [];
    //const category = this.categoryService.categories.find(val => val.name === categoryName);


    // Si il y a une categorie, récupérer les formations en fonction de la categorie 
    if(event.category && event.category.id!=='0') {
      console.warn('searchCourses category :', event.category.name);
      this.searchCoursesWithCategory(event.category).then(
        (val) => {
          if(val) {
            if(event.query) val = this.filterResultsWithQuery(val, event.query);
            this.resultsCourse = Array.from(val);
          }
        }
      );
    }
    // Si il n'y a pas de categorie (Tout), ni de mots clés, récupérer toutes les formations 
    else {
      this.searchCoursesWithQuery(event.query).then(
        (val) => {
          if(val) this.resultsCourse = Array.from(val);
          else return [];
        }
      );
    }

    console.error('///_____ Courses',this.resultsCourse);
    if(event.wr===WhatResults.INSTRUCTOR) this.displayPanel('instructors');
  }

  // methode pour rechercher des formations dans la DB en fonction de la categorie choisie et des mots clés
  private searchCoursesWithCategory(category: Category){

     return this.courseService.getCourseByCategory(category).then(
      (val) => {

        if(val) return this.parseDataFromDB(val); 
        else return [];
        
      }
    ); 
  }

  private searchCoursesWithQuery(query:string){

    return this.courseService.getCoursesFromDB().then(
      (val) => {
        console.error('///_____ getItemsFromDB :',val);
        
        return this.filterResultsWithQuery(this.parseDataFromDB(val), query);

      }
    ).catch(
      (error) => {
        console.error(error);
        return [];
        
      }
    );

  }

  // methode pour parser le format JSON en OBJET
  parseDataFromDB(val:Object){

    if(!val) return null;

      this.resultsCourse = Object.keys(val).map(
        function(coursesIdIndex){
        let courseJson = val[coursesIdIndex], course;
    
        console.log(val);
        console.error(courseJson);

        course = Course.courseFromJson(courseJson); 

        course.id = coursesIdIndex;

        return course;
    });
  }

  // methode pour filter les résultats en fonction des mots clés
  private filterResultsWithQuery(courses:Course[], query:string) {

    if(courses && query){

      console.error('rhexcjvkbhnj',query);

      let y = 0, resultsFilteredQuery = Array.from(courses);

      // Trie en fonction des mots clés
      courses.forEach(
        (result) => {

          console.warn(result.searchContent,' includes :',query.toLocaleLowerCase(), 'res: ',result.searchContent.includes(query.toLocaleLowerCase()));

          //récupération de chaque mot de la recherche
          let splittedArray = query.toLocaleLowerCase().split(' ');
          let counts:number[] = [];

          for(let keyword of splittedArray) counts.push(result.searchContent.split(keyword).length - 1); 
    
          if(!counts.reduce((a, b) => a + b, 0)) {
            resultsFilteredQuery.splice(courses.indexOf(result)-y,1);
            y++;
          }
          
        }
      );
      console.error('MIDDLE FILTER', resultsFilteredQuery);
      return resultsFilteredQuery;

    } else return courses;
  }

}

