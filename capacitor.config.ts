import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.home.sync',
  appName: 'home-sync',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
