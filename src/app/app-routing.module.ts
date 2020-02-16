import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarterFormComponent } from './starter-form/starter-form.component';
import { QuestionsFormComponent } from './questions-form/questions-form.component';


const routes: Routes = [
  {path:"", redirectTo:"userInfo",pathMatch: "full"},
  {path:"userInfo", component:StarterFormComponent},
  {path:"questions", component:QuestionsFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
