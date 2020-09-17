import { Instructor, IInstructor } from './instructor';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Database } from '../../database/database.enum';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  instructor: Instructor;

  instructors: Instructor[] = [];
  instructorsSubject = new Subject<Instructor[]>();

  constructor() { }

  emitInstructors(){
    this.instructorsSubject.next(this.instructors);
  }

  addNewInstructor(newInstructor: Instructor) {
    var ref = firebase.database().ref(Database.DATA_INSTRUCTORS);
    return this.saveInstructorInDB(ref,newInstructor);
  }

  getInstructorsFromDB(){
    
    console.log('getInstructorsFromDB InstructorService');

    return firebase.database().ref(Database.DATA_INSTRUCTORS).once('value').then( 
      (data) => {
        console.warn('getInstructorsFromDB InstructorService', data);
        data.forEach((element) => {
          console.log(element.key, element.child('name').val());
          this.instructors.push(new Instructor(element.key, 
                                               element.child('firstname').val(),
                                               element.child('lastname').val(),
                                               element.child('title').val(),
                                               element.child('bio').val(),
                                               element.child('websiteLink').val(),
                                               element.child('courses').val(),
                                               element.child('ppLink').val()));
        });

        
        this.emitInstructors();
        console.log(data.val());

        return Array.from(this.instructors);
      }
    );
  }

  private saveInstructorInDB(ref:firebase.database.Reference, newInstructor: Instructor){

    const id = ref.push().key;
    ref = ref.child(id);
    newInstructor.id = id;

    return ref.set({
        firstname: newInstructor.firstname, 
        lastname: newInstructor.lastname, 
        title: newInstructor.title,
        bio: newInstructor.bio,
        websiteLink: newInstructor.webSiteLink,
        courses: newInstructor.courses,
        ppLink: newInstructor.ppLink,
    }).then(
      () => {

        return true;

    }).catch((error)=>{
      console.log(error);
      return false;
    });
  }

  public static saveIInstructorWithReference(ref:firebase.database.Reference, newIInstructor: IInstructor){

    return ref.child(Database.INSTRUCTOR).child(newIInstructor.id).set({
        firstname: newIInstructor.firstname, 
        lastname: newIInstructor.lastname, 
        title: newIInstructor.title,
        ppLink: newIInstructor.ppLink,
    }).then(
      () => {

        return true;

    }).catch((error)=>{
      console.log(error);
      return false;
    });
  }
}
