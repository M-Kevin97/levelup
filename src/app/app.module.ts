import { AdministratorComponent } from './pages/administrator/administrator.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { AppRoutingRoutes } from './app-routing.routing';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    SearchComponent,
    AdministratorComponent
   ],
  imports: [
    CoreModule,
    AppRoutingRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
