import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as appContainers from './containers';
import * as appComponents from './components';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'employee-list'
    },
    {
        path:'employee-list',
        component:appContainers.EmployeeListComponent
    },
    {
        path:'employee-form',
        component:appContainers.EmployeeFormComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        component:appContainers.EmployeeListComponent
    },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled'
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }