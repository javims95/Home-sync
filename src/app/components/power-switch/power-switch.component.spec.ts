import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { PowerSwitchComponent } from './power-switch.component'

describe('PowerSwitchComponent', () => {
    let component: PowerSwitchComponent
    let fixture: ComponentFixture<PowerSwitchComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PowerSwitchComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents()

        fixture = TestBed.createComponent(PowerSwitchComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
