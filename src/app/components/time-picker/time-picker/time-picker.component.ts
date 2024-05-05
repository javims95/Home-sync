import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class TimePickerComponent {
    hours: number[] = Array.from({ length: 25 }, (_, i) => i) // Array from 0 to 24

    selectedRange: number[] = []
    selectingRange = false

    selectHour(hour: number) {
        if (!this.selectingRange) {
            this.selectedRange = [hour]
            this.selectingRange = true
        } else {
            const startHour = this.selectedRange[0]
            const endHour = hour
            this.selectedRange = this.range(startHour, endHour + 1)
            this.selectingRange = false
        }
    }

    // Función para generar un rango de números entre dos valores
    range(start: number, end: number): number[] {
        return Array.from({ length: end - start }, (_, i) => start + i)
    }
}
