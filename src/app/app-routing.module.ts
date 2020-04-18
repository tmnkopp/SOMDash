import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompilerComponent} from './components/compiler/compiler.component'
import { FindComponent} from './components/find/find.component'
const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'compiler', component: CompilerComponent },
  { path: 'find', component: FindComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
