import { Page } from 'playwright';
import { Functions } from '@crawlers/zod-schema';
import { SimbiosisHomePage } from './pages/simbiosis-home.page';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { PDFDocument } from 'pdf-lib';

export class SimbiosisScript {
  constructor(
    private readonly page: Page,
    private readonly config: Functions.Simbiosis.SimbiosisInputSchemaDto
  ) { }

  async run(): Promise<Functions.Simbiosis.SimbiosisOutputSchemaDto> {

    const homePage = new SimbiosisHomePage(this.page);
    await homePage.goto();
    await homePage.searchLicense("04-33861", "Medical Doctor (MD)");
    await homePage.clickDetails();

    const screenshotBuffer = await this.page.screenshot({ fullPage: true });
    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedPng(screenshotBuffer);
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    const pdfBytes = await pdfDoc.save();

    if (!existsSync('./downloads')) {
      mkdirSync('./downloads', { recursive: true });
    }
    writeFileSync(`./downloads/0433861_details.pdf`, pdfBytes);
    
    return {
      ranBy: this.config.ranBy,
      message: 'PDF Generated successfully',
      file: path.resolve('./downloads/0433861_details.pdf')
    };
  }
}
