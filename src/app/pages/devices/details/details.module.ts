import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { DetailsPageRoutingModule } from './details-routing.module'

import { DetailsPage } from './details.page'
import { IconComponent } from 'src/app/components/icon/icon.component'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, DetailsPageRoutingModule],
    declarations: [DetailsPage, IconComponent],
})
export class DetailsPageModule {}
