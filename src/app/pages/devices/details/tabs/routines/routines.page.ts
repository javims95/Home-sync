import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonToggle, IonicModule, ModalController } from '@ionic/angular';
import { IconComponent } from 'src/app/components/icon/icon.component';
import { TimePickerComponent } from 'src/app/components/time-picker/time-picker.component';
import { ConfigSchedule } from 'src/app/models/schedule-simple';
import { DeviceAction, DeviceStatus } from 'src/app/models/smart-things.model';
import { GlobalStateService } from 'src/app/services/global-state/global-state.service';
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service';
import { deleteCookie, getCookie, getSessionStorageItem, removeSessionStorageItem, setCookie } from 'src/app/utils/storage';
import { calculateTimeDifferenceInMinutes, minutesToMilliseconds } from 'src/app/utils/timmer';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.page.html',
  styleUrls: ['./routines.page.scss'],
  standalone: true,
  imports: [IconComponent, IonicModule, FormsModule, TimePickerComponent],
})
export class RoutinesPage implements OnInit, AfterViewInit {

    @ViewChild('toggleRef', { static: false }) toggle?: IonToggle
    actionValue: DeviceAction
    timeValue: string = '10'
    showDatetime: boolean = false
    shouldOpenModal: boolean = true
    deviceId: string
    configSchedule: ConfigSchedule
    taskId: string

    constructor(
        private router: Router,
        private modalController: ModalController,
        private smartthingsService: SmartThingsService,
        private globalStateService: GlobalStateService
    ) {}

    ngOnInit(): void {
        this.deviceId = getSessionStorageItem('currentDeviceId')
        this.globalStateService.getDeviceById(this.deviceId).status === DeviceStatus.on
            ? (this.actionValue = DeviceAction.apagar)
            : (this.actionValue = DeviceAction.encender)
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
            const modalElement = document.querySelector('.routines-container ion-modal') as HTMLIonModalElement
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
        this.timeValue = calculateTimeDifferenceInMinutes(event.detail.value)
    }

}
