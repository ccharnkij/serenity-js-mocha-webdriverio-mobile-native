/* eslint-disable unicorn/filename-case */
import { CorrelationId } from '@serenity-js/core/lib/model';
import { WebdriverIOBrowsingSession, WebdriverIOPage } from '@serenity-js/webdriverio';
import { WebdriverIOErrorHandler } from '@serenity-js/webdriverio/lib/screenplay/models/WebdriverIOErrorHandler';
import {
    WebdriverIOModalDialogHandler
} from '@serenity-js/webdriverio/lib/screenplay/models/WebdriverIOModalDialogHandler';

export class PatchedWebdriverIOBrowsingSession extends WebdriverIOBrowsingSession {

    override async currentPage(): Promise<WebdriverIOPage> {
        if (! this.browser.isMobile) {
            return super.currentPage();
        }

        const actualCurrentPageId = await this.assignPageId();

        if (this.currentBrowserPage && this.currentBrowserPage.id.equals(actualCurrentPageId)) {
            return this.currentBrowserPage;
        }

        this.currentBrowserPage = await this.registerCurrentPage();

        return this.currentBrowserPage;
    }

    protected override async registerCurrentPage(): Promise<WebdriverIOPage> {
        const pageId = await this.assignPageId();

        const errorHandler = new WebdriverIOErrorHandler();

        const page = new WebdriverIOPage(
            this,
            this.browser,
            new WebdriverIOModalDialogHandler(this.browser, errorHandler),
            errorHandler,
            pageId,
        );

        this.register(page)

        return page;
    }

    private async assignPageId(): Promise<CorrelationId> {
        const context = await this.browser.getContext();

        if (typeof context === 'string') {
            return new CorrelationId(context);
        }

        if (context.id) {
            return new CorrelationId(context.id);
        }

        return CorrelationId.create();
    }
}
