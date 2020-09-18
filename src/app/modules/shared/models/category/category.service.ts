import { Database } from 'src/app/modules/shared/database/database.enum';
import { Category } from './category';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];

  categoriesSubject = new Subject<Category[]>();

  constructor() { }

  // Methode servant à emettre les categories du service
  emitCategories(){
    this.categoriesSubject.next(this.categories);
  }

  // Methode permettant d'enregistrer une liste de categories dans la DB, pour l'administrateur
  saveCategoriesToDB(){

    firebase.database().ref(Database.CATEGORIES).push();
  }

   // Methode permettant d'enregistrer une categorie dans la DB, pour l'administrateur
   saveCategoryToDB(newCategory:Category){

    const ref = firebase.database().ref(Database.CATEGORIES);
    const categoryId = ref.push().key;

    ref.child(categoryId).set({
      name: newCategory.name
    }).then(
      ()=>{
        this.categories.push(newCategory);
      }
    );
  }

  // Methode permettant d'enregistrer une categorie dans la DB, pour l'administrateur
  saveSubCategoryToDB(category:Category, newSubCategory:Category){

    const ref = firebase.database().ref(Database.CATEGORIES)
                                   .child(category.id)
                                   .child(Database.SUB_CATEGORY);

    const subCategoryId = ref.push().key;

    ref.child(subCategoryId).set({
      name: newSubCategory.name
    });
  }

  // Methode permettant de créer une nouvelle catégorie -- pour l'administrateur
  createNewCategory(newCategory:Category){

    this.categories.push(newCategory);
    this.saveCategoriesToDB();
    this.emitCategories();
  }

  getCategoriesFromDB(){
    
    console.log('getCategoriesFromDB CategoryService');

    return firebase.database().ref(Database.CATEGORIES).once('value').then( 
      (data) => {
        console.warn('getCategoriesFromDB CategoryService', data);
        let catArray = [];
        data.forEach((element) => {
          console.log(element.key, element.child('name').val());

          let subCatArray = [];
          element.child('sub_categories').forEach((subElement) => {
              console.log(element.key, subElement.child('name').val());

              subCatArray.push(new Category(subElement.key, 
                                            subElement.child('name').val(), 
                                            []));

              console.warn('sub category subCatArray :', subCatArray);

          });

          catArray.push(new Category(element.key, 
                                     element.child('name').val(), 
                                     subCatArray));
        });

        this.categories = Array.from(catArray);
        
        this.emitCategories();
        console.log(data.val());

        return Array.from(this.categories);
      }
    );
  }

  getSingleCategoryFromDB(id:number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(Database.CATEGORIES+id).once('value').then(
          (data) => {
              resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  setValueOfSingleCategoryFromDB(id:number, value:string){
    firebase.database().ref(Database.CATEGORIES+id).set({
      value: value,
    }, function(error) {
      if (error) {
        // The write failed...
      } else {
        // Data saved successfully!
      }
    });
  }

  removeCategory(category:Category){
    const itemIndexToRemove = this.categories.findIndex(
      (categoryEl) => {
        if(categoryEl === category) {
          return true;
        }
      }
    );

    this.categories.splice(itemIndexToRemove, 1);
    this.saveCategoriesToDB();
    this.emitCategories();
  }


  /**
   * Cette method permet d'enregistrer une categorie dans la base de données,
   * avec la ref (le lieu de d'enregistrement) et la categorie (Category)
   */
  public static saveCategoryWithReference(ref:firebase.database.Reference, category:Category){

    return ref.child(Database.CATEGORY).child(category.id).set({
      name:category.name
    }).then(
      () => {
        return ref.child(Database.CATEGORY).child(category.id).child('sub_category')
                                                              .child(category.subCategories[0].id)
                                                              .set({
          name:category.subCategories[0].name
        });
    }).catch(function(error) {
      console.log(error);
        return false;
    });
  }
}