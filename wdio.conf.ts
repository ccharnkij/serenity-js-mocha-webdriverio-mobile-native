import type { WebdriverIOConfig } from '@serenity-js/webdriverio';

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
            'appium:app': 'C:/Users/Admin/Desktop/mda-2.1.0-24.apk',
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

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
    // onPrepare: function (config, capabilities) {
    // },
    /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
    // before: function (capabilities, specs) {
    // },
    /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
    // beforeCommand: function (commandName, args) {
    // },
    /**
   * Cucumber Hooks
   *
   * Runs before a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
    // beforeFeature: function (uri, feature) {
    // },
    /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world world object containing information on pickle and test step
   */
    // beforeScenario: function (world) {
    // },
    /**
   *
   * Runs before a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   */
    // beforeStep: function (step, scenario) {
    // },
    /**
   *
   * Runs after a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   * @param {Object}             result   results object containing scenario results
   * @param {boolean}            result.passed   true if scenario has passed
   * @param {string}             result.error    error stack if scenario failed
   * @param {number}             result.duration duration of scenario in milliseconds
   */
    // afterStep: function (step, scenario, result) {
    // },
    /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world  world object containing information on pickle and test step
   * @param {Object}                 result results object containing scenario results
   * @param {boolean}                result.passed   true if scenario has passed
   * @param {string}                 result.error    error stack if scenario failed
   * @param {number}                 result.duration duration of scenario in milliseconds
   */
    // afterScenario: function (world, result) {
    // },
    /**
   *
   * Runs after a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
    // afterFeature: function (uri, feature) {
    // },

    /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
    // after: function (result, capabilities, specs) {
    // },
    /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
    //onReload: function(oldSessionId, newSessionId) {
    //}
};
