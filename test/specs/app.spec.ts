import 'mocha'

import { Ensure } from '@serenity-js/assertions'
import { actorCalled, Duration } from '@serenity-js/core'
import { By, Click, isVisible, PageElement } from '@serenity-js/web'

import CartScreen from '../serenity/screens/CartScreen'
import HomeScreen from '../serenity/screens/HomeScreen'

describe('serenity-js Android app', () => {

    afterEach(async function() {
        await browser.reloadSession();
    })

    /**
     * This passes. Wrapping webdriverio with Interaction
     */
    it('offers a web testing tutorial', async () => {
        await actorCalled('Alice').attemptsTo(
            HomeScreen.clicksFirstItem(),
            CartScreen.expectGoShoppingButtonDisplayed()
        )
    })

    /**
     * This fails. Error because SerenityJS tries to call getWindowHandle but this function
     * does not exist for Appium
     */
    it(`offers examples to help you practice test automation`, async () => {
        await actorCalled('Alice').attemptsTo(
            Click.on(PageElement.located(By.css('~Displays number of items in your cart'))),
            Ensure.eventually(PageElement.located(By.css('android=new UiSelector().text("Go Shopping")')), isVisible())
            .timeoutAfter(Duration.ofSeconds(5))
        )

    })
})
