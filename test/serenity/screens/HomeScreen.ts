import { Actor, Interaction } from '@serenity-js/core'

class HomeScreen {
    
    get cart() {
        return $('~Displays number of items in your cart');
    }

    clicksFirstItem = (): Interaction =>
        Interaction.where('#actor clicks the cart', async (actor: Actor) => {
            await this.cart.waitForDisplayed({ timeout: 15000 });
            await this.cart.click();
        })
}

export default new HomeScreen();