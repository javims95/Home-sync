import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.home.sync',
    appName: 'home-sync',
    webDir: 'www',
    server: {
        androidScheme: 'https',
    },
    plugins: {
        LocalNotifications: {
            iconColor: '#488AFF',
        },
    },
}

export default config
