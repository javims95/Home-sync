export interface Device {
    deviceId: string
    name: string
    label: string
    manufacturerName: string
    presentationId: string
    deviceManufacturerCode: string
    locationId: string
    ownerId: string
    components: Component[]
    createTime: string
    profile: {
        id: string
    }
    viper: Viper
    type: string
    restrictionTier: number
    allowed: any[]
    executionContext: string
    status?: string
    currentTVContent?: string
    deviceTypeName?: string
}

interface Component {
    id: string
    label: string
    capabilities: Capability[]
    categories: Category[]
}

interface Capability {
    id: string
    version: number
}

interface Category {
    name: string
    categoryType: string
}

interface Viper {
    uniqueIdentifier: string
    manufacturerName: string
    modelName: string
    swVersion: string
    hwVersion: string
    endpointAppId: string
}

export interface DevicesResponse {
    items: Device[]
    _links: {}
}
