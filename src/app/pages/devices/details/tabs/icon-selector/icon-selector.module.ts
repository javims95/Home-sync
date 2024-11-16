import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { IconSelectorPageRoutingModule } from './icon-selector-routing.module'
import { IconSelectorPage } from './icon-selector.page'
import { IconComponent } from 'src/app/components/icon/icon.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IconSelectorPageRoutingModule,
        IconSelectorPage,
        IconComponent,
    ],
})
export class IconSelectorPageModule {}
