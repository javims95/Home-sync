import { Injectable } from '@angular/core'
import { Storage } from '@capacitor/storage'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    // Guardar un valor en localStorage con una clave específica
    async saveItem(key: string, value: any): Promise<void> {
        const valueToStore = JSON.stringify(value) // Convertir el valor a JSON antes de almacenarlo
        await Storage.set({
            key,
            value: valueToStore,
        })
    }

    // Recuperar un valor desde localStorage usando una clave
    async getItem<T>(key: string): Promise<T | null> {
        const { value } = await Storage.get({ key })
        return value ? JSON.parse(value) : null // Devolver el valor parseado a su tipo original
    }

    // Eliminar un valor de localStorage
    async removeItem(key: string): Promise<void> {
        await Storage.remove({ key })
    }

    // Limpiar todo el almacenamiento
    async clearStorage(): Promise<void> {
        await Storage.clear()
    }
}
