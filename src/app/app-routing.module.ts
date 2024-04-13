import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    },
    // {
    //     path: 'devices',
    //     loadChildren: () =>
    //         import('./pages/devices/devices.module').then((m) => m.DevicesPageModule),
    // },
    {
        path: 'devices/details/:deviceId',
        loadChildren: () =>
            import('./pages/devices/details/details.module').then((m) => m.DetailsPageModule),
    },
    // {
    //     path: 'tab2',
    //     loadChildren: () =>
    //         import('./pages/tab2/tab2-routing.module').then((m) => m.Tab2PageRoutingModule),
    // },
    // {
    //     path: 'tab3',
    //     loadChildren: () =>
    //         import('./pages/tab3/tab3-routing.module').then((m) => m.Tab3PageRoutingModule),
    // },
]
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
