import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular';
import { IconComponent } from 'src/app/components/icon/icon.component';
import { removeSessionStorageItem } from 'src/app/utils/storage'

@Component({
    selector: 'app-icon-selector',
    templateUrl: './icon-selector.page.html',
    styleUrls: ['./icon-selector.page.scss'],
	standalone: true,
	imports: [IconComponent, IonicModule],
})
export class IconSelectorPage implements OnInit {
    router: any

    constructor() {}

    ngOnInit() {
		console.log();
	}

    handleGoBackButton = () => {
        removeSessionStorageItem('currentDeviceId')
        this.router.navigate([`devices/`])
    }
}
