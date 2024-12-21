import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ModalController, IonToggle, IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { IconComponent } from '../../../../../components/icon/icon.component'
import { ConfigSchedule } from 'src/app/models/schedule-simple'
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service'
import { calculateTimeDifferenceInMinutes, minutesToMilliseconds } from 'src/app/utils/timmer'
import { DeviceAction, DeviceStatus } from 'src/app/models/smart-things.model'
import { deleteCookie, getCookie, getSessionStorageItem, removeSessionStorageItem, setCookie } from 'src/app/utils/storage'
import { GlobalStateService } from 'src/app/services/global-state/global-state.service'
import { extractDeviceIdFromUrl } from 'src/app/utils/url'
import { StorageService } from 'src/app/services/storage/storage.service'

@Component({
    selector: 'app-controls',
    templateUrl: './controls.page.html',
    styleUrls: ['./controls.page.scss'],
    standalone: true,
    imports: [IconComponent, IonicModule, FormsModule],
})
export class ControlsPage implements OnInit, AfterViewInit {
    @ViewChild('toggleRef', { static: false }) toggle?: IonToggle
    actionValue: DeviceAction
    timeValue: string = '10'
    timeObjInfo = { hours: '00', minutes: '00' }
    showDatetime: boolean = false
    shouldOpenModal: boolean = true
    deviceId: string
    deviceName: string = ''
    configSchedule: ConfigSchedule
    taskId: string

    constructor(
        private router: Router,
        private modalController: ModalController,
        private smartthingsService: SmartThingsService,
        private globalStateService: GlobalStateService,
        private storageService: StorageService
    ) {
        this.deviceId = extractDeviceIdFromUrl(this.router.url)
    }

    async ngOnInit(): Promise<void> {
        this.deviceName = await this.storageService.getItem('currentDeviceName')
        this.globalStateService.getDeviceById(this.deviceId)?.status === DeviceStatus.on ? (this.actionValue = DeviceAction.apagar) : (this.actionValue = DeviceAction.encender)
    }

    ngAfterViewInit(): void {
        getCookie(this.deviceId, 'Simple') && (this.toggle.checked = true)
    }

    handleGoBackButton = () => {
        removeSessionStorageItem('currentDeviceId')
        this.router.navigate([`devices/`])
    }

    toggleChanged = async () => {
        if (this.toggle) {
            this.toggle.checked = !this.toggle.checked

            if (this.toggle.checked && this.shouldOpenModal) {
                await this.openModal()
            } else if (!this.toggle.checked) {
                this.shouldOpenModal = true
                await this.cancelScheduledTask()
            }
        }
    }

    containerClicked = async () => {
        if (this.toggle && this.toggle.checked) {
            this.shouldOpenModal = true
            await this.cancelScheduledTask()
        }
    }

    openModal = async () => {
        const modal = await this.modalController.getTop()
        if (modal) {
            modal.dismiss()
        } else {
            const modalElement = document.querySelector('ion-modal')
            if (modalElement) {
                modalElement.componentOnReady().then(() => {
                    modalElement.present()
                })
            }
        }
    }

    cancel = () => {
        this.modalController.dismiss(null, 'cancel')
        if (this.toggle) {
            this.toggle.checked = false
        }
        // Resetear valores
        this.showDatetime = false
        this.timeValue = '10'
    }

    confirm = () => {
        this.modalController.dismiss(null, 'confirm')
        this.shouldOpenModal = false
        this.configSchedule = {
            deviceId: this.deviceId,
            action: this.actionValue,
            delay: minutesToMilliseconds(this.timeValue),
        }
        this.smartthingsService
            .scheduleSimpleDevice(this.configSchedule)
            .then((resp) => {
                this.taskId = resp.taskId
                setCookie(this.deviceId, 'Simple', this.timeValue)
            })
            .catch((error) => {
                console.log('Error al programar el dispositivo ', error)
                if (this.toggle) {
                    this.toggle.checked = false
                }
            })
    }

    cancelScheduledTask = async () => {
        if (this.taskId) {
            try {
                await this.smartthingsService.cancelScheduledTask(this.taskId)
                console.log('Tarea cancelada con éxito')
                this.taskId = ''
                deleteCookie(this.deviceId, 'Simple')
            } catch (error) {
                console.error('Error al cancelar la tarea', error)
            }
        }
    }

    handleRadioChange = (event: CustomEvent) => {
        if (event.detail.value === 'custom') {
            this.showDatetime = true
        } else {
            this.showDatetime = false
        }
    }

    handleDatetimeChange = (event: CustomEvent) => {
        const date = new Date(event.detail.value)

        // Extrae las horas y los minutos
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        this.timeObjInfo = { hours, minutes }
        this.timeValue = calculateTimeDifferenceInMinutes(event.detail.value)
    }
}
