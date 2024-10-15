/* eslint-disable unicorn/filename-case */
import { CorrelationId } from '@serenity-js/core/lib/model';
import {
    AbsentModalDialog,
    AcceptedModalDialog,
    DismissedModalDialog,
    ModalDialog,
    ModalDialogHandler
} from '@serenity-js/web';
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
            new WebdriverIONativeMobileModalDialogHandler(this.browser),
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

        try {
            if (typeof context === 'string') {
                return new CorrelationId(context);
            }

            if (context.id) {
                return new CorrelationId(context.id);
            }
        }
        catch (error) {
            console.error(error);
        }

        return CorrelationId.create();
    }
}

/**
 * Todo: we'll need a more sophisticated error handler for native mobile
 */
class WebdriverIONativeMobileModalDialogHandler extends ModalDialogHandler {

    private readonly defaultHandler: () => Promise<void> =
        async () => {
            const message = await this.browser.getAlertText();

            await this.browser.dismissAlert();

            this.modalDialog = new DismissedModalDialog(message);
        }

    private currentHandler: () => Promise<void>;

    constructor(
        private readonly browser: WebdriverIO.Browser,
    ) {
        super();
    }

    async tryToHandleDialog(): Promise<void> {
        await this.currentHandler();
    }

    async acceptNext(): Promise<void> {
        this.currentHandler = async () => {
            const message = await this.browser.getAlertText();

            await this.browser.acceptAlert();

            this.modalDialog = new AcceptedModalDialog(message);
        };
    }

    async acceptNextWithValue(text: string | number): Promise<void> {
        this.currentHandler = async () => {
            await this.browser.sendAlertText(String(text));
            const message = await this.browser.getAlertText();

            await this.browser.acceptAlert();

            this.modalDialog = new AcceptedModalDialog(message);
        };
    }

    async dismissNext(): Promise<void> {
        this.currentHandler = async () => {
            const message = await this.browser.getAlertText();

            await this.browser.dismissAlert();

            this.modalDialog = new DismissedModalDialog(message);
        }
    }

    async reset(): Promise<void> {
        this.modalDialog = new AbsentModalDialog();
        this.currentHandler = this.defaultHandler;
    }

    /**
     * @override
     */
    async last(): Promise<ModalDialog> {

        if (this.modalDialog instanceof AbsentModalDialog) {
            await this.tryToHandleDialog();
        }

        return this.modalDialog;
    }
}
