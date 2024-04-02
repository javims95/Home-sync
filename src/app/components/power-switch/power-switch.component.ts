import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-power-switch',
    templateUrl: './power-switch.component.html',
    styleUrls: ['./power-switch.component.scss'],
})
export class PowerSwitchComponent implements OnInit {
    @Input() index: number = 0
    @Input() checked: boolean = false

    constructor() {}

    ngOnInit() {
        console.log()
    }
}
