import assert from 'node:assert';
import { Page } from 'playwright';
import { Functions } from '@crawlers/zod-schema';
import { SimbiosisHomePage } from './pages/simbiosis-home.page';
import { writeFileSync } from 'node:fs';

export class SimbiosisScript {
  constructor(
    private readonly page: Page,
    private readonly config: Functions.Simbiosis.SimbiosisInputSchemaDto
  ) {}

  async run(): Promise<Functions.Simbiosis.SimbiosisOutputSchemaDto> {
    const homePage = new SimbiosisHomePage(this.page);
    await homePage.goto()

    const aboutPage = await homePage.navToAboutUs()
    const ceoImgUrl = await aboutPage.locators.ceoImg.first().getAttribute('src')
    assert(ceoImgUrl)
    
    await aboutPage.locators.coreValues.scrollIntoViewIfNeeded()

    const buffer = await this.page.pdf()
    writeFileSync(`./screen-shot.pdf`, buffer)

    return {
      ceoImgUrl
    };
  }
}
