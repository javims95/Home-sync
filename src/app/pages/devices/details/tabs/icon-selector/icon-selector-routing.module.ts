import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { IconSelectorPage } from './icon-selector.page'

const routes: Routes = [
    {
        path: '',
        component: IconSelectorPage,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IconSelectorPageRoutingModule {}
