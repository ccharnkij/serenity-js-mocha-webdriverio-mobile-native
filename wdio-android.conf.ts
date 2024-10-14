import { join } from 'path';

import { config } from './wdio.conf';

config.capabilities = [
    {
        hostname: '127.0.0.1',
        port: 4723,
        'appium:udid': 'emulator-5554',
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:app': join(process.cwd(), './app/mda-2.1.0-24.apk'),
        'appium:fullReset': true,
        'appium:appWaitActivity': '.view.activities.MainActivity',
        'appium:appPackage': 'com.saucelabs.mydemoapp.android',
    }
];

export {config} from './wdio.conf';