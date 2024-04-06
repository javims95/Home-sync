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
                path: 'tab2',
                loadChildren: () => import('./tabs/tab2/tab2.module').then((m) => m.Tab2PageModule),
            },
            {
                path: '',
                redirectTo: 'info',
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
