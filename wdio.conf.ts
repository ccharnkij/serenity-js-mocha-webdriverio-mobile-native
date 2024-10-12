import type { WebdriverIOConfig } from '@serenity-js/webdriverio';
import { join } from 'path';

export const config: WebdriverIOConfig = {
    framework: '@serenity-js/webdriverio',

    serenity: {
        runner: 'mocha',
        crew: [
            '@serenity-js/console-reporter',
            ['@serenity-js/serenity-bdd', { specDirectory: 'test/specs' }],
            // [ '@serenity-js/web:Photographer',      { strategy: 'TakePhotosOfInteractions'    } ],
            // [ '@serenity-js/web:Photographer',   { strategy: 'TakePhotosOfFailures'        } ],
            [
                '@serenity-js/core:ArtifactArchiver',
                { outputDirectory: 'target/site/serenity' },
            ],
        ],
    },

    specs: ['./test/specs/**/*.ts'],

    maxInstances: 1,

    capabilities: [
        {
            hostname: '192.168.1.20',
            port: 4723,
            'appium:udid': 'emulator-5554',
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:app': join(process.cwd(), './app/mda-2.1.0-24.apk'),
            'appium:fullReset': true,
            'appium:appWaitActivity': '.view.activities.MainActivity',
            'appium:appPackage': 'com.saucelabs.mydemoapp.android',
        },
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',

    reporters: ['spec'],

    // Mocha.js configuration
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        reporterOptions: {
            specDirectory: 'test/specs',
        },
    },
};
