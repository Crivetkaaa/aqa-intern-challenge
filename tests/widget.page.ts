import { Page, Locator } from '@playwright/test';

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = 'text=Написать нам',
    ARTICLE_POPULAR_LIST_ITEM = '[class^=popularTitle__] + ul[class^=articles__] > li',
    BUTTON_REGISTER = 'text=Зарегистрироваться',
}

export class WidgetPage {
    constructor(protected page: Page) {}

    get wrapper(): Locator {
        return this.page.locator(WidgetPageSelectors.WRAPPER);
    }

    async openWidget(): Promise<void> {
        await this.page.locator(WidgetPageSelectors.BUTTON_OPEN).click();
    }

    getPopularArticleItems(): Locator {
        return this.wrapper.locator(WidgetPageSelectors.ARTICLE_POPULAR_LIST_ITEM);
    }

    async clickWriteToUs(): Promise<void> {
        await this.page.locator(WidgetPageSelectors.BUTTON_WRITE_TO_US).first().click();
    }

    getHeaderText(): Locator {
        return this.wrapper.locator(WidgetPageSelectors.HEADER_TEXT).first();
    }

    getWidgetBody(): Locator {
        return this.page.locator(WidgetPageSelectors.WIDGET_BODY);
    }

   get registerButton(): Locator {
        return this.page.locator(WidgetPageSelectors.BUTTON_REGISTER).first();
    }

    async clickRegister(): Promise<void> {
        await this.registerButton.click();
    }
}