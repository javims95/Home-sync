import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { DevicesPage } from './pages/devices/devices.page'
import { DetailsPage } from './pages/devices/details/details.page'
import { ControlsPage } from './pages/devices/details/tabs/controls/controls.page'
import { IconSelectorPage } from './pages/devices/details/tabs/icon-selector/icon-selector.page'
import { RoutinesPage } from './pages/devices/details/tabs/routines/routines.page'

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    },
    {
        path: 'devices',
        component: DevicesPage,
    },
    {
        path: 'devices/details/:deviceId',
        component: DetailsPage,
        children: [
            {
                path: 'controls',
                component: ControlsPage,
            },
            {
                path: 'routines',
                component: RoutinesPage,
            },
            {
                path: 'icon-selector',
                component: IconSelectorPage,
            },
            {
                path: '',
                redirectTo: 'controls',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
]
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
