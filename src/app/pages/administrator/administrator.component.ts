import { CategorySelectComponent } from './../../modules/shared/components/category-select/category-select.component';
import { InstructorsSelectComponent } from './../../modules/shared/components/instructors-select/instructors-select.component';
import { CourseService } from './../../modules/shared/models/course/course.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Category } from 'src/app/modules/shared/models/category/category';
import { CategoryService } from 'src/app/modules/shared/models/category/category.service';
import { Course } from 'src/app/modules/shared/models/course/course';
import { Instructor } from 'src/app/modules/shared/models/instructor/instructor';
import { InstructorService } from 'src/app/modules/shared/models/instructor/instructor.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  // les différents formulaires
  categoryForm: FormGroup;
  subcategoryForm: FormGroup;
  courseForm: FormGroup;
  instructorForm: FormGroup;

  // Formateur sélectionné
  instructorSelected:Instructor;

  // Catégorie sélectionné
  categorySelected:Category;
  subCategorySelected:Category;
  categorySelectedForSub:Category;
  categorySelectedId:string='';
  subCategorySelectedId:string='';

  // variable pour la barre de navigation (Formation, Catégorie, Formateur)
  activeTab = 'course';

  instructorValues:Instructor[];
  private instructorSubscription: Subscription;

  categoryValues:Category[];
  subCategoryValues:Category[] = [];
  private categorySubscription: Subscription;

  @ViewChild(InstructorsSelectComponent) instructorsSelectComponent: InstructorsSelectComponent;
  @ViewChild(CategorySelectComponent) categorySelectComponent: CategorySelectComponent;
  @ViewChild(CategorySelectComponent) subCategorySelectComponent: CategorySelectComponent;
  @ViewChild(CategorySelectComponent) categoryForSubSelectComponent: CategorySelectComponent;

  constructor(private formBuilder:FormBuilder,
              private categoryService: CategoryService,
              private instructorService: InstructorService,
              private courseService: CourseService) { 

    this.courseForm = this.formBuilder.group({
      courseTitle: ['',[Validators.required]],
      courseDescription: ['',[Validators.required]],
      coursePrice: ['',[Validators.required]],
      courseSrcLink: ['',[Validators.required]],
    });

    this.categoryForm = this.formBuilder.group({
      categoryName: ['',[Validators.required]],
    });

    this.subcategoryForm = this.formBuilder.group({
      subcategoryName: ['',[Validators.required]],
    });

    this.instructorForm = this.formBuilder.group({
      instructorFirstname: ['',[Validators.required]],
      instructorLastname: ['',[Validators.required]],
      instructorTitle: ['',[Validators.required]],
      instructorBio: ['',[Validators.required]],
      instructorWebSiteLink: ['',[Validators.required]],
    });

  }

  ngOnInit() {
    this.getInstructorsFromService();
    this.getCategoriesFromService();
  }

  ngAfterViewInit() {
    this.courseForm.addControl('instructorsSelectComponent', this.instructorsSelectComponent.instructorSelectForm);
    this.instructorsSelectComponent.instructorSelectForm.setParent(this.courseForm);

    this.courseForm.addControl('categorySelectComponent', this.categorySelectComponent.categorySelectForm);
    this.categorySelectComponent.categorySelectForm.setParent(this.courseForm);

    this.courseForm.addControl('subCategorySelectComponent', this.subCategorySelectComponent.categorySelectForm);
    this.subCategorySelectComponent.categorySelectForm.setParent(this.courseForm);

    this.subcategoryForm.addControl('categoryForSubSelectComponent', this.categoryForSubSelectComponent.categorySelectForm);
    this.categoryForSubSelectComponent.categorySelectForm.setParent(this.subcategoryForm);
  }

  getInstructorsFromService(){

    console.log('getInstructorsFromService');
    
    this.instructorSubscription = this.instructorService.instructorsSubject
    .subscribe(
      (data:Instructor[]) => {

        console.warn(data);
        this.instructorValues = Array.from(data);
      },
      (err: string) => console.error('Observer got an error: ' + err),
      () => {
        console.log('Observer got a complete notification');
      }
    );

    this.instructorService.getInstructorsFromDB();
  }

  getCategoriesFromService(){

    console.log('getCategoriesFromService ItemCategoryFormComponent');

    this.categorySubscription = this.categoryService.categoriesSubject
    .subscribe(
      (data:Category[]) => {

        console.warn(data);
        this.categoryValues = Array.from(data);
        this.categorySelected = this.categoryValues[0];
        this.categorySelectedId = this.categorySelected.id;

        this.subCategorySelected = this.categorySelected.subCategories[0] ? this.categorySelected.subCategories[0] : null;
        this.subCategorySelectedId = this.subCategorySelected ? this.subCategorySelected.id : '';

      },
      (err: string) => console.error('Observer got an error: ' + err),
      () => {
        console.log('Observer got a complete notification');
      }
    );
  }

  selectCategory(event:Category) {
    console.warn('selectCategory', event.name);
    if(event) {
      this.categorySelected = event;
      this.subCategoryValues = this.categorySelected.subCategories;

      this.subCategorySelected = this.subCategoryValues ? this.subCategoryValues[0] : null;
      this.subCategorySelectedId = this.subCategorySelected ? this.subCategorySelected.id : '';
    }
  }

  selectSubCategory(event:Category) {
    console.warn('selectCategory', event.name);
    if(event) {
      this.subCategorySelected = event;
    }
  }

  selectCategoryForSub(event:Category) {
    console.warn('selectCategory', event.name);
    if(event) this.categorySelectedForSub = event;
  }

  selectInstructor(event:Instructor) {
    console.warn('selectInstructor', event.lastname);
    if(event) this.instructorSelected = event;
  }

  displayPanel(activeTab){
    this.activeTab = activeTab;
  }

  onCreateCategory() {

    console.log('onCreateCategory');

    const categoryName = this.categoryForm.get('categoryName').value;

    this.categoryService.saveCategoryToDB(new Category(null, categoryName, []));

  }

  onCreateSubCategory() {

    console.log('onCreateSubCategory');

    const categoryForSub = this.categorySelectedForSub;
    console.warn('categorySelectedForSub', this.categorySelectedForSub);
    const subcategoryName = this.subcategoryForm.get('subcategoryName').value;

    this.categoryService.saveSubCategoryToDB(categoryForSub ,new Category(null, subcategoryName, []));
  }

  onCreateCourse() {

    console.log('onCreateCourse');

    const courseTitle = this.courseForm.get('courseTitle').value;
    const courseCategory = this.categorySelected;
    const courseSubCategory = this.subCategorySelected;
    console.warn('categorySelected', this.categorySelected);
    const courseDescription = this.courseForm.get('courseDescription').value;
    const coursePrice = this.courseForm.get('coursePrice').value;
    const courseInstructor = this.instructorSelected;
    const courseSrcLink = this.courseForm.get('courseSrcLink').value;

    this.courseService.saveNewCourseInDB(new Course(null,
                                                    courseTitle,
                                                    new Category(courseCategory.id, courseCategory.name, [courseSubCategory]),
                                                    courseDescription,
                                                    coursePrice,
                                                    courseInstructor,
                                                    courseSrcLink,
                                                    new Date().getDate().toString(),
                                                    '',
                                                    0,
                                                    '')).then(
                                                      (course) => {
                                                        if(course) {
                                                          // display form values on success
                                                          alert('SUCCESS!! :-)\n\n' + JSON.stringify(course, null, 4));
                                                        }
                                                        else {
                                                          alert('FAILED!! :-(\n\n');
                                                        }
                                                      }
                                                    );

  }

  onCreateInstructor() {


    console.error('onCreateInstructor', this.categorySelectComponent.categorySelected);

    const instructorFirstname = this.instructorForm.get('instructorFirstname').value;
    const instructorLastname = this.instructorForm.get('instructorLastname').value;
    const instructorTitle = this.instructorForm.get('instructorTitle').value;
    const instructorBio = this.instructorForm.get('instructorBio').value;
    const instructorWebSiteLink = this.instructorForm.get('instructorWebSiteLink').value;

    this.instructorService.addNewInstructor(new Instructor(null,
                                                    instructorFirstname,
                                                    instructorLastname,
                                                    instructorTitle,
                                                    instructorBio,
                                                    instructorWebSiteLink,
                                                    [],
                                                    '')).then(
                                                      (val) => {
                                                        if(val) {
                                                          // display form values on success
                                                          alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.instructorForm.value, null, 4));
                                                        }
                                                        else {
                                                          alert('FAILED!! :-(\n\n' + JSON.stringify(this.instructorForm.value, null, 4));
                                                        }
                                                      }
                                                    );

  }

}
