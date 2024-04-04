import { TestBed } from '@angular/core/testing'

import { GoveeService } from './govee.service'

describe('GoveeService', () => {
    let service: GoveeService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(GoveeService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
