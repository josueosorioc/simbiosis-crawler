import {
  Locators,
  PlaywrightPage,
  Selectors,
} from '../../../shared/playwright.page';
import { SimbiosisAboutUsPage } from './simbiosis-about.page';

export class SimbiosisHomePage
  extends PlaywrightPage
  implements Selectors, Locators
{
  public static override url = 'https://rfxsolutions.com';

  static get selectors() {
    return {
      aboutUs: '[href="about"]',
    };
  }

  get locators() {
    return {
      aboutUs: this.page.locator(SimbiosisHomePage.selectors.aboutUs),
    };
  }

  async navToAboutUs () {
    await this.locators.aboutUs.click()
    await this.page.waitForURL(SimbiosisAboutUsPage.url)
    return new SimbiosisAboutUsPage(this.page)
  }
}
