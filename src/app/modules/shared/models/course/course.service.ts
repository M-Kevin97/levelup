import { InstructorService } from './../instructor/instructor.service';
import { Injectable } from '@angular/core';
import { Category } from '../category/category';
import * as firebase from 'firebase';
import { Database } from '../../database/database.enum';
import { Course } from './course';
import { Subject } from 'rxjs';
import { CategoryService } from '../category/category.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  courses:Course[] = [];
  coursesSubject = new Subject<Course[]>();
  courseSubject = new Subject<Course>();

  // Cet attribut sert à récupérer l'id du dernier Item créé
  private _lastCourseCreated: Course = null;


  public get lastCourseCreated(): Course {
    return this._lastCourseCreated;
  }


  emitItems(){
    this.coursesSubject.next(this.courses);
  }

  emitItem(course:Course){
    this.courseSubject.next(course);
  }

  saveNewCourseInDB(newCourse:Course): Promise<Course> {

    var ref = firebase.database().ref(Database.DATA_COURSES);

    const id = ref.push().key;
    ref = ref.child(id);
    newCourse.id = id;

    this._lastCourseCreated = newCourse;

    let searchContent:string = '';

    if(newCourse.title)
      searchContent = searchContent.concat(newCourse.title.replace(/[^\wèéòàùì]/gi, ''));
    if(newCourse.instructor) 
      searchContent = searchContent.concat('/', newCourse.getInstructorFullName().replace(/[^\wèéòàùì]/gi, ''));
    if(newCourse.description) 
      searchContent = searchContent.concat('/', newCourse.description.replace(/[^\wèéòàùì]/gi, ''));
    if(newCourse.category) 
      searchContent = searchContent.concat('/', newCourse.category.name.replace(/[^\wèéòàùì]/gi, ''));

    newCourse.searchContent = searchContent.toLocaleLowerCase();

    return ref.set({
      searchContent: newCourse.searchContent,
      title: newCourse.title,
      description: newCourse.description,
      price: newCourse.price, 
      creationDate: newCourse.creationDate,
      imageLink: newCourse.imageLink,
      srcLink: newCourse.srcLink,
    }).then(
      () => {
        
        CategoryService.saveCategoryWithReference(ref, newCourse.category).then(
          (bool) => {
            // si la category a été sauvegardée
            if(bool) {
              // si la le formateur n'a pas été sauvegardé
              if(!InstructorService.saveIInstructorWithReference(ref, newCourse.instructor)) {
                return newCourse;
              }
              else return null;
              // si la category n'a pas été sauvegardée
              } else {
                return null;
              }
          });
          return newCourse;
        }
      ).catch(
        (error) => {
          console.log(error);
          return null;
        }
      );
  }

  getCourseByCategory(category:Category){

    console.warn("zlelbhbflnj,k;lef", category.name);

    return firebase.database().ref(Database.DATA_COURSES)
                              .orderByChild('category/'+category.id+'/name')
                              .equalTo(category.name)
                              .once('value')
                              .then(
      (snapshot) => {
        if(snapshot){
          return (snapshot.val());
        }
      })
      .catch(
        (error) => {
          console.error(error);
        }
      );
  }

  getCoursesFromDB(){
    return firebase.database().ref(Database.DATA_COURSES)
                              .once('value')
                              .then(
      (snapshot) => {

        console.error('lezmnez________',snapshot.val());

        if(snapshot){
          return (snapshot.val());
        }
      })
      .catch(
        (error) => {
          console.error(error);
        }
      );
  }
}
