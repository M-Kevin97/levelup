import { AdministratorComponent } from './pages/administrator/administrator.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { Path } from './modules/core/router/path.enum';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:Path.HOME.substr(1,Path.HOME.length), component:HomeComponent},
  {path:Path.RESULTS.substr(1,Path.RESULTS.length), component:SearchComponent},
  {path:Path.SEARCH.substr(1,Path.SEARCH.length), component:SearchComponent},
  {path:Path.ADMIN.substr(1,Path.ADMIN.length), component:AdministratorComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'**', component:PageNotFoundComponent}
];

export const AppRoutingRoutes = RouterModule.forRoot(routes, 
                                                    {anchorScrolling: 'enabled',
                                                    onSameUrlNavigation: 'reload',
                                                     preloadingStrategy: PreloadAllModules });
