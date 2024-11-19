import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { uuidv4 } from 'src/app/utils/uuidv4'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class GoveeService {
    constructor(private http: HttpClient) {}

    getAllDevices = async () => {
        const response = await fetch(`${environment.GOVEE_API_BASE_URL}/devices`)
        if (!response.ok) {
            throw new Error('No se pudo obtener los dispositivos')
        }
        return await response.json()
    }

    getDeviceStatus = (sku: string, deviceId: string): Observable<any> => {
        const payload = {
            requestId: uuidv4(),
            payload: {
                sku,
                device: deviceId,
            },
        }
        return this.http.post<any>(`${environment.GOVEE_API_BASE_URL}/devices/status`, payload)
    }
}
