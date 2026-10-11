import { test, expect } from '@playwright/test';
import { WidgetPage } from './widget.page';

test.describe('Uchi.ru widget', () => {
    let widgetPage: WidgetPage;

    test.beforeEach(async ({ page }) => {
        widgetPage = new WidgetPage(page);

        await page.goto('/', { waitUntil: 'domcontentloaded' });

        const cookieButton = page.locator('._UCHI_COOKIE__button');
        const isCookieVisible = await cookieButton
            .isVisible({ timeout: 3000 })
            .catch(() => false);
        if (isCookieVisible) {
            await cookieButton.click();
        }
    });

    test('opens widget', async () => {
        await widgetPage.openWidget();
        await expect(widgetPage.getWidgetBody()).toBeVisible();
    });

    test('has correct title', async () => {
        await widgetPage.openWidget();

        const articles = widgetPage.getPopularArticleItems();
        await articles.first().waitFor({ state: 'visible' });
        await articles.first().click();

        await widgetPage.clickWriteToUs();

        await expect(widgetPage.getHeaderText()).toHaveText('Связь с поддержкой');
    });

    test('opens registration page with all role cards', async ({ page }) => {
    await test.step('Кликнуть "Зарегистрироваться"', async () => {
        await widgetPage.clickRegister();
    });

    await test.step('URL страницы регистрации', async () => {
        await expect(page).toHaveURL(/signin\/main\/new/);
    });

    await test.step('Все три карточки выбора роли видны', async () => {
        const buttons = page.locator('button[data-qa-type="button"]');
        await expect(buttons).toHaveCount(3);
        await expect(buttons.nth(0)).toBeVisible();
        await expect(buttons.nth(1)).toBeVisible();
        await expect(buttons.nth(2)).toBeVisible();
    });

    await test.step('На каждой карточке есть кнопка "Выбрать"', async () => {
        const buttons = page.locator('button[data-qa-type="button"]');
        for (let i = 0; i < 3; i++) {
            await expect(buttons.nth(i)).toHaveText('Выбрать');
        }
    });
});

test('opens each registration form by clicking role cards', async ({ page }) => {
    await widgetPage.clickRegister();
    await expect(page).toHaveURL(/signin\/main\/new/);

    const buttons = page.locator('button[data-qa-type="button"]');

    for (let i = 0; i < 3; i++) {
        await test.step(`Кликнуть по карточке ${i + 1}`, async () => {
            if (i > 0) {
                await page.goto('https://uchi.ru/signin/main/new');
                await page.waitForLoadState('domcontentloaded');
            }

            const btn = page.locator('button[data-qa-type="button"]').nth(i);
            await btn.waitFor({ state: 'visible' });
            await btn.click();

            await expect(page).not.toHaveURL(/signin\/main\/new$/);
        });
    }
});
});