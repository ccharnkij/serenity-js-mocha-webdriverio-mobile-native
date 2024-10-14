import 'mocha'

import { Ensure } from '@serenity-js/assertions'
import { actorCalled, Duration } from '@serenity-js/core'
import { By, Click, isVisible, PageElement } from '@serenity-js/web'

import CartScreen from '../serenity/screens/CartScreen'
import HomeScreen from '../serenity/screens/HomeScreen'
import { BrowseTheWebWithWebdriverIO } from '@serenity-js/webdriverio';
import { PatchedWebdriverIOBrowsingSession } from '../serenity/abilities/PatchedWebdriverIOBrowsingSession';

describe('serenity-js Android & iOS app', () => {

    afterEach(async function() {
        await browser.reloadSession();
    })

    /**
     * This passes. Wrapping webdriverio with Interaction
     */
    it('uses WebdriverIO and should pass', async () => {
        await actorCalled('Alice')
            .whoCan(new BrowseTheWebWithWebdriverIO(new PatchedWebdriverIOBrowsingSession(browser)))
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
        await actorCalled('Alice').attemptsTo(
            Click.on(browser.isAndroid ?
                PageElement.located(By.css('~Displays number of items in your cart')) :
                PageElement.located(By.css('~Cart-tab-item'))),
            Ensure.eventually(browser.isAndroid ?
                PageElement.located(By.css('android=new UiSelector().text("Go Shopping")')) :
                PageElement.located(By.css('~GoShopping')), isVisible())
            .timeoutAfter(Duration.ofSeconds(5))
        )

    })
})
