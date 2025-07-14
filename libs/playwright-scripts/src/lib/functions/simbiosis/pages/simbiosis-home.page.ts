import { Page } from 'playwright';

export class SimbiosisHomePage {
  static url = 'https://www.kansas.gov/ssrv-ksbhada/search.html';

  constructor(private page: Page) { }

  async goto() {
    await this.page.goto(SimbiosisHomePage.url);
  }

  async searchLicense(licenseNumber: string = '04-33861', profession: string = 'Medical Doctor (MD)') {
    await this.page.fill('input[name="licenseNumber"]', licenseNumber);
    await this.page.selectOption('select[name="profession"]', { label: profession });
    await this.page.click('#id_submit');
  }

  async clickDetails() {
    const link = await this.page.waitForSelector('table tbody a');
    const name = await link.textContent();
    await link.click();
    console.log(name?.trim());
  }
}