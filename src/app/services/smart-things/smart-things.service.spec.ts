import { TestBed } from '@angular/core/testing'

import { SmartThingsService } from './smart-things.service'

describe('SmartThingsService', () => {
    let service: SmartThingsService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(SmartThingsService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
