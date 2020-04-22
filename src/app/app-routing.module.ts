import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashComponent} from './dash/dash.component';
import {MeetComponent} from './meet/meet.component';


const routes: Routes = [
  {
    path: 'dash',
    component: DashComponent
  },
  {
    path: 'meet',
    component: MeetComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'meet'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
