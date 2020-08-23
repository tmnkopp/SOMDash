import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompilerComponent} from './components/compiler/compiler.component'
import { ScaffoldComponent} from './components/scaffold/scaffold.component'
const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'compiler', component: CompilerComponent },
  { path: 'scaffold', component: ScaffoldComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
