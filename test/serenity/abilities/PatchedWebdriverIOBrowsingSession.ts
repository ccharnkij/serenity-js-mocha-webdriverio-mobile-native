/* eslint-disable unicorn/filename-case */
import { CorrelationId } from '@serenity-js/core/lib/model';
import { WebdriverIOBrowsingSession, WebdriverIOPage } from '@serenity-js/webdriverio';

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

        // todo: native mobile will need a dedicated error handler
        // const errorHandler = new WebdriverIOErrorHandler();

        const page = new WebdriverIOPage(
            this,
            this.browser,
            undefined,   // todo: native mobile will need a dedicated modal dialog handler
            // new WebdriverIOModalDialogHandler(this.browser, errorHandler),
            undefined,
            // errorHandler,
            pageId,
        );

        this.register(page)

        return page;
    }

    private async assignPageId(): Promise<CorrelationId> {
        // todo: we'll need a good way to identify the context in native mobile
        const context = await this.browser.getContext();

        if (context) {
            if (typeof context === 'string') {
                return new CorrelationId(context);
            }

            if (context.id) {
                return new CorrelationId(context.id);
            }
        }

        return CorrelationId.create();
    }
}
