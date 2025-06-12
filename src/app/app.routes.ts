import { Routes } from '@angular/router';
import { EnqueteListComponent} from './components/enquete-list/enquete-list';
import { EnqueteDetailComponent } from './components/enquete-detail/enquete-detail';

export const routes: Routes = [
  { path: '', component: EnqueteListComponent },
  { path: 'enquetes/:id', component: EnqueteDetailComponent }
];
