import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { IconComponent } from './icon.component'

describe('IconComponent', () => {
    let component: IconComponent
    let fixture: ComponentFixture<IconComponent>

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), IconComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(IconComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
