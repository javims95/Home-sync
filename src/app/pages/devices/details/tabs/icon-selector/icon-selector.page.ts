import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { IconComponent } from 'src/app/components/icon/icon.component'
import { extractDeviceIdFromUrl } from 'src/app/utils/url'
import { StorageService } from 'src/app/services/storage/storage.service'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { DeviceIcon } from 'src/app/models/device-icon'

@Component({
    selector: 'app-icon-selector',
    templateUrl: './icon-selector.page.html',
    styleUrls: ['./icon-selector.page.scss'],
    standalone: true,
    imports: [IconComponent, IonicModule, CommonModule],
})
export class IconSelectorPage implements OnInit {
    deviceId: string | null = null
    iconList: string[] = []
    selectedIcon: string | null = null

    constructor(
        private router: Router,
        private storageService: StorageService,
        private http: HttpClient
    ) {
		this.deviceId = extractDeviceIdFromUrl(this.router.url)
	}

    ngOnInit() {
        this.loadIcons()
        this.loadSelectedIcon()
    }

    loadIcons() {
        this.http.get<{ icons: string[] }>('/assets/devices-icons/icons.json').subscribe((data) => {
            this.iconList = data.icons
        })
    }

    async loadSelectedIcon() {
        const savedIcons: DeviceIcon[] = (await this.storageService.getItem('deviceIcons')) || []

        const savedIcon = savedIcons.find((icon) => icon.deviceId === this.deviceId)
        if (savedIcon) {
            this.selectedIcon = savedIcon.icon
        }
    }

    async selectIcon(icon: string) {
        this.selectedIcon = icon
        if (this.deviceId) {
            const savedIcons: DeviceIcon[] =
                (await this.storageService.getItem('deviceIcons')) || []

            const existingIconIndex = savedIcons.findIndex(
                (icon) => icon.deviceId === this.deviceId
            )

            if (existingIconIndex !== -1) {
                savedIcons[existingIconIndex].icon = this.selectedIcon
            } else {
                savedIcons.push({
                    deviceId: this.deviceId,
                    icon: this.selectedIcon,
                })
            }

            await this.storageService.saveItem('deviceIcons', savedIcons)
        }
    }

    handleGoBackButton = () => {
        this.router.navigate([`devices/`])
    }
}
