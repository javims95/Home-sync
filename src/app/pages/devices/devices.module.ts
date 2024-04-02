import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { DevicesPageRoutingModule } from './devices-routing.module'

import { DevicesPage } from './devices.page'
import { CardComponent } from 'src/app/components/card/card.component'
import { PowerSwitchComponent } from 'src/app/components/power-switch/power-switch.component'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, DevicesPageRoutingModule],
    declarations: [DevicesPage, CardComponent, PowerSwitchComponent],
})
export class DevicesPageModule {}
