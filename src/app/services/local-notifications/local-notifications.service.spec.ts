import { TestBed } from '@angular/core/testing'

import { NotificationsService } from './local-notifications.service'

describe('NotificationsService', () => {
    let service: NotificationsService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(NotificationsService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
