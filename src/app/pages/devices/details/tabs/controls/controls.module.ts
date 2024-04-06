import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ControlsPageRoutingModule } from './controls-routing.module'

import { ControlsPage } from './controls.page'
import { IconComponent } from 'src/app/components/icon/icon.component'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ControlsPageRoutingModule],
    declarations: [ControlsPage, IconComponent],
})
export class ControlsPageModule {}
