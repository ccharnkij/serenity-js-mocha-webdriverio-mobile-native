import { Actor, Interaction } from '@serenity-js/core'

class CartScreen {
    
    get goShoppingButton() {
        return browser.isAndroid ? $('android=new UiSelector().text("Go Shopping")') : $('~GoShopping');
    }

    expectGoShoppingButtonDisplayed = (): Interaction =>
        Interaction.where('#actor expects the button to be displayed', async (actor: Actor) => {
            await expect(await this.goShoppingButton).toBeDisplayed({ wait: 5000});
        })
}

export default new CartScreen();