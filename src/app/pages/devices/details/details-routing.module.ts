import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DetailsPage } from './details.page'

const routes: Routes = [
    {
        path: '',
        component: DetailsPage,
        children: [
            {
                path: 'controls',
                loadChildren: () =>
                    import('./tabs/controls/controls.module').then((m) => m.ControlsPageModule),
            },
            {
                path: 'routines',
                loadChildren: () => import('./tabs/routines/routines.module').then( m => m.RoutinesPageModule)
            },
            {
                path: '',
                redirectTo: 'controls',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: 'controls',
        loadChildren: () =>
            import('./tabs/controls/controls.module').then((m) => m.ControlsPageModule),
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DetailsPageRoutingModule {}
