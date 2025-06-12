import { Routes } from '@angular/router';
import { EnqueteListComponent} from './components/enquete-list/enquete-list';
import { EnqueteDetailComponent } from './components/enquete-detail/enquete-detail';
import { EnqueteFormComponent } from './components/enquete-form/enquete-form';

export const routes: Routes = [
  { path: '', component: EnqueteListComponent },
  { path: 'enquetes/nova', component: EnqueteFormComponent },
  { path: 'enquetes/:id', component: EnqueteDetailComponent }
];
