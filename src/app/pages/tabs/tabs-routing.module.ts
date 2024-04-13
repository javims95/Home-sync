import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'devices',
                loadChildren: () =>
                    import('../../pages/devices/devices-routing.module').then(
                        (m) => m.DevicesPageRoutingModule
                    ),
            },
            {
                path: 'tab2',
                loadChildren: () =>
                    import('../tab2/tab2-routing.module').then((m) => m.Tab2PageRoutingModule),
            },
            {
                path: 'tab3',
                loadChildren: () => import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
            },
            {
                path: '',
                redirectTo: '/devices',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/devices',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
