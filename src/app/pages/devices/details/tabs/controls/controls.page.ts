import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-controls',
    templateUrl: './controls.page.html',
    styleUrls: ['./controls.page.scss'],
})
export class ControlsPage {
    constructor(private router: Router) {}

    handleGoBackButton = () => {
        this.router.navigate([`tabs/devices/`])
    }
}
