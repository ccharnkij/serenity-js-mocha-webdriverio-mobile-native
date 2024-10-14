import { join } from 'path';

import { config } from './wdio.conf';

config.capabilities = [
    {
        hostname: '127.0.0.1',
        port: 4723,
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 13',
        'appium:platformVersion': '16.2',
        'appium:automationName': 'XCUITest',
        'appium:app': join(process.cwd(), './app/Payload/My Demo App.app'),
        'appium:fullReset': false,
        'appium:noReset': true,
        'appium:showXcodeLog': true,
        'appium:useNewWDA': true
    }
];

config.connectionRetryCount = 0;

export {config} from './wdio.conf';