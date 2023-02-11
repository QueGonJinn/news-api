import { Controller, Get, Header } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PageService } from 'src/page/page.service';
import { subDays, format } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constans';

@Controller('sitemap')
export class SitemapController {
  domain: string;
  PageService: any;

  constructor(
    private readonly pageService: PageService,
    private readonly configService: ConfigService,
  ) {
    this.domain = this.configService.get('DOMAIN') ?? '';
  }

  @Get('xml')
  @Header('content-type', 'text/xml')
  async sitemap() {
    const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
    let res = [
      {
        loc: this.domain,
        lastmode: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
      {
        loc: `${this.domain}/technologies`,
        lastmode: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
    ];
    const pages = await this.PageService.findAll();
    res = res.concat(
      pages.map((page) => {
        return {
          loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${
            page.alias
          }`,
          lastmode: format(
            new Date(page.updatedAt ?? new Date()),
            formatString,
          ),
          changefreq: 'weekly',
          priority: '0.7',
        };
      }),
    );
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });
    return builder.buildObject({
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
        url: res,
      },
    });
  }
}
