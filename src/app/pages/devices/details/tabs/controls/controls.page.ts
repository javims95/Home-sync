import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { ModalController, IonToggle, IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { IconComponent } from '../../../../../components/icon/icon.component'
import { ConfigSchedule } from 'src/app/models/schedule-simple'
import { SmartThingsService } from 'src/app/services/smart-things/smart-things.service'
import { calculateTimeDifferenceInMinutes, minutesToMilliseconds } from 'src/app/utils/timmer'

@Component({
    selector: 'app-controls',
    templateUrl: './controls.page.html',
    styleUrls: ['./controls.page.scss'],
    standalone: true,
    imports: [IconComponent, IonicModule, FormsModule],
})
export class ControlsPage implements OnInit {
    @ViewChild('toggleRef', { static: false }) toggle?: IonToggle
    // @ViewChild('containerRef', { static: false }) container?: ElementRef
    actionValue: string = 'turnOn'
    timeValue: string = '10'
    showDatetime: boolean = false
    shouldOpenModal: boolean = true
    deviceId: string
    configSchedule: ConfigSchedule
    taskId: string

    constructor(
        private router: Router,
        private modalController: ModalController,
        private smartthingsService: SmartThingsService
    ) {}

    ngOnInit(): void {
        this.deviceId = window.history.state.device.deviceId
    }

    handleGoBackButton = () => {
        this.router.navigate([`tabs/devices/`])
    }

    toggleChanged = async () => {
        if (this.toggle) {
            this.toggle.checked = !this.toggle.checked

            if (this.toggle.checked && this.shouldOpenModal) {
                await this.openModal()
            } else if (!this.toggle.checked) {
                this.shouldOpenModal = true
                await this.cancelScheduledTask() // Hay que almacenar y enviar el taskId
            }
        }
    }

    containerClicked = async () => {
        if (this.toggle && this.toggle.checked) {
            this.shouldOpenModal = true
            await this.cancelScheduledTask() // Hay que almacenar y enviar el taskId
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

    cancel() {
        this.modalController.dismiss(null, 'cancel')
        if (this.toggle) {
            this.toggle.checked = false
        }
        // Resetear valores
        this.showDatetime = false
        this.timeValue = '10'
    }

    confirm() {
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
                console.log(this.taskId)
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
            } catch (error) {
                console.error('Error al cancelar la tarea', error)
            }
        }
    }

    handleRadioChange(event: CustomEvent) {
        if (event.detail.value === 'custom') {
            // Mostrar el elemento de fecha y hora personalizado
            this.showDatetime = true
        } else {
            // Ocultar el elemento de fecha y hora personalizado
            this.showDatetime = false
        }
    }

    // NO FUNCIONA BIEN, CUANDO SE PROGRAMA SE ENCIENDE INMEDIATAMENTE
    handleDatetimeChange(event: CustomEvent) {
        // Actualizar el valor de customTime cuando cambia la fecha y hora personalizada
        this.timeValue = calculateTimeDifferenceInMinutes(event.detail.value)
        console.log(this.timeValue) // Asegúrate de que customTime tenga un valor asignado
    }
}
