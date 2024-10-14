import { join } from 'path';

import { config } from './wdio.conf';

config.capabilities = [
    {
        hostname: '127.0.0.1',
        port: 4723,
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 13',
        'appium:automationName': 'XCUITest',
        'appium:app': join(process.cwd(), './app/Payload/My Demo App.app'),
        'appium:fullReset': true,
        'appium:showXcodeLog': true,
    }
];

export {config} from './wdio.conf';