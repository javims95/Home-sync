import { Component, Input, OnInit } from '@angular/core'
import { NgIf } from '@angular/common'
import { PowerSwitchComponent } from '../power-switch/power-switch.component'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: true,
    imports: [IonicModule, PowerSwitchComponent, NgIf],
})
export class CardComponent {
    @Input() device: any
    @Input() index: number

    constructor() {
        this.index = 0
    }
}
