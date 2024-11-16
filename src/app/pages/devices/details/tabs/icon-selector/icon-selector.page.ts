import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { IconComponent } from 'src/app/components/icon/icon.component'
import { removeSessionStorageItem } from 'src/app/utils/storage'
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
    ) {}

    ngOnInit() {
        this.deviceId = extractDeviceIdFromUrl(this.router.url)
        this.loadIcons()
        this.loadSelectedIcon()
    }

    loadIcons() {
        this.http.get<{ icons: string[] }>('/assets/devices-icons/icons.json').subscribe((data) => {
            this.iconList = data.icons
        })
    }

    // Cargar el icono seleccionado si existe para el dispositivo actual
    async loadSelectedIcon() {
        const savedIcons: DeviceIcon[] = (await this.storageService.getItem('deviceIcons')) || []

        const savedIcon = savedIcons.find((icon) => icon.deviceId === this.deviceId)
        if (savedIcon) {
            this.selectedIcon = savedIcon.icon
        }
    }

    // Seleccionar un icono y guardarlo en el almacenamiento local
    async selectIcon(icon: string) {
        this.selectedIcon = icon
        if (this.deviceId) {
            // Obtener el array de iconos guardados
            const savedIcons: DeviceIcon[] =
                (await this.storageService.getItem('deviceIcons')) || []

            // Buscar si ya existe un icono para este dispositivo
            const existingIconIndex = savedIcons.findIndex(
                (icon) => icon.deviceId === this.deviceId
            )

            if (existingIconIndex !== -1) {
                // Si existe, actualizar el icono
                savedIcons[existingIconIndex].icon = this.selectedIcon
            } else {
                // Si no existe, agregar uno nuevo
                savedIcons.push({
                    deviceId: this.deviceId,
                    icon: this.selectedIcon,
                })
            }

            // Guardar el array de iconos actualizado
            await this.storageService.saveItem('deviceIcons', savedIcons)
        }
    }

    handleGoBackButton = () => {
        this.router.navigate([`devices/`])
    }
}
