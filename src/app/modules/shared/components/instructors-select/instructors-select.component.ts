import { InstructorService } from './../../models/instructor/instructor.service';
import { Instructor, IInstructor } from './../../models/instructor/instructor';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-instructors-select',
  templateUrl: './instructors-select.component.html',
  styleUrls: ['./instructors-select.component.scss']
})
export class InstructorsSelectComponent implements OnInit {

  instructorSelectForm: FormGroup;

  @Input() height:string 
  @Input() instructorValues:Instructor[];

  @Output() instructorSelected = new EventEmitter<Instructor>();

  constructor(private formBuilder: FormBuilder) {
    this.instructorSelectForm = this.formBuilder.group({
      instructorSelect: ''
    });
   }

  ngOnInit() { }

  // height de la barre de recherche
  getHeight() {
    switch (this.height) {
      case 'lg':
        return '3.2rem';
      case 'sm':
        return '4rem';
    }
  }

  

  // Formateur sélectionnée par l'utilisateur
  selectInstructor(event:string) {
    console.warn('ùmee',event);
    //Emettre le formateur sélectionné
    const inst = this.instructorValues.find(inst => inst.id === event)
    this.instructorSelected.emit(inst);
  }
}
