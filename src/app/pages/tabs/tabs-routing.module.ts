import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'
import { DevicesPage } from '../devices/devices.page'
import { Tab2Page } from '../tab2/tab2.page'
import { Tab3Page } from '../tab3/tab3.page'

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'devices',
                component: DevicesPage,
            },
            {
                path: 'tab2',
                component: Tab2Page,
            },
            {
                path: 'tab3',
                component: Tab3Page,
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
