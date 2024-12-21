export interface Devices {
    deviceId: string
    name: string
    label: string
    manufacturerName: string
    presentationId: string
    deviceManufacturerCode: string
    locationId: string
    ownerId: string
    roomId: string
    components: Component[]
    createTime: Date
    profile: Profile
    viper: Viper
    type: string
    restrictionTier: number
    allowed: any[]
    executionContext: string
}

export interface Component {
    id: string
    label: string
    capabilities: Capability[]
    categories: Category[]
}

export interface Capability {
    id: string
    version: number
}

export interface Category {
    name: string
    categoryType: string
}

export interface Profile {
    id: string
}

export interface Viper {
    uniqueIdentifier: string
    manufacturerName: string
    modelName: string
    swVersion: string
    hwVersion: string
    endpointAppId: string
}
