import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    },
    {
        path: 'devices/details/:deviceId',
        loadChildren: () =>
            import('./pages/devices/details/details.module').then((m) => m.DetailsPageModule),
    },
]
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
