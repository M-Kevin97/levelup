import { ISearchQuery } from './../../modules/shared/models/ISearchQuery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/app/modules/core/router/path.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearchByCategory(categoryName: string) {

    if (categoryName) {

      console.log('onSearchByCategory', categoryName);

      this.router.navigate([Path.RESULTS], { queryParams: { category: categoryName } });
    }
  }

  goToResultsPage(event:ISearchQuery) {
    
    if(event){
      if(event.query){
        this.router.navigate([Path.RESULTS], { 
          queryParams: { 
            q: event.query,
            category: event.category.name
          }
        });
      }
      else {
        this.router.navigate([Path.RESULTS], { 
          queryParams: { 
            category: event.category.name
          }
        });
      }
    }
  }
 
}
