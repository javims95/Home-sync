import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ModalController, IonToggle } from '@ionic/angular'

@Component({
    selector: 'app-controls',
    templateUrl: './controls.page.html',
    styleUrls: ['./controls.page.scss'],
})
export class ControlsPage {
    @ViewChild('toggleRef', { static: false }) toggle?: IonToggle
    actionValue: string = 'turnOn'
    timeValue: string = '10'
    shouldOpenModal: boolean = true // Control para determinar si se debe abrir la modal

    constructor(
        private router: Router,
        private modalController: ModalController
    ) {}

    handleGoBackButton = () => {
        this.router.navigate([`tabs/devices/`])
    }

    toggleChanged = async () => {
        if (this.toggle) {
            this.toggle.checked = !this.toggle.checked

            if (this.toggle.checked && this.shouldOpenModal) {
                await this.openModal()
            } else if (!this.toggle.checked) {
                this.shouldOpenModal = true // Resetear el control para la próxima vez que se active
            }
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

        // Desactivar el toggle
        if (this.toggle) {
            this.toggle.checked = false
        }
    }

    confirm() {
        this.modalController.dismiss(null, 'confirm')
        this.shouldOpenModal = false // Desactivar el control para la próxima vez que se active
        console.log(this.actionValue, this.timeValue)
    }

    onWillDismiss(event: Event) {
        // Tu lógica aquí
    }
}
