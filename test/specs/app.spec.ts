import 'mocha'

import { Ensure, isPresent } from '@serenity-js/assertions'
import { actorCalled, Duration } from '@serenity-js/core'
import { By, Click, isVisible, PageElement } from '@serenity-js/web'
import { BrowseTheWebWithWebdriverIO } from '@serenity-js/webdriverio';

import { PatchedWebdriverIOBrowsingSession } from '../serenity/abilities/PatchedWebdriverIOBrowsingSession';
import CartScreen from '../serenity/screens/CartScreen'
import HomeScreen from '../serenity/screens/HomeScreen'

describe('serenity-js Android & iOS app', () => {

    afterEach(async function() {
        await browser.reloadSession();
    })

    /**
     * This passes. Wrapping webdriverio with Interaction
     */
    it('uses WebdriverIO and should pass', async () => {
        await actorCalled('Alice')
            .attemptsTo(
                HomeScreen.clicksFirstItem(),
                CartScreen.expectGoShoppingButtonDisplayed()
            )
    })

    /**
     * This fails. Error because SerenityJS tries to call getWindowHandle but this function
     * does not exist for Appium
     */
    it(`uses SerenityJS and should fail due to function mapping error`, async () => {
        await actorCalled('Alice')
            .whoCan(new BrowseTheWebWithWebdriverIO(new PatchedWebdriverIOBrowsingSession(browser)))
            .attemptsTo(
                // todo: element.scrollIntoView() is not available in Appium; we'll need an isMobile guard
                // Click.on(browser.isAndroid ?
                //     PageElement.located(By.css('~Displays number of items in your cart')) :
                //     PageElement.located(By.css('~Cart-tab-item'))),
                (browser.isAndroid ?
                    PageElement.located(By.css('~Displays number of items in your cart')) :
                    PageElement.located(By.css('~Cart-tab-item'))).click(),


                Ensure.eventually(
                    browser.isAndroid ?
                        PageElement.located(By.css('android=new UiSelector().text("Go Shopping")')) :
                        PageElement.located(By.css('~GoShopping')),
                    isPresent(),
                    // todo: isVisible is not available in Appium, as it relies on isElementDisplayed that hasn't been implemented for Appium elements
                    // isVisible()
                )
                .timeoutAfter(Duration.ofSeconds(5))
            )
    })
})
